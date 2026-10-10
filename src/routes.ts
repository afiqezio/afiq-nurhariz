import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("pages/Index.tsx"),
  route("work/:slug", "pages/View.tsx"),
] satisfies RouteConfig;
