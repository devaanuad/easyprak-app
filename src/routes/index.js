import { lazy } from "react";
const Page404 = lazy(() => import("../pages/404"));
const page_ujian = lazy(() => import("../pages/siswa/ujian"));

export const routes = [
  {
    path: "/404",
    component: Page404,
  },
];

export const routesGuru = [
  {
    path: "/404",
    component: Page404,
  },
];

export const routesSiswa = [
  {
    path: "/ujian",
    component: page_ujian,
  },
];
