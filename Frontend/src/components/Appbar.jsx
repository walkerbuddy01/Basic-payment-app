import  axios  from "axios";
import React, { useEffect, useState } from "react";
import Balance from "./Balance";

function Appbar() {
  const [userData, setUserData] = useState("");
  const [Loading, setLoading] = useState(true);
  const fetchUserDetails = async () => {
    const response = await axios.get(
      "http://localhost:3000/api/v1/account/a/balance",
      {
        withCredentials: true,
      }
    );

    setUserData(response.data.data);
    setLoading(false);
  };

  useEffect(() => {
    fetchUserDetails();
  }, []);

  return (
    <nav className="shadow-md shadow-gray-500 px-5 h-12 w-full  flex justify-between items-center">
      <h1 className="text-lg text-black font-poppins font-medium">
        Buddy Wallet
      </h1>

      {Loading ? (
        <h3>loading.....</h3>
      ) : (
        <div>
          <Balance userBalance={userData.balance} />
          <h2 className="text-base font-bold ">{userData.firstName}</h2>
        </div>
      )}
    </nav>
  );
}

export default Appbar;
