import React, { useEffect } from "react";
import "./login.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import pic from '../../assets/images/pic2.webp'
import baseUrl from "../../axios";

function LoginAdmin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!email) {
        setErrorMessage("Email is required");
      } else if (
        !email.match(/^[A-Za-z0-9._-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/)
      ) {
        setErrorMessage("Enter a valid email");
      } else if (!password) {
        setErrorMessage("Password is required");
      } else if (password.length < 4) {
        setErrorMessage("Password must be atleast 4 characters");
      } else if (password.length > 20) {
        setErrorMessage("Password must be less than 20 characters");
      } else {
        const { data } = await axios.post(
          `${baseUrl}/admin-login`,
          {
            email: email,
            password: password,
          }
        );
        if (data) {
          if (data) {
            console.log(data);
            localStorage.setItem("token", data.token);
            navigate("/");
          } else {
            setErrorMessage(data);
          }
        } else {
          setErrorMessage("Something went wrong");
        }
      }
    } catch (error) {
      console.log(error.message);
      setError(error.response.data);
    }
  };

  return (
    <div>
      <section class="adm min-h-screen flex items-center justify-center">
        {/* <p className='text-white font-extralight text-xs md:text-2xl '>Welcome back Admin, <br></br>have a look at your Dashboard!</p> */}

        <div class="bg-white flex rounded-2xl shadow-2xl max-w-3xl p-5 items-center">
          {/* <p className='text-xl text-blue-900'>Hey,Admin Welcome Back!</p> */}

          <div class="md:w-1/2 px-8 md:px-16">
            <img className="w-1/2 mx-auto "  alt="" />
            <h2 class="font-bold text-3xl text-[#002D74] text-center p-2">
              {" "}
              Admin Login
            </h2>

            <form action="" class="flex flex-col gap-4">
              <input
                class="p-2 mt-8 rounded-xl border"
                type="email"
                name="email"
                placeholder="Email"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
              <div class="relative">
                <input
                  class="p-2 rounded-xl border w-full"
                  type="password"
                  name="password"
                  placeholder="Password"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
              </div>
              <button
                onClick={(e) => handleSubmit(e)}
                class="bg-[#002D74] rounded-xl text-white py-2 hover:scale-105 duration-300 "
              >
                Login
              </button>
              {errorMessage && (
                <div
                  className="p-2 mb-2 text-center text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800"
                  role="alert"
                >
                  {errorMessage}
                </div>
              )}
              {error && (
                <div
                  className="p-2 text-center mb-2 text-sm w-44 text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800 mx-auto"
                  role="alert"
                >
                  {" "}
                  {error}
                </div>
              )}
            </form>
          </div>

          <div class="md:block hidden w-1/2">
            <img
              class="rounded-2xl h-[456px]"
              src={pic}
            />
          </div>
        </div>
      </section>
    </div>
  );
}

export default LoginAdmin;
