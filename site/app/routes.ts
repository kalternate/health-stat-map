import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/HomePage.tsx"),
  route("map", "routes/MapPage.tsx"),
  route("graph", "routes/GraphPage.tsx"),
  route("support", "routes/SupportPage.tsx"),
  route("faq", "routes/FaqPage.tsx"),
] satisfies RouteConfig;
