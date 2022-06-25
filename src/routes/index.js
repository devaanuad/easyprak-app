import { lazy } from "react";
const Page404 = lazy(() => import("../pages/404"));
const page_ujian = lazy(() => import("../pages/siswa/ujian"));
const page_start = lazy(() => import("../pages/siswa/start"));

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
    path: "/siswa/ujian",
    component: page_ujian,
  },
  {
    path: "/siswa/start:kode_soal",
    component: page_ujian,
  },
];
