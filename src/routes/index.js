import { lazy } from "react";
const Page404 = lazy(() => import("../pages/404"));
const page_ujian = lazy(() => import("../pages/siswa/ujian"));
const page_start = lazy(() => import("../pages/siswa/start"));
const page_nilai = lazy(() => import("../pages/siswa/nilai"));

const page_penilaian = lazy(() => import("../pages/guru/penilaian"));
const page_beriNilai = lazy(() => import("../pages/guru/beriNilai"));
const page_soal = lazy(() => import("../pages/guru/soal"));
const page_buat_soal = lazy(() => import("../pages/guru/buatSoal"));

const page_pengumpulan = lazy(() => import("../pages/guru/pengumpulan"));
const page_pengumpulan_buat = lazy(() =>
  import("../pages/guru/buatPengumpulan")
);

export const routes = [
  {
    path: "/404",
    component: Page404,
  },
];

export const routesGuru = [
  {
    path: "/guru/penilaian",
    component: page_penilaian,
  },
  {
    path: "/guru/penilaian/siswa/:id",
    component: page_beriNilai,
  },
  {
    path: "/guru/soal",
    component: page_soal,
  },
  {
    path: "/guru/soal/buat",
    component: page_buat_soal,
  },
  {
    path: "/guru/pengumpulan",
    component: page_pengumpulan,
  },
  {
    path: "/guru/pengumpulan/buat",
    component: page_pengumpulan_buat,
  },
];

export const routesSiswa = [
  {
    path: "/siswa/ujian",
    component: page_ujian,
  },
  {
    path: "/siswa/start/:kodeSoal",
    component: page_start,
  },
  {
    path: "/siswa/nilai",
    component: page_nilai,
  },
];
