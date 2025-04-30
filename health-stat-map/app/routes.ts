import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    index("routes/HomePage.tsx"),
    route("map", "routes/MapPage.tsx")
] satisfies RouteConfig;
