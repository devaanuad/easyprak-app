import React, { useState, useEffect, useContext } from "react";
import { useParams, Link, useHistory } from "react-router-dom";
import PageTitle from "../../components/Typography/PageTitle";
import {
  Input,
  Label,
  Select,
  Button,
  TableCell,
  TableBody,
  TableRow,
  Pagination,
} from "@windmill/react-ui";
import axios from "axios";
import { API_URL } from "../../components/Middleware/constants";
import UsersAccess from "../../components/Middleware/BlockUsers";
import * as SweetAlert from "../../components/Sweetalert2";
import * as Secure from "../../components/Middleware/SecureLocalStorage";

function Start() {
  // block login and akses role
  UsersAccess("siswa");

  const { kodeSoal } = useParams();
  console.log(kodeSoal);
  const [ujiann, setUjiann] = useState([]);
  const [pageTable2, setPageTable2] = useState(1);
  const [dataTable2, setDataTable2] = useState([]);
  const [loading, setLoading] = useState(false);

  // pagination setup
  const resultsPerPage = 1;
  const totalResults = ujiann.length;

  // pagination change control
  function onPageChangeTable2(p) {
    setPageTable2(p);
  }

  const getujiann = async () => {
    const response = await axios.get(API_URL + `api/siswa/ujian/${kodeSoal}`, {
      withCredentials: true,
      headers: {
        Authorization: `${Secure.getItem("token")}`,
      },
    });
    setUjiann(response.data.data);
    setLoading(true);
  };

  // dapetin data user  dari function getujiann lalu set ke state setUjiann
  useEffect(() => {
    getujiann();
  }, []);

  // ketika ada perubahan di state user ,maka set data baru ke state setDataTable2
  useEffect(() => {
    if (ujiann.length > 0) {
      setDataTable2(
        ujiann.slice(
          (pageTable2 - 1) * resultsPerPage,
          pageTable2 * resultsPerPage
        )
      );
    }
  }, [ujiann]);

  // ketika ada perubahan di state dataTable2, maka render data baru yang digunakan untuk pagination mapping
  useEffect(() => {
    setDataTable2(
      ujiann.slice(
        (pageTable2 - 1) * resultsPerPage,
        pageTable2 * resultsPerPage
      )
    );
  }, [pageTable2]);

  console.log(dataTable2);

  return (
    <>
      <PageTitle>Edit Data User</PageTitle>

      <div className="px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
        <div className="max-w-2xl px-6 py-8 mx-auto space-y-12">
          {loading ? (
            dataTable2.map((soal, i) => (
              <>
                <div className="space-y-6">
                  <div className="flex flex-col items-start justify-between w-full md:flex-row md:items-center dark:text-gray-400">
                    <div className="flex items-center md:space-x-2">
                      <p className="text-sm">
                        Matpel : {soal.matpel} | Kelas {soal.kelas}
                      </p>
                    </div>
                    <p className="flex-shrink-0 mt-3 text-sm md:mt-0">
                      Guru • {soal.guru}
                    </p>
                  </div>
                </div>

                <article
                  className="space-y-8 dark:bg-gray-800 dark:text-gray-50"
                  key={i}
                >
                  <div className="dark:text-gray-100">
                    <h1>{soal.soal}</h1>
                  </div>
                </article>
                <div>
                  <div className="flex flex-wrap py-6 space-x-2 border-t border-dashed dark:border-gray-400" />
                  <div className="space-y-2">
                    <form>
                      <Label className="mt-4">
                        <Input className="mt-1" type="file" />
                      </Label>
                    </form>
                  </div>
                </div>
              </>
            ))
          ) : (
            <div className="pos-center">
              <div className="loader" />
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Start;
