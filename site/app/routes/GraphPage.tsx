import { useEffect, useRef, useState } from "react";
import IndicatorList from "~/components/IndicatorList";
import type { Indicator, IndicatorCategory } from "~/components/MapPageContent";
import dataManifest from "../data/data_manifest.json";
import { loadData, mapColors } from "~/utils";
import GraphCol from "~/components/GraphCol";

export default function GraphPage() {
  const [selectedIndicator, setSelectedIndicator] = useState<Indicator | null>(
    null,
  );
  const [currentIndicator, setCurrentIndicator] = useState<Indicator | null>(
    null,
  );
  const [currentData, setCurrentData] = useState<Map<string, number>>(
    new Map(),
  );
  const [currentMax, setCurrentMax] = useState<number>(0);

  const [selectedYear, setSelectedYear] = useState<number>(NaN);
  const [currentYear, setCurrentYear] = useState<number>(NaN);
  const indicatorCategories: IndicatorCategory[] = dataManifest;

  const selectIndicator = (indicator: Indicator) => {
    setSelectedIndicator(indicator);
    setSelectedYear(
      Math.max(Math.min(selectedYear, indicator.end), indicator.start),
    );
  };

  useEffect(() => {
    if (selectedIndicator === null) return;
    const year = isNaN(selectedYear) ? selectedIndicator.end : selectedYear;
    if (isNaN(selectedYear)) setSelectedYear(year);
    if (selectedIndicator.id === currentIndicator?.id && year === currentYear)
      return;

    loadData(selectedIndicator, year, (data, max) => {
      setCurrentData(data);
      setCurrentIndicator(selectedIndicator);
      setCurrentMax(max);
      setCurrentYear(year);
    });
  });

  let indexCounter = 0;

  const spanLength = currentMax / mapColors.length;

  return (
    <div className="flex h-full grow flex-row">
      <IndicatorList
        selectedIndicator={selectedIndicator}
        indicatorCategories={indicatorCategories}
        setSelectedIndicator={selectIndicator}
      />
      <div className="relative grow">
        <div className="flex h-full w-full flex-col p-5">
          <h1 className="ml-8 text-4xl font-bold">
            {selectedIndicator
              ? `${selectedIndicator.title} (${currentYear})`
              : "Select an indicator to start"}
          </h1>
          <p className="ml-8 min-h-12 text-lg text-zinc-600">
            {selectedIndicator ? selectedIndicator.subtitle + "." : ""}
          </p>
          <div className="flex h-full flex-row">
            <div className="w-8 text-center text-lg text-zinc-600 [writing-mode:sideways-lr]">
              # of countries
            </div>
            <div className="mr-8 flex h-full w-full flex-row">
              {mapColors.map((color) => {
                const index = indexCounter;
                indexCounter += 1;
                const spanMin = spanLength * index;
                const spanMax = spanLength * (index + 1);
                return (
                  <GraphCol
                    color={color}
                    data={currentData}
                    spanMin={spanMin}
                    spanMax={spanMax}
                    last={index === mapColors.length - 1}
                  />
                );
              })}
            </div>
          </div>
          <p className="mx-8 text-lg text-zinc-600 text-center">
            {selectedIndicator ? selectedIndicator.subtitle : ""}
          </p>
        </div>
      </div>
    </div>
  );
}
