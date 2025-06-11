import type { Indicator, IndicatorCategory } from "~/routes/MapPage";
import CategoryDropdown from "./CategoryDropdown";

interface IndicatorListProps {
    selectedIndicator: Indicator | null;
    indicatorCategories: IndicatorCategory[];
    setSelectedIndicator: (indicator: Indicator) => void;

}

export default function IndicatorList(props: IndicatorListProps) {
      return <div className="flex w-sm flex-col overflow-y-auto border-r-1 border-zinc-600">
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
}
