import { NavLink } from "react-router";
import type { Indicator } from "~/components/MapPageContent";
import { mapColors, numberFormatter } from "~/utils";

interface MapKeyProps {
  maxValue: number;
  indicator: Indicator;
}

export default function MapKey(props: MapKeyProps) {
  const spanLength = props.maxValue / mapColors.length;

  let colorIndexCounter = 0;

  return (
    <div className="pointer-events-auto flex w-48 flex-col rounded-md border-1 border-zinc-600 bg-zinc-100 p-2">
      <h2 className="font-bold">{props.indicator.title}</h2>
      <div className="mb-2 text-sm text-zinc-700">
        {props.indicator.subtitle}
      </div>
      <div className="flex flex-col-reverse">
        {mapColors.map((color) => {
          const colorIndex = colorIndexCounter;
          colorIndexCounter += 1;
          return (
            <div className="flex flex-row items-center gap-2">
              <div
                className="h-5 w-5 border-1 border-zinc-600"
                style={{ backgroundColor: color }}
              />

              <div className="text-right"> {numberFormatter.format(spanLength * colorIndex)}</div>
              <div> &ndash; </div>
              <div className="text-left">
                {numberFormatter.format(spanLength * (colorIndex + 1))}
              </div>
            </div>
          );
        })}
      </div>

      <div className="text-sm text-zinc-600">
        Source:{" "}
        <NavLink className="underline" to="https://www.who.int/data/gho">
          WHO GHO
        </NavLink>
      </div>
    </div>
  );
}
