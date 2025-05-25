import type { PropsWithChildren } from "react";
import { NavLink } from "react-router";

interface NgoCardProps {
    to: string;
    imgSrc: string;
    title?: string;
    reverse?: boolean;    
    button?: boolean
}

export default function NgoCard(props: PropsWithChildren<NgoCardProps>) {

    const cardContent = <>
        <NavLink to={props.to} className="max-w-60 min-w-60 flex-row flex items-center grow">
            <img src={props.imgSrc} />
        </NavLink>
        <div className="flex flex-col grow">
            {props.title &&
            <NavLink to={props.to} className="font-bold text-justify underline">
                {props.title}
            </NavLink>
            }
            <div className="text-justify">
                {props.children}
            </div>
            {props.button &&
            <NavLink className="mt-2 bg-rose-700 py-1 px-2 font-bold text-zinc-100 rounded-sm size-fit self-end" to={props.to}>Learn more</NavLink>
            }
        </div>
    </>;

    return props.reverse ? <div className="flex flex-row-reverse mx-32 gap-4">
        {cardContent}
    </div> : <div className="flex flex-row mx-32 gap-4">
        {cardContent}
    </div>
}