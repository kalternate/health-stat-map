import MapView from "../components/MapView";
import dataManifest from "../data/data_manifest.json";
import { useEffect, useState } from "react";
import MapKey from "~/components/MapKey";
import MapYearSelector from "~/components/MapYearSelector";
import IndicatorList from "~/components/IndicatorList";
import { loadData } from "~/utils";

export interface IndicatorCategory {
  id: string;
  title: string;
  indicators: Indicator[];
}

export interface Indicator {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  start: number;
  end: number;
  gendered?: boolean;
}

export default function MapPage() {
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

  const [renderDelay, setRenderDelay] = useState<number>(0);

  const indicatorCategories: IndicatorCategory[] = dataManifest;

  const selectYear = (year: number) => {
    setRenderDelay(100);
    setSelectedYear(year);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setRenderDelay((prevDelay) =>
        prevDelay <= 0 ? prevDelay : prevDelay - 20,
      );
    }, 20);

    return () => clearInterval(interval);
  });

  useEffect(() => {
    if (selectedIndicator === null) return;
    const year = isNaN(selectedYear) ? selectedIndicator.end : selectedYear;
    if (isNaN(selectedYear)) setSelectedYear(year);
    if (selectedIndicator.id === currentIndicator?.id && year === currentYear)
      return;
    if (renderDelay > 0) return;

  console.log(year);

    loadData(selectedIndicator, year, (data, max) => {
      setCurrentData(data);
      setCurrentIndicator(selectedIndicator);
      setCurrentMax(max);
      setCurrentYear(year);
    });
  });

  return <>
    <div className="flex h-full grow flex-row">
      <IndicatorList selectedIndicator={selectedIndicator} indicatorCategories={indicatorCategories} setSelectedIndicator={setSelectedIndicator}/>
      <div className="relative grow">
        <MapView
          data={currentData}
          max={currentMax}
          indicator={currentIndicator === null ? undefined : currentIndicator}
        />
        <div className="pointer-events-none absolute inset-0 bottom-0 z-10000 flex flex-row items-end gap-4 p-4">
          {selectedIndicator && (
            <>
              <MapKey maxValue={currentMax} indicator={selectedIndicator} />
              <MapYearSelector
                selectedYear={selectedYear}
                setSelectedYear={selectYear}
                indicator={selectedIndicator}
              />
            </>
          )}
        </div>
      </div>
    </div>
    </>
  ;
}
