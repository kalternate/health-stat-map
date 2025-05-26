import type { PropsWithChildren } from "react";
import { NavLink } from "react-router";

interface NgoCardProps {
  to: string;
  imgSrc: string;
  title?: string;
  reverse?: boolean;
  button?: boolean;
}

export default function NgoCard(props: PropsWithChildren<NgoCardProps>) {
  const cardContent = (
    <>
      <NavLink
        to={props.to}
        className="flex max-w-60 min-w-60 grow flex-row items-center"
      >
        <img src={props.imgSrc} />
      </NavLink>
      <div className="flex grow flex-col">
        {props.title && (
          <NavLink to={props.to} className="text-justify font-bold underline">
            {props.title}
          </NavLink>
        )}
        <div className="text-justify">{props.children}</div>
        {props.button && (
          <NavLink
            className="mt-2 size-fit self-end rounded-sm bg-rose-700 px-2 py-1 font-bold text-zinc-100"
            to={props.to}
          >
            Learn more
          </NavLink>
        )}
      </div>
    </>
  );

  return props.reverse ? (
    <div className="mx-32 flex flex-row-reverse gap-4">{cardContent}</div>
  ) : (
    <div className="mx-32 flex flex-row gap-4">{cardContent}</div>
  );
}
