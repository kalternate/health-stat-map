import { Link } from "react-router";

//export function meta({}: Route.MetaArgs) {
//  return [
//    { title: "New React Router App" },
//    { name: "description", content: "Welcome to React Router!" },
//  ];
//}

export default function HomePage() {
  return (
  <div className="p-5 flex flex-col items-center gap-5 bg-gray-100">
    <h1 className="text-5xl">HealthStatMap</h1>
    <Link className="text-3xl underline text-sky-500" to="/map">Go to Map</Link>
  </div>);
}
