import countriesShapeDataJson from "../data/country_shapes.json"
import { MapContainer, Polygon, SVGOverlay, TileLayer } from "react-leaflet";

function adjustCoordinateList(coordList: number[][]) {
    return coordList.map(adjustCoordinates);
}

function adjustCoordinates(point: number[]) {
    return [point[1], point[0]]
}

export default function MapView() {
    const countriesShapeData: any = countriesShapeDataJson;
    const polygons = [];

    for (const countryShapeData of countriesShapeData) {
        const geometry = countryShapeData.geo_shape.geometry;

        if (geometry.type === "Polygon") {
            const coordinates = geometry.coordinates.map(adjustCoordinateList);
            polygons.push(coordinates)
        } else if (geometry.type === "MultiPolygon") {
            for (const rawCoordinates of geometry.coordinates) {
                const coordinates = rawCoordinates.map(adjustCoordinateList);
                polygons.push(coordinates)

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
                            <Polygon positions={polygon}></Polygon>
                        )
                    })}
                </MapContainer>
            </div>
    );
}