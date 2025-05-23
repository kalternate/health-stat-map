import CategoryDropdown from "~/components/CategoryDropdown";
import MapView from "../components/MapView";
import dataManifest from "../data/data_manifest.json";
import { useEffect, useState } from "react";
import { parse } from "papaparse";
import MapKey from "~/components/MapKey";
import MapYearSelector from "~/components/MapYearSelector";

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

  const indicatorCategories: IndicatorCategory[] = dataManifest;

  useEffect(() => {
    if (selectedIndicator === null) return;
    const year = isNaN(selectedYear) ? selectedIndicator.end : selectedYear;
    if (isNaN(selectedYear)) setSelectedYear(year);
    if (selectedIndicator.id === currentIndicator?.id && year === currentYear) return;

    let url = `/data/${selectedIndicator.category}/${selectedIndicator.id}_${year}.csv`;
    if (selectedIndicator.gendered) {
      url = `/data/${selectedIndicator.category}/${selectedIndicator.id}_${year}_both.csv`;
    }

    const newData = new Map<string, number>();
    let newMax = 0;

    parse(url, {
      download: true,
      header: true,
      step: (step) => {
        const data: any = step.data;
        if (data.SpatialDimType === "COUNTRY") {
          const value = parseFloat(data.NumericValue);
          if (isNaN(value)) return;

          newData.set(data.SpatialDim, value);
          if (value > newMax) newMax = value;
        }
      },
      complete: () => {
        setCurrentData(newData);
        setCurrentIndicator(selectedIndicator);
        setCurrentMax(newMax);
        setCurrentYear(year);
      },
    });
  });

  return (
    <div className="flex flex-row">
      <div className="flex max-h-screen w-sm flex-col overflow-y-auto border-r-1 border-zinc-600">
        {indicatorCategories.map((category) => {
          return (
            <CategoryDropdown
              category={category}
              selectedIndicator={selectedIndicator}
              setSelectedIndicator={setSelectedIndicator}
            />
          );
        })}
      </div>
      <div className="relative grow">
        <MapView data={currentData} max={currentMax} />
        <div className="pointer-events-none absolute inset-0 bottom-0 z-10000 flex flex-row items-end p-4 gap-4">
          {selectedIndicator && (
            <>
              <MapKey maxValue={currentMax} indicator={selectedIndicator} />
              <MapYearSelector
                selectedYear={selectedYear}
                setSelectedYear={setSelectedYear}
                indicator={selectedIndicator}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
