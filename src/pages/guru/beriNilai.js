import React, { useState } from "react";
import { useParams, Link, useHistory } from "react-router-dom";
import PageTitle from "../../components/Typography/PageTitle";
import { Input, Label, Button } from "@windmill/react-ui";
import axios from "axios";
import { API_URL } from "../../components/Middleware/constants";
import UsersAccess from "../../components/Middleware/BlockUsers";
import * as SweetAlert from "../../components/Sweetalert2";
import * as Secure from "../../components/Middleware/SecureLocalStorage";

function BeriNilai() {
  // block login and akses role
  UsersAccess("guru");

  // FUNGSI EDIT DATA
  const [nilai, setNilai] = useState("");
  const { id } = useParams();
  const history = useHistory();

  const editUser = async (e) => {
    e.preventDefault();
    try {
      SweetAlert.SweetLoading();
      await axios.post(
        API_URL + `api/guru/nilai/${id}`,
        {
          nilai: nilai,
        },
        {
          withCredentials: true,
          headers: {
            Authorization: `${Secure.getItem("token")}`,
          },
        }
      );
      await SweetAlert.SweetOK("Sukses Memeri Nilai");
      history.push("/app/guru/penilaian");
    } catch (error) {
      await SweetAlert.SweetError(
        "Gagal Edit Data",
        error.response.data.message
      );
    }
  };

  return (
    <>
      <PageTitle>Edit Data User</PageTitle>
      <div className="px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
        <form onSubmit={editUser}>
          <Label>
            <span>Masukan Nilai</span>
            <Input
              className="mt-1"
              placeholder="Masukan Nama..."
              value={nilai}
              onChange={(e) => setNilai(e.target.value)}
            />
          </Label>

          <div className="mt-4" style={{ textAlign: "right" }}>
            <Button layout="outline" tag={Link} to="/app/guru/penilaian">
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

export default BeriNilai;
