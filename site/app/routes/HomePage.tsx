import { Link } from "react-router";

//export function meta({}: Route.MetaArgs) {
//  return [
//    { title: "New React Router App" },
//    { name: "description", content: "Welcome to React Router!" },
//  ];
//}

export default function HomePage() {
  return (
    <div className="flex flex-col items-center gap-5 bg-gray-100 p-5">
      <h1 className="text-5xl">HealthStatMap</h1>
      <Link className="text-3xl text-sky-500 underline" to="/map">
        Go to Map
      </Link>
    </div>
  );
}
