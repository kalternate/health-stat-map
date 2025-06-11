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
        setSelectedIndicator={setSelectedIndicator}
      />
      <div className="relative grow">
        <div className="w-full h-full flex flex-col p-5">
        <h1 className="text-4xl font-bold ml-8">{selectedIndicator ? selectedIndicator.title : "Select an indicator to start"}</h1>
        <p className="min-h-12 text-lg text-zinc-600 ml-8">{selectedIndicator ? selectedIndicator.subtitle + "." : ""}</p>
        <div className="flex flex-row h-full">
        <div className="[writing-mode:sideways-lr] text-center text-zinc-600 text-lg w-8"># of countries</div>
        <div className="flex flex-row h-full w-full mr-8">
            {mapColors.map(color => {
                const index = indexCounter;
                indexCounter += 1;
                const spanMin = spanLength * index;
                const spanMax = spanLength * (index+1);
                return <GraphCol color={color} data={currentData} spanMin={spanMin} spanMax={spanMax} last={index === mapColors.length-1} />
            })}
        </div>
      </div>
        </div>
        </div>
    </div>
  );
}
