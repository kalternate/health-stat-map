import type { Indicator } from "../routes/MapPage";

interface IndicatorSelectorProps {
  indicator: Indicator;
  selectedIndicator: Indicator | null;
  setSelectedIndicator: (value: Indicator) => void;
}

export default function IndicatorSelector(props: IndicatorSelectorProps) {
  const pressed = props.indicator.id === props.selectedIndicator?.id;
  const onClick = () => props.setSelectedIndicator(props.indicator);

  return (
    <div className="w-full px-1 py-1">
      <button
        className="flex w-full cursor-pointer flex-col gap-0 border-1 border-zinc-100 px-3 py-1 text-left transition-colors hover:bg-zinc-200 active:bg-rose-200 disabled:border-rose-800 disabled:bg-rose-200"
        disabled={pressed}
        onClick={onClick}
      >
        <div className="text-lg">{props.indicator.title}</div>
        <div className="text-sm text-zinc-700">{props.indicator.subtitle}</div>
      </button>
    </div>
  );
}
