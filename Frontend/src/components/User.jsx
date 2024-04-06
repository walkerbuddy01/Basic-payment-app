import React from "react";
import Button from "./Button";
import { useNavigate } from "react-router-dom";

function User({ username }) {
  const navigate = useNavigate();
  return (
    <div
      className="bg-white/75 h-12 flex items-center justify-between p-2 px-4 rounded-2xl"
      key={username}
    >
      <h5 className="font-bold">{username}</h5>
      <Button
        className="w-[10%] h-full text-sm"
        children={"Send Money"}
        onClick={() => {
          navigate(`/moneytransfer/${username}`);
        }}
      />
    </div>
  );
}

export default User;
