import type { PropsWithChildren } from "react";

export default function Article(props: PropsWithChildren<{}>) {
  return (
    <div className="flex grow flex-col items-center bg-zinc-300">
      <div className="flex w-4xl grow flex-col gap-6 border-x-1 bg-zinc-100 p-4">
        {props.children}
      </div>
    </div>
  );
}
