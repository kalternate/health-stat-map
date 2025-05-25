import { NavLink } from "react-router";

export default function TopPanel() {
  return (
    <div className="flex flex-row items-end gap-4 border-b p-2">
      <NavLink className="text-4xl" to="/">
        <span className="font-bold">
          <span className="text-rose-700">Health</span>Stat
        </span>
        Map
      </NavLink>
      <NavLink
        className="text-xl text-zinc-600 underline hover:text-rose-700"
        to="/map"
      >
        Map
      </NavLink>
      <NavLink
        className="text-xl text-zinc-600 underline hover:text-rose-700"
        to="/support"
      >
        Support
      </NavLink>
    </div>
  );
}
