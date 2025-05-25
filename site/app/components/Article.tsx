import type { PropsWithChildren } from "react";

export default function Article(props: PropsWithChildren<{}>) {
    return <div className="bg-zinc-300 flex items-center flex-col grow">
        <div className="bg-zinc-100 w-4xl grow p-4 border-x-1 flex flex-col gap-6">

        {props.children}
        </div>
    </div>;
}