import PageTitle from "../../components/Typography/PageTitle";
import React, { useState, useEffect } from "react";
import {
  Table,
  TableHeader,
  TableCell,
  TableBody,
  TableRow,
  TableFooter,
  TableContainer,
  Pagination,
  Input,
} from "@windmill/react-ui";
import { SearchIcon, FormsIcon } from "../../icons";
import UsersAccess from "../../components/Middleware/BlockUsers";
import response from "../../utils/demo/tableData";

function Soal() {
  // block login and akses role
  UsersAccess("siswa");

  const [users, setUsers] = useState([]);
  const [pageTable2, setPageTable2] = useState(1);
  const [dataTable2, setDataTable2] = useState([]);
  const [loading, setLoading] = useState(false);

  // for search nya
  const [search, setSearch] = useState("");
  // pagination setup
  const resultsPerPage = 10;
  const totalResults = users.length;

  // pagination change control
  function onPageChangeTable2(p) {
    setPageTable2(p);
  }

  const getUsers = async () => {
    setUsers(response);
    setLoading(true);
  };

  console.log(response);

  // dapetin data user  dari function getUsers lalu set ke state setUsers
  useEffect(() => {
    getUsers();
  }, []);

  // ketika ada perubahan di state user ,maka set data baru ke state setDataTable2
  useEffect(() => {
    if (users.length > 0) {
      setDataTable2(
        users.slice(
          (pageTable2 - 1) * resultsPerPage,
          pageTable2 * resultsPerPage
        )
      );
    }
  }, [users]);

  // ketika ada perubahan di state dataTable2, maka render data baru yang digunakan untuk pagination mapping
  useEffect(() => {
    setDataTable2(
      users.slice(
        (pageTable2 - 1) * resultsPerPage,
        pageTable2 * resultsPerPage
      )
    );
  }, [pageTable2]);

  // Jika ada perubahan di state search ,maka tampilkan data full (tanpa pagination) untuk di filter
  useEffect(() => {
    if (search !== "") {
      setDataTable2(
        users.filter((user) =>
          user.matpel.toLowerCase().includes(search.toLowerCase())
        )
      );
    } else if (search === "") {
      setDataTable2(
        users.slice(
          (pageTable2 - 1) * resultsPerPage,
          pageTable2 * resultsPerPage
        )
      );
    }
  }, [search]);

  return (
    <>
      <PageTitle>Data Referensi Praktek</PageTitle>
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
              <TableCell>Matpel</TableCell>
              <TableCell>Kelas</TableCell>
              <TableCell>file</TableCell>
              {/* <TableCell>Opsi</TableCell> */}
            </tr>
          </TableHeader>
          {loading ? (
            dataTable2.map((user) => (
              <TableBody key={user.id}>
                <TableRow>
                  <TableCell>
                    <span className="text-sm">{user.matpel}</span>
                  </TableCell>

                  <TableCell>
                    <span className="text-sm">{user.kelas}</span>
                  </TableCell>

                  <TableCell>
                    <div className="flex items-center space-x-4">
                      <a
                        layout="link"
                        size="icon"
                        aria-label="Edit"
                        href={user.file}
                      >
                        <FormsIcon className="w-5 h-5" aria-hidden="true" />
                      </a>
                    </div>
                  </TableCell>
                </TableRow>
              </TableBody>
            ))
          ) : (
            <TableBody>
              <TableRow>
                <TableCell colSpan={5}>
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

export default Soal;
