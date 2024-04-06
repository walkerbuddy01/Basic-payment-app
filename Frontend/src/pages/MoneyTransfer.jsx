import React, { useState } from "react";
import InputBox from "../components/InputBox";
import Button from "../components/Button";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function MoneyTransfer() {
  const { username } = useParams();
  const [amount, setAmount] = useState();
  const navigate = useNavigate();

  return (
    <div className="h-screen w-full flex items-center justify-center bg-green-400 py-5">
      <div className="h-[50%] w-[25%] bg-red-50 p-2 rounded-xl py-5">
        <h3 className="font-bold text-center text-xl">Send Money</h3>
        <div className="flex h-[90%] flex-col justify-end gap-2">
          <h4 className="text-lg ">
            Receiver:{" "}
            <span
              className="font-bold
          "
            >
              {username}
            </span>{" "}
          </h4>
          <InputBox
            placeholder="walkerbuddy"
            type="text"
            className="mt-3"
            Label={"Amount (in Rs)"}
            labelClass="font-bold text-lg py-1"
            onChange={(e) => {
              setAmount(Number(e.target.value));
            }}
          />
          <Button
            className="w-[100%]  text-sm bg-green-500"
            children={"Send Money"}
            onClick={() => {
              axios
                .post("http://localhost:3000/api/v1/account/a/transcation", {
                  to: username,
                  amount,
                },{
                  withCredentials:true
                })
                .then(() => {
                  navigate("/dashboard");
                });
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default MoneyTransfer;
