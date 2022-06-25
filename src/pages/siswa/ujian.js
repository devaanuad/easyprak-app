import PageTitle from "../../components/Typography/PageTitle";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import {
  Table,
  TableHeader,
  TableCell,
  TableBody,
  TableRow,
  TableFooter,
  TableContainer,
  Button,
  Pagination,
  Input,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Label,
  Select,
} from "@windmill/react-ui";
import { EditIcon, TrashIcon, SearchIcon } from "../../icons";
import axios from "axios";
import { API_URL } from "../../components/Middleware/constants";
import UsersAccess from "../../components/Middleware/BlockUsers";
import * as SweetAlert from "../../components/Sweetalert2";
import * as Secure from "../../components/Middleware/SecureLocalStorage";

function Ujian() {
  // block login and akses role
  UsersAccess("siswa");
  const [ujiann, setUjiann] = useState([]);
  const [pageTable2, setPageTable2] = useState(1);
  const [dataTable2, setDataTable2] = useState([]);
  const [loading, setLoading] = useState(false);

  // for search nya
  const [search, setSearch] = useState("");
  // pagination setup
  const resultsPerPage = 10;
  const totalResults = ujiann.length;

  // pagination change control
  function onPageChangeTable2(p) {
    setPageTable2(p);
  }

  const getujiann = async () => {
    const response = await axios.get(API_URL + "api/siswa/ujian", {
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

  // Jika ada perubahan di state search ,maka tampilkan data full (tanpa pagination) untuk di filter
  useEffect(() => {
    if (search !== "") {
      setDataTable2(
        ujiann.filter((user) =>
          user.nama.toLowerCase().includes(search.toLowerCase())
        )
      );
    } else if (search === "") {
      setDataTable2(
        ujiann.slice(
          (pageTable2 - 1) * resultsPerPage,
          pageTable2 * resultsPerPage
        )
      );
    }
  }, [search]);

  return (
    <>
      <PageTitle>List Ujian</PageTitle>
      <div className="grid gap-3 md:grid-cols-3 xl:grid-cols-3  w-xl mb-5">
        <div className="relative focus-within:text-purple-500">
          <div className="absolute inset-y-0 flex items-center pl-2">
            <SearchIcon className="w-4 h-4" aria-hidden="true" />
          </div>
          <Input
            type="text"
            className="pl-8 text-gray-700"
            placeholder="Search Data"
            aria-label="Search"
            onChange={(event) => {
              setSearch(event.target.value);
            }}
          />
        </div>
        <div />
      </div>

      <TableContainer className="mb-8">
        <Table>
          <TableHeader>
            <tr>
              <TableCell>Nama Ujian</TableCell>
              <TableCell>Matpel</TableCell>
              <TableCell>Kelas</TableCell>
              <TableCell>Durasi</TableCell>
              <TableCell>Mulai Ujian</TableCell>
              <TableCell>Selesai Ujian</TableCell>
              <TableCell>Start</TableCell>
            </tr>
          </TableHeader>
          {loading ? (
            dataTable2.map((ujian) => (
              <TableBody key={ujian.id}>
                <TableRow>
                  <TableCell>
                    <span className="text-sm">{ujian.nama}</span>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm">{ujian.matpel}</span>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm">{ujian.kelas}</span>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm">{ujian.durasi}</span>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm">{ujian.mulai_ujian}</span>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm">{ujian.selesai_ujian}</span>
                  </TableCell>
                  <TableCell>
                    <Button
                      tag={Link}
                      to={`/app/siswa/start/${ujian.kode_soal}`}
                    >
                      Start Ujian
                    </Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            ))
          ) : (
            <TableBody>
              <TableRow>
                <TableCell colSpan={7}>
                  <div className="pos-center">
                    <div className="loader" />
                  </div>
                </TableCell>
              </TableRow>
            </TableBody>
          )}
        </Table>
        <TableFooter>
          <Pagination
            totalResults={totalResults}
            resultsPerPage={resultsPerPage}
            onChange={onPageChangeTable2}
            label="Table navigation"
          />
        </TableFooter>
      </TableContainer>
    </>
  );
}

export default Ujian;
