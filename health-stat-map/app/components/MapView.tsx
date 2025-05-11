import countriesShapeDataJson from "../data/country_shapes.json"
import { MapContainer, Polygon, SVGOverlay, TileLayer } from "react-leaflet";


interface MapViewProps {
    data: Map<string, number>,
    max: number,
}

function adjustCoordinateList(coordList: number[][]) {
    return coordList.map(adjustCoordinates);
}

function adjustCoordinates(point: number[]) {
    return [point[1], point[0]]
}

export default function MapView(props: MapViewProps) {
    const countriesShapeData: any = countriesShapeDataJson;
    const polygons: any[] = [];

    const noDataColor = "#27272a";

    const colorScheme = [
        "#fee5d9",
        "#fcae91",
        "#fb6a4a",
        "#de2d26",
        "#a50f15"
    ];

    function addPolygon(coordinates: any, countryCode: string) {

                let color = noDataColor;
                if (props.data.has(countryCode)) {
                    const value = props.data.get(countryCode);
                    if (typeof value === "number") {
                        const adjustedValue = value / props.max;
                        let colorIndex = Math.floor(adjustedValue * colorScheme.length)
                        if (colorIndex === colorScheme.length) colorIndex--;
                        color = colorScheme[colorIndex]; 
                    }
                }

                const polygon = {
                    coordinates: coordinates,
                    options: {
                        color: "#18181b",
                        weight: 1.5,
                        fillColor: color,
                        fillOpacity: 0.8
                    }
                };

                polygons.push(polygon);
    }

    for (const countryShapeData of countriesShapeData) {
        const geometry = countryShapeData.geo_shape.geometry;
        const countryCode = countryShapeData.iso3;

        if (geometry.type === "Polygon") {
            const coordinates = geometry.coordinates.map(adjustCoordinateList);
            addPolygon(coordinates, countryCode)
        } else if (geometry.type === "MultiPolygon") {
            for (const rawCoordinates of geometry.coordinates) {
                const coordinates = rawCoordinates.map(adjustCoordinateList);
                addPolygon(coordinates, countryCode)
            }
        }
    }

    return (
            <div className="flex h-screen grow">
                <MapContainer className="flex-1 h-full min-h-full" center={[20, 0]} zoom={2.5} scrollWheelZoom={true}>
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />

                    {polygons.map((polygon) => {
                        return (
                            <Polygon pathOptions={polygon.options} positions={polygon.coordinates}></Polygon>
                        )
                    })}
                </MapContainer>
            </div>
    );
}