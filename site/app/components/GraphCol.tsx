import { numberFormatter } from "~/utils";

interface GraphColProps {
    data: Map<string, number>;
    color: string;
    spanMin: number;
    spanMax: number;
    last: boolean;
}


export default function GraphCol(props: GraphColProps) {
    return <div className="flex flex-col flex-1 h-full items-center grow">
    <div className="w-full grow flex-1 border-2 border-zinc-600 bg-zinc-200  flex flex-col justify-end items-center overflow-y-scroll">
    <div className="flex flex-row gap-1 px-1 py-2 flex-wrap-reverse w-full justify-center ">

        {[...props.data.entries()].filter(pair =>
            {
                const key = pair[0]; 
                const value = pair[1]; 
                console.log("%d %d", key, value)
                
                return value >= props.spanMin && (props.last || value < props.spanMax)}
        ).map((key, value) => {
            return <div className="h-6 w-6 rounded-md border border-zinc-400" style={{ backgroundColor: props.color }}
></div>;
        })
    }
    </div>

    </div>
    <div className="text-center text-zinc-600 text-lg">
        {numberFormatter.format(props.spanMin)} &ndash; {numberFormatter.format(props.spanMax)}
    </div>

</div>
}