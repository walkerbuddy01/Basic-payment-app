import React, { useState } from "react";
import Heading from "../components/Heading";
import InputBox from "../components/InputBox";
import Button from "../components/Button";
import { Link, useNavigate } from "react-router-dom";
import WarningSign from "../components/WarningSign";
import axios from "axios";

function Signup() {
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [data, setdata] = useState("");
  const [error, setError] = useState("");
  const navigate =  useNavigate()
  return (
    <div className="w-full h-screen flex items-center justify-center bg-gray-500">
      <div className="bg-white h-[95%] w-[30%] rounded-lg flex flex-col items-center gap-2">
        <Heading label="Sign up" className="font-poppins" />
        <p className="font-poppins text-center font-medium text-base">
          Enter your Information to create a fresh account
        </p>
        <InputBox
          placeholder="walkerbuddy"
          type="text"
          className="mt-3"
          Label={"Username"}
          onChange={(e) => setUsername(e.target.value)}
        />
        <InputBox
          placeholder="karansharma@gmail.com"
          type="text"
          className="mt-3"
          Label={"Email"}
          onChange={(e) => setEmail(e.target.value)}
        />
        <InputBox
          placeholder="Karan"
          type="text"
          className="mt-3"
          Label={"Firstname"}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <InputBox
          placeholder="Sharma"
          type="text"
          className="mt-3"
          Label={"Lastname"}
          onChange={(e) => setLastName(e.target.value)}
        />
        <InputBox
          placeholder="12345"
          type="password"
          className="mt-3"
          Label={"Password"}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          children={"Sign up"}
          className="w-[90%]"
          onClick={() => {
            axios
              .post("http://localhost:3000/api/v1/user/n/signup", {
                username,
                email,
                firstName,
                lastName,
                password,
              })
              .then((resposne) => {
                axios
                  .post("http://localhost:3000/api/v1/user/n/signin", {
                    username,
                    password,
                  })
                  .then((resposne) => {
                    setdata(resposne)
                    navigate("/dashboard")

                  });
              });
            console.log(data);
          }}
        />

        <p>
          Already Have Account ?
          <Link to={"/signin"}>
            <span className="transition-all ease-linear hover:text-blue-600 hover:font-medium underline-offset-1 hover:underline">
              SignIn
            </span>
          </Link>
        </p>
        {error && <WarningSign error={error} />}
      </div>
    </div>
  );
}

export default Signup;
