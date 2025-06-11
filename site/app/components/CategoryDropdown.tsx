import { useState, type PropsWithChildren } from "react";
import type {
  Indicator,
  IndicatorCategory,
} from "../components/MapPageContent";
import IndicatorSelector from "./IndicatorSelector";

interface CategoryDropdownProps {
  category: IndicatorCategory;
  selectedIndicator: Indicator | null;
  setSelectedIndicator: (value: Indicator) => void;
}

export default function CategoryDropdown(props: CategoryDropdownProps) {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <div>
      <button
        className="w-full cursor-pointer border-b-1 border-zinc-600 bg-linear-to-t from-zinc-300 to-zinc-200 p-2 text-left"
        onClick={() => setOpen(!open)}
      >
        <div className="flex flex-row gap-2 text-lg font-bold text-zinc-900">
          {!open && <div>&#9656;</div>}
          {open && <div>&#9662;</div>}
          <h2>{props.category.title}</h2>
        </div>
      </button>
      {open && (
        <div>
          {props.category.indicators.map((indicator) => {
            return (
              <div>
                <IndicatorSelector
                  indicator={indicator}
                  selectedIndicator={props.selectedIndicator}
                  setSelectedIndicator={props.setSelectedIndicator}
                />
                <hr className="text-zinc-400"></hr>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
