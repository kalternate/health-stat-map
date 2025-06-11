import type { Indicator } from "~/components/MapPageContent";
import { parse } from "papaparse";


type OnLoadHandler = (data:  Map<string, number>, max: number) => void;
export function loadData(indicator: Indicator, year: number, onLoad: OnLoadHandler) {
    let url = `/data/${indicator.id}/${indicator.id}_${year}.csv`;
    if (indicator.gendered) {
      url = `/data/${indicator.id}/both/${indicator.id}_${year}_both.csv`;
    }

    const dataMap = new Map<string, number>();
    let max = 0;

    parse(url, {
      download: true,
      header: true,
      step: (step) => {
        const data: any = step.data;
        if (data.SpatialDimType === "COUNTRY") {
          const value = parseFloat(data.NumericValue);
          if (isNaN(value)) return;

          dataMap.set(data.SpatialDim, value);
          if (value > max) max = value;
        }
      },
      complete: () => onLoad(dataMap, max),
    });
}