import { useState, type PropsWithChildren } from "react";
import type { IndicatorCategory } from "../routes/MapPage";
import IndicatorSelector from "./IndicatorSelector";


interface CategoryDropdownProps {
    category: IndicatorCategory
}

export default function CategoryDropdown(props: CategoryDropdownProps) {
    const [open, setOpen] = useState<boolean>(false);

    return (
    <div>
        <button className="from-zinc-300 to-zinc-200 p-2 border-b-1 bg-linear-to-t border-zinc-600 w-full text-left cursor-pointer" onClick={() => setOpen(!open)}>
        <div className="text-lg font-bold text-zinc-900 flex flex-row gap-2">
            {!open && <div>&#9656;</div>}
            {open && <div>&#9662;</div>}
            <h2>{props.category.title}</h2>
        </div>
        </button>
        {open &&
            <div>
            {props.category.indicators.map((indicator) => {
                return (
                    <div>
                <IndicatorSelector indicator={indicator}/>
                <hr className="text-zinc-400"></hr>
                </div>
                );
            })}
            </div>
        }

    </div>)
}