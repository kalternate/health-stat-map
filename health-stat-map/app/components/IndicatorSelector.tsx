import type { Indicator } from "../routes/MapPage";

interface IndicatorSelectorProps {
    indicator: Indicator
}

export default function IndicatorSelector(props: IndicatorSelectorProps) {
    return (
        <div className="w-full px-1 py-1">
        <button className="text-left px-3 py-1 flex flex-col gap-0 hover:bg-zinc-200 rounded-lg w-full cursor-pointer">
            <div className="text-lg">
                {props.indicator.title}
            </div>
            <div className="text-sm text-zinc-700">
                {props.indicator.subtitle}
            </div>
        </button> 
        </div>
        );
}