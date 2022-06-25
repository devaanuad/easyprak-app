import PageTitle from "../../components/Typography/PageTitle";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import {
  Table,
  TableHeader,
  TableCell,
  TableBody,
  TableRow,
  TableContainer,
  Button,
} from "@windmill/react-ui";
import { FormsIcon, EditIcon } from "../../icons";
import axios from "axios";
import { API_URL } from "../../components/Middleware/constants";
import UsersAccess from "../../components/Middleware/BlockUsers";
import * as Secure from "../../components/Middleware/SecureLocalStorage";

function Nilai() {
  UsersAccess("guru");

  // block login and akses role
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const getUsers = async () => {
    const response = await axios.get(API_URL + `api/siswa/nilai/`, {
      withCredentials: true,
      headers: {
        Authorization: `${Secure.getItem("token")}`,
      },
    });
    setUsers(response.data.data);
    setLoading(true);
  };

  // dapetin data user  dari function getUsers lalu set ke state setUsers
  useEffect(() => {
    getUsers();
  }, []);

  return (
    <>
      <PageTitle>List Nilai Siswa</PageTitle>

      <TableContainer className="mb-8">
        <Table>
          <TableHeader>
            <tr>
              <TableCell>Nama Siswa</TableCell>
              <TableCell>Kelas</TableCell>
              <TableCell>Matpel</TableCell>
              <TableCell>Nilai</TableCell>
              <TableCell>OPSI</TableCell>
            </tr>
          </TableHeader>
          {loading ? (
            users.map((ujian) => (
              <TableBody key={ujian.id}>
                <TableRow>
                  <TableCell>
                    <span className="text-sm">{ujian.nama_siswa}</span>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm">{ujian.kelas}</span>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm">{ujian.matpel}</span>
                  </TableCell>

                  <TableCell>
                    <span className="text-sm">{ujian.nilai}</span>
                  </TableCell>

                  <TableCell>
                    <div className="flex items-center space-x-4">
                      <a
                        layout="link"
                        size="icon"
                        aria-label="Edit"
                        href={ujian.file}
                      >
                        <FormsIcon className="w-5 h-5" aria-hidden="true" />
                      </a>

                      <Button
                        layout="link"
                        size="icon"
                        aria-label="Edit"
                        tag={Link}
                        to={`/app/guru/penilaian/siswa/${ujian.id}`}
                      >
                        <EditIcon className="w-5 h-5" aria-hidden="true" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              </TableBody>
            ))
          ) : (
            <TableBody>
              <TableRow>
                <TableCell colSpan={6}>
                  <div className="pos-center">
                    <div className="loader" />
                  </div>
                </TableCell>
              </TableRow>
            </TableBody>
          )}
        </Table>
      </TableContainer>
    </>
  );
}

export default Nilai;
