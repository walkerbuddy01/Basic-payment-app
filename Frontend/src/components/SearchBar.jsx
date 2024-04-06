import React, { useCallback, useEffect, useState } from "react";
import InputBox from "./InputBox";
import User from "./User";
import axios from "axios";

function SearchBar() {
  const [usersDetails, setUsersDetails] = useState([]);
  const [username, setUsername] = useState("");
  const [Loading, setLoading] = useState(true);
  const fetchUserDetails = async () => {
    const response = await axios.get(
      `http://localhost:3000/api/v1/user/s/search?filter=${username}`,
      {
        withCredentials: true,
      }
    );

    setUsersDetails(response.data.data);
    setLoading(false);
  };
  useEffect(() => {
    const value = setTimeout(() => {
      fetchUserDetails();
    }, 1000);
    return () => {
      clearTimeout(value);
    };
  }, [username]);
  return (
    <div className="px-2 w-full h-full flex flex-col justify-center items-center overflow-hidden">
      <div className="px-5 w-[90%] mb-6">
        <InputBox
          placeholder="walkerbuddy"
          type="search"
          className="mt-3"
          Label={"Search user"}
          labelClass="font-bold text-lg py-1"
          onChange={(e) => {
            if (e.target.value.trim !== "") {
              setUsername(e.target.value);
            }
          }}
        />
      </div>
      <div className="bg-gray-300 h-[22rem] w-[90%] overflow-x-hidden overflow-y-scroll rounded-xl px-4 p-2">
        {usersDetails.map((user) => (
          <User username={user.username} />
        ))}
      </div>
    </div>
  );
}

export default SearchBar;
