import { lazy } from "react";
const Dashboard = lazy(() => import("../pages/Dashboard"));

export const routes = [
  {
    path: "/dashboard",
    component: Dashboard,
  },
];
