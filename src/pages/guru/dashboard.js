import React, { useState, useEffect } from "react";
import InfoCard from "../../components/Cards/InfoCard";
import PageTitle from "../../components/Typography/PageTitle";
import { ChatIcon, MoneyIcon, PeopleIcon, FormsIcon } from "../../icons";
import RoundIcon from "../../components/RoundIcon";
import axios from "axios";
import { API_URL } from "../../components/Middleware/constants";
import UsersAccess from "../../components/Middleware/BlockUsers";
import * as Secure from "../../components/Middleware/SecureLocalStorage";

function Dashboard() {
  const [totalUsers, setTotalUsers] = useState(0);
  const [soal, setSoal] = useState(0);
  const [penilaian, setPenilaian] = useState(0);
  const [pengumpulan, setPengumpulan] = useState(0);

  const getUsers = async () => {
    const response = await axios.get(API_URL + "api/guru/user", {
      withCredentials: true,
      headers: {
        Authorization: `${Secure.getItem("token")}`,
      },
    });
    return setTotalUsers(response.data.data.length);
  };

  const getSoal = async () => {
    const response = await axios.get(API_URL + "api/guru/soal", {
      withCredentials: true,
      headers: {
        Authorization: `${Secure.getItem("token")}`,
      },
    });
    setSoal(response.data.data.length);
  };

  const getPenilaian = async () => {
    const response = await axios.get(API_URL + `api/siswa/nilai/`, {
      withCredentials: true,
      headers: {
        Authorization: `${Secure.getItem("token")}`,
      },
    });
    setPenilaian(response.data.data.length);
  };

  const getPenumpulan = async () => {
    const response = await axios.get(API_URL + "api/guru/pengumpulan", {
      withCredentials: true,
      headers: {
        Authorization: `${Secure.getItem("token")}`,
      },
    });
    setPengumpulan(response.data.data.length);
  };

  // block login and akses role
  UsersAccess("guru");

  useEffect(() => {
    getUsers();
    getSoal();
    getPenilaian();
    getPenumpulan();
  }, []);

  return (
    <>
      <PageTitle>Dashboard Guru</PageTitle>
      {/* <!-- Cards --> */}
      <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">
        <InfoCard title="Total Users" value={totalUsers + String(" Orang")}>
          <RoundIcon
            icon={PeopleIcon}
            iconColorClass="text-orange-500 dark:text-orange-100"
            bgColorClass="bg-orange-100 dark:bg-orange-500"
            className="mr-4"
          />
        </InfoCard>

        <InfoCard title="Total Soal" value={soal + String(" Soal")}>
          <RoundIcon
            icon={MoneyIcon}
            iconColorClass="text-green-500 dark:text-green-100"
            bgColorClass="bg-green-100 dark:bg-green-500"
            className="mr-4"
          />
        </InfoCard>

        <InfoCard title="Total Penilaian" value={penilaian + String(" Orang")}>
          <RoundIcon
            icon={FormsIcon}
            iconColorClass="text-blue-500 dark:text-blue-100"
            bgColorClass="bg-blue-100 dark:bg-blue-500"
            className="mr-4"
          />
        </InfoCard>

        <InfoCard title="Total Task" value={pengumpulan + String(" Task")}>
          <RoundIcon
            icon={ChatIcon}
            iconColorClass="text-teal-500 dark:text-teal-100"
            bgColorClass="bg-teal-100 dark:bg-teal-500"
            className="mr-4"
          />
        </InfoCard>
      </div>
    </>
  );
}

export default Dashboard;
