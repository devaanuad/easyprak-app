import React, { useState, useEffect, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import PageTitle from "../../components/Typography/PageTitle";
import { Input, Label, Select, Button } from "@windmill/react-ui";
import axios from "axios";
import { API_URL } from "../../components/Middleware/constants";
import UsersAccess from "../../components/Middleware/BlockUsers";
import * as SweetAlert from "../../components/Sweetalert2";
import * as Secure from "../../components/Middleware/SecureLocalStorage";

function BuatSoal() {
  // block login and akses role
  UsersAccess("guru");

  // FUNGSI EDIT DATA
  const [matpel, setMatpel] = useState("");
  const [soal, setSoal] = useState("");
  const [kelas, setKelas] = useState("");
  const [guru, setGuru] = useState("");
  const [kodeSoal, setkodeSoal] = useState("");
  const history = useHistory();

  const submitSoal = async (e) => {
    e.preventDefault();
    try {
      SweetAlert.SweetLoading();
      await axios.post(
        API_URL + `api/guru/soal/create`,
        {
          matpel: matpel,
          soal: soal,
          kelas: kelas,
          guru: guru,
          kode_soal: kodeSoal,
        },
        {
          withCredentials: true,
          headers: {
            Authorization: `${Secure.getItem("token")}`,
          },
        }
      );
      await SweetAlert.SweetOK("Sukses Menambah Data");
      history.push("/app/guru/soal");
    } catch (error) {
      await SweetAlert.SweetError(
        "Gagal tambah soal Data",
        error.response.data.message
      );
    }
  };

  return (
    <>
      <PageTitle>Tambah Data Tugas</PageTitle>
      <div className="px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
        <form onSubmit={submitSoal}>
          <Label>
            <span>Mata Pelajaran</span>
            <Input
              className="mt-1"
              value={matpel}
              onChange={(e) => setMatpel(e.target.value)}
            />
          </Label>
          <Label className="mt-4">
            <span>Tugas Nya</span>
            <Input
              className="mt-1"
              value={soal}
              onChange={(e) => setSoal(e.target.value)}
            />
          </Label>
          <Label className="mt-4">
            <span>Role</span>
            <Select
              className="mt-1"
              value={kelas}
              onChange={(e) => setKelas(e.target.value)}
              required
            >
              <option>Pilih Kelas</option>
              <option>X</option>
              <option>XI</option>
              <option>XII</option>
            </Select>
          </Label>
          <Label className="mt-4">
            <span>Nama Guru</span>
            <Input
              className="mt-1"
              value={guru}
              onChange={(e) => setGuru(e.target.value)}
            />
          </Label>

          <Label className="mt-4">
            <span>Kode Soal</span>
            <Input
              className="mt-1"
              value={kodeSoal}
              onChange={(e) => setkodeSoal(e.target.value)}
            />
          </Label>

          <div className="mt-4" style={{ textAlign: "right" }}>
            <Button layout="outline" tag={Link} to="/app/guru/soal">
              Back
            </Button>
            <Button type="submit" className="ml-3">
              Submit
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}

export default BuatSoal;
