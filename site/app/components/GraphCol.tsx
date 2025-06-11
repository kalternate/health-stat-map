import { numberFormatter } from "~/utils";

interface GraphColProps {
  data: Map<string, number>;
  color: string;
  spanMin: number;
  spanMax: number;
  last: boolean;
}

export default function GraphCol(props: GraphColProps) {
  return (
    <div className="flex h-full flex-1 grow flex-col items-center">
      <div className="flex w-full flex-1 grow flex-col items-center justify-end overflow-y-scroll border-2 border-zinc-600 bg-zinc-200">
        <div className="flex w-full flex-row flex-wrap-reverse justify-center gap-1 px-1 py-2">
          {[...props.data.entries()]
            .filter((pair) => {
              const key = pair[0];
              const value = pair[1];
              console.log("%d %d", key, value);

              return (
                value >= props.spanMin && (props.last || value < props.spanMax)
              );
            })
            .map((key, value) => {
              return (
                <div
                  className="h-6 w-6 rounded-md border border-zinc-400"
                  style={{ backgroundColor: props.color }}
                ></div>
              );
            })}
        </div>
      </div>
      <div className="text-center text-lg text-zinc-600">
        {numberFormatter.format(props.spanMin)} &ndash;{" "}
        {numberFormatter.format(props.spanMax)}
      </div>
    </div>
  );
}
