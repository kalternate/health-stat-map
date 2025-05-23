import type { ChangeEvent } from "react";
import type { Indicator } from "~/routes/MapPage";

interface MapYearSelectorProps {
  selectedYear: number;
  setSelectedYear: (year: number) => void;
  indicator: Indicator;
}

export default function MapYearSelector(props: MapYearSelectorProps) {

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    props.setSelectedYear(parseInt(event.target.value));
  }

  return <div className="pointer-events-auto flex w-48 flex-col rounded-md border-1 border-zinc-600 bg-zinc-100 p-2">
    <label className="font-bold" htmlFor="year-selector">Year</label>
    <div>{props.selectedYear}</div>
    <input name="year-selector" type="range" min={props.indicator.start} max={props.indicator.end} value={props.selectedYear} step={1} onChange={onChange}/>
    <div className="flex flex-row">
        <div className="border-zinc-600 text-sm">{props.indicator.start}</div>
        <div className="border-zinc-600 text-sm grow text-right">{props.indicator.end}</div>
    </div>


  </div>;
}
