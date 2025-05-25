import { NavLink } from "react-router";

export default function TopPanel() {

    
    return <div className="flex flex-row p-2 gap-4 items-end border-b">
    <NavLink className="text-4xl" to="/"><span className="font-bold "><span className="text-rose-700">Health</span>Stat</span>Map</NavLink>
    <NavLink className="text-xl underline text-zinc-600 hover:text-rose-700" to="/map">Map</NavLink>
    <NavLink className="text-xl underline text-zinc-600 hover:text-rose-700" to="/support">Support</NavLink>
</div>
}