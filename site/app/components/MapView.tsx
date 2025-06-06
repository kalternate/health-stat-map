import { getFlagEmoji, mapColors, numberFormatter } from "~/utils";
import countriesShapeDataJson from "../data/country_shapes.json";
import {
  MapContainer,
  Polygon,
  Popup,
  SVGOverlay,
  TileLayer,
} from "react-leaflet";
import type { Indicator } from "~/components/MapPageContent";
import { latLng, latLngBounds } from "leaflet";
import { Suspense, useMemo } from "react";

interface MapViewProps {
  data: Map<string, number>;
  max: number;
  indicator?: Indicator;
}

function adjustCoordinateList(coordList: number[][]) {
  return coordList.map(adjustCoordinates);
}

function adjustCoordinates(point: number[]) {
  return [point[1], point[0]];
}

export default function MapView(props: MapViewProps) {
  const countriesShapeData: any = countriesShapeDataJson;
  const polygons: any[] = [];

  const noDataColor = "#27272a";

  function addPolygon(
    coordinates: any,
    countryCodeIso3: string,
    countryCodeIso2: string,
    countryName: string,
  ) {
    let color = noDataColor;
    let value = NaN;
    if (props.data.has(countryCodeIso3)) {
      const localValue = props.data.get(countryCodeIso3);
      if (typeof localValue === "number") {
        value = localValue;
        const adjustedValue = localValue / props.max;
        let colorIndex = Math.floor(adjustedValue * mapColors.length);
        if (colorIndex === mapColors.length) colorIndex--;
        color = mapColors[colorIndex];
      }
    }

    const polygon = {
      coordinates: coordinates,
      countryName: countryName,
      flagEmoji: getFlagEmoji(countryCodeIso2),
      value: value,
      options: {
        color: "#18181b",
        weight: 1.5,
        fillColor: color,
        fillOpacity: 0.8,
      },
    };

    polygons.push(polygon);
  }

  for (const countryShapeData of countriesShapeData) {
    const geometry = countryShapeData.geo_shape.geometry;
    const countryCodeIso3 = countryShapeData.iso3;
    const countryCodeIso2 = countryShapeData.iso2;
    const countryName = countryShapeData.cntry_name;

    if (geometry.type === "Polygon") {
      const coordinates = geometry.coordinates.map(adjustCoordinateList);
      addPolygon(coordinates, countryCodeIso3, countryCodeIso2, countryName);
    } else if (geometry.type === "MultiPolygon") {
      for (const rawCoordinates of geometry.coordinates) {
        const coordinates = rawCoordinates.map(adjustCoordinateList);
        addPolygon(coordinates, countryCodeIso3, countryCodeIso2, countryName);
      }
    }
  }

  return (
    <div className="z-0 flex h-full grow">
      <MapContainer
        className="h-full min-h-full flex-1"
        center={[20, 0]}
        zoom={2.5}
        maxBounds={latLngBounds(latLng(-360, -360), latLng(360, 360))}
        minZoom={2}
        scrollWheelZoom={true}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        {polygons.map((polygon) => {
          return (
            <Polygon
              pathOptions={polygon.options}
              positions={polygon.coordinates}
            >
              <Popup>
                <div className="text-base font-bold">
                  {polygon.flagEmoji} {polygon.countryName}
                </div>
                {isNaN(polygon.value) ? (
                  <div className="font text-xsm w-50 text-justify">No data</div>
                ) : (
                  <div className="font w-60 text-justify text-xs">
                    <span className="font-bold underline">
                      {numberFormatter.format(polygon.value)}
                    </span>{" "}
                    {props.indicator?.subtitle}
                  </div>
                )}
              </Popup>
            </Polygon>
          );
        })}
      </MapContainer>
    </div>
  );
}
