import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Label, Input, Button } from "@windmill/react-ui";
import axios from "axios";
import getCSRF from "../components/Middleware/GetCSRF";
import * as SweetAlert from "../components/Sweetalert2";
import { API_URL } from "../components/Middleware/constants";
import * as Secure from "../components/Middleware/SecureLocalStorage";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const History = useHistory();

  const tokens = Secure.getItem("token");
  const role = Secure.getItem("role");
  if (tokens) {
    role === "guru"
      ? History.push("/app/guru/dashboard")
      : role === "siswa"
      ? History.push("/app/siswa/ujian")
      : History.push("/login");
  } else if (tokens === null) {
    History.push("/login");
  }

  // panggil untuk buka blokiran csrf token
  useEffect(() => {
    getCSRF();
  }, []);

  const SubmitLogin = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("email", email);
    data.append("password", password);

    try {
      SweetAlert.SweetLoading();
      await axios
        .post(API_URL + "api/login", data, {
          withCredentials: true,
        })
        .then((res) => {
          if (res.status === 200) {
            SweetAlert.SweetOK("Login Berhasil");
            // set token, data user ,dan role ke local storage
            Secure.setItem(
              "token",
              res.data.data.token_type + " " + res.data.data.token
            );
            Secure.setItem("data_user", JSON.stringify(res.data.data.user));
            Secure.setItem("role", res.data.data.user.role);

            if (res.data.data.user.role === "guru") {
              History.push("/app/guru/dashboard");
            } else if (res.data.data.user.role === "siswa") {
              History.push("/app/siswa/ujian");
            }
          }
        });
    } catch (error) {
      SweetAlert.SweetError("Login Failed", error.response.data.message);
    }
  };

  return (
    <div className="flex items-center min-h-screen p-6 bg-gray-50 dark:bg-gray-900">
      <div className="flex-1 h-full max-w-md mx-auto overflow-hidden bg-white rounded-lg shadow-xl dark:bg-gray-800">
        <div className="flex flex-col overflow-y-auto md:flex-row">
          <main className="flex items-center justify-center p-6 sm:p-12 md:w-full">
            <div className="w-full">
              <h1
                className="mb-4 text-xl font-semibold text-gray-700 dark:text-gray-200"
                style={{ textAlign: "center" }}
              >
                Login
              </h1>
              <form onSubmit={SubmitLogin}>
                <Label>
                  <span>Email</span>
                  <Input
                    className="mt-1"
                    type="email"
                    placeholder="email@mail.com"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    required
                  />
                </Label>

                <Label className="mt-4">
                  <span>Password</span>
                  <Input
                    className="mt-1"
                    type="password"
                    placeholder="***************"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    required
                  />
                </Label>

                <Button className="mt-4" block type="submit">
                  Log in
                </Button>
              </form>
              <hr className="my-8" />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default Login;