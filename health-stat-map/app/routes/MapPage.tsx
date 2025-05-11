import CategoryDropdown from "~/components/CategoryDropdown";
import MapView from "../components/MapView";
import dataManifest from "../data/data_manifest.json"
import { useEffect, useState } from "react";
import { parse } from 'papaparse';

export interface IndicatorCategory {
    id: string;
    title: string;
    indicators: Indicator[]
}

export interface Indicator {
    id: string,
    title: string,
    subtitle: string,
    category: string,
    start: number,
    end: number,
    gendered?: boolean
}

export default function MapPage() {
    const [selectedIndicator, setSelectedIndicator] = useState<Indicator | null>(null)
    const [currentIndicator, setCurrentIndicator] = useState<Indicator | null>(null)

    const [currentData, setCurrentData] = useState<Map<string, number>>(new Map())
    const [currentMax, setCurrentMax] = useState<number>(0)

    const indicatorCategories: IndicatorCategory[] = dataManifest;

    useEffect(() => {
            if (selectedIndicator === null) return;
            if (selectedIndicator.id === currentIndicator?.id) return;

            let url = `/data/${selectedIndicator.category}/${selectedIndicator.id}_${selectedIndicator.end}.csv`
            if (selectedIndicator.gendered) {
url = `/data/${selectedIndicator.category}/${selectedIndicator.id}_${selectedIndicator.end}_both.csv`
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
                }
            });
    });

    return (
        <div className="flex flex-ro">
            <div className="w-sm border-r-1 border-zinc-600 overflow-y-auto flex flex-col max-h-screen">
                {indicatorCategories.map((category) => {
                    return <CategoryDropdown category={category} selectedIndicator={selectedIndicator} setSelectedIndicator={setSelectedIndicator}/>
                })
                }

            </div>
            <MapView data={currentData} max={currentMax}/>
        </div>
    )
}