import React, { useState } from "react";
import Heading from "../components/Heading";
import InputBox from "../components/InputBox";
import Button from "../components/Button";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Signin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [data, setData] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  return (
    <div className="w-full h-screen flex items-center justify-center bg-gray-500">
      <div className="bg-white h-[66%] w-[30%] rounded-lg flex flex-col items-center gap-2">
        <Heading label="Sign in" className="font-poppins" />
        <p className="font-poppins text-center py-2 font-medium text-base">
          Enter your credentails to access your account
        </p>
        <InputBox
          placeholder="walkerbuddy"
          type="text"
          className="mt-3"
          Label={"Username"}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
        <InputBox
          placeholder="12345"
          type="password"
          className="mt-3"
          Label={"Password"}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <Button
          children={"Sign in "}
          className="w-[90%]"
          onClick={() => {
            axios
              .post(
                "http://localhost:3000/api/v1/user/n/signin",
                {
                  username,
                  password,
                },
                {
                  withCredentials: true,
                }
              )
              .then((resposne) => {
                setData(resposne);
                navigate("/dashboard");
              });

            return data;
          }}
        />

        <p>
          Create new account{" "}
          <Link to={"/"}>
            {" "}
            <span className="transition-all ease-linear hover:text-blue-600 hover:font-medium underline-offset-1 hover:underline">
              SignUp
            </span>{" "}
          </Link>
        </p>
        {error && <WarningSign error={error} />}
      </div>
    </div>
  );
}

export default Signin;
