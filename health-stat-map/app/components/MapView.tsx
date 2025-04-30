import { useEffect, useRef, useState } from "react";
import countriesShapeDataJson from "../data/country_shapes.json"

export default function MapView() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const [mouseDown, setMouseDown] = useState(false);
    const [mapOffset, setMapOffset] = useState([0, 0]);

    const countriesShapeData: any = countriesShapeDataJson;

    function adjustX(x: number) {
        return x * 10 + mapOffset[0];
    }

    function adjustY(y: number) {
        return -y * 10 + mapOffset[1];
    }

    function drawMap() {
        const canvas = canvasRef.current;
        if (canvas === null) return;
        const context = canvas.getContext('2d');
        if (context === null) return;

        context.strokeStyle = 'black';
        context.lineJoin = 'round';
        context.lineCap = 'round';

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight

        context.clearRect(0, 0, canvas.width, canvas.height);

        for (const countryShapeData of countriesShapeData) {
            const geometry = countryShapeData.geo_shape.geometry;

            if (geometry.type === "Polygon") {
                const shapes: number[][][] = geometry.coordinates;
                for (const shape of shapes) {
                    context.beginPath()
                    context.lineWidth = 2;
                    context.moveTo(adjustX(shape[0][0]), adjustY(shape[0][1]));
                    for (let i = 1; i < shape.length; i++) {
                        context.lineTo(adjustX(shape[i][0]), adjustY(shape[i][1]));
                    }
                    context.lineTo(adjustX(shape[0][0]), adjustY(shape[0][1]));

                    context.stroke()

                }
            } else if (geometry.type === "MultiPolygon") {
                const shapes: number[][][][] = geometry.coordinates;
                for (const innerShapes of shapes) {
                    for (const shape of innerShapes) {
                        context.beginPath()
                        context.lineWidth = 2;
                        context.moveTo(adjustX(shape[0][0]), adjustY(shape[0][1]));
                        for (let i = 1; i < shape.length; i++) {
                            context.lineTo(adjustX(shape[i][0]), adjustY(shape[i][1]));
                        }
                        context.lineTo(adjustX(shape[0][0]), adjustY(shape[0][1]));
                        context.stroke()
    
                    }
                }
            }

        }
    }

    useEffect(drawMap);

    function onMouseMove(event: React.MouseEvent<HTMLElement>) {
        if (event.buttons === 1) {
            setMapOffset([mapOffset[0] + event.movementX, mapOffset[1] + event.movementY])
        }
    }

    return (
        <div className="size-full">
            <canvas
                ref={canvasRef}
                onMouseMove={onMouseMove}
            />
        </div>
    );
}