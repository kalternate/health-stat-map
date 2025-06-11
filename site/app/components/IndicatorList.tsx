import type { Indicator, IndicatorCategory } from "~/components/MapPageContent";
import CategoryDropdown from "./CategoryDropdown";

interface IndicatorListProps {
    selectedIndicator: Indicator | null;
    indicatorCategories: IndicatorCategory[];
    setSelectedIndicator: (indicator: Indicator) => void;

}

export default function IndicatorList(props: IndicatorListProps) {
      return       <div className="relative flex h-full w-sm">
        <div className="absolute h-full w-sm flex-col overflow-y-auto border-r-1 border-zinc-600">
        {props.indicatorCategories.map((category) => {
          return (
            <CategoryDropdown
              category={category}
              selectedIndicator={props.selectedIndicator}
              setSelectedIndicator={props.setSelectedIndicator}
            />
          );
        })}
      </div>
      </div>
}
