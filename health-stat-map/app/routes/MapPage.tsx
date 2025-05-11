import CategoryDropdown from "~/components/CategoryDropdown";
import MapView from "../components/MapView";
import dataManifest from "../data/data_manifest.json"

export interface IndicatorCategory {
    id: string;
    title: string;
    indicators: Indicator[]
}

export interface Indicator {
    id: string;
    title: string;
    subtitle: string;
    start: number;
    end: number;
}

export default function MapPage() {
    const indicatorCategories: IndicatorCategory[] = dataManifest;

    console.log(indicatorCategories)
    return (
        <div className="flex flex-ro">
            <div className="w-sm border-r-1 border-zinc-600">
                {indicatorCategories.map((category) => {
                    return <CategoryDropdown category={category}/>
                })
                }

            </div>
            <MapView/>
        </div>
    )
}