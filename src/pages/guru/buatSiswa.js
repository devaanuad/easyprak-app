import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import PageTitle from "../../components/Typography/PageTitle";
import { Input, Label, Select, Button } from "@windmill/react-ui";
import axios from "axios";
import { API_URL } from "../../components/Middleware/constants";
import UsersAccess from "../../components/Middleware/BlockUsers";
import * as SweetAlert from "../../components/Sweetalert2";
import * as Secure from "../../components/Middleware/SecureLocalStorage";

function BuatSiswa() {
  // block login and akses role
  UsersAccess("guru");

  // FUNGSI EDIT DATA
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [kelas, setKelas] = useState("");
  const [role, setRole] = useState("");

  const history = useHistory();

  const submitDataa = async (e) => {
    e.preventDefault();
    try {
      SweetAlert.SweetLoading();
      await axios.post(
        API_URL + `api/guru/siswa/create`,
        {
          name: name,
          email: email,
          password: password,
          kelas: kelas,
          role: role,
        },
        {
          withCredentials: true,
          headers: {
            Authorization: `${Secure.getItem("token")}`,
          },
        }
      );
      await SweetAlert.SweetOK("Sukses Menambah Data");
      history.push("/app/guru/siswa");
    } catch (error) {
      await SweetAlert.SweetError(
        "Gagal add Data",
        error.response.data.message
      );
    }
  };

  return (
    <>
      <PageTitle>Tambah Data Siswa</PageTitle>
      <div className="px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
        <form onSubmit={submitDataa}>
          <Label>
            <span>Nama</span>
            <Input
              className="mt-1"
              placeholder="Masukan Nama..."
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Label>
          <Label className="mt-4">
            <span>Email Nya</span>
            <Input
              className="mt-1"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Label>
          <Label className="mt-4">
            <span>Kelas</span>
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
            <span>Password</span>
            <Input
              className="mt-1"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Label>
          <Label className="mt-4">
            <span>Role</span>
            <Select
              className="mt-1"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
            >
              <option>Pilih Kelas</option>
              <option>guru</option>
              <option>siswa</option>
            </Select>
          </Label>

          <div className="mt-4" style={{ textAlign: "right" }}>
            <Button layout="outline" tag={Link} to="/app/guru/siswa">
              Back
            </Button>
            <Button type="submit" className="ml-3">
              Update
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}

export default BuatSiswa;
