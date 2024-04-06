import React, { useEffect, useState } from "react";
import Appbar from "../components/Appbar";
import Balance from "../components/Balance";
import SearchBar from "../components/SearchBar";
import WarningSign from "../components/WarningSign";
import axios from "axios";

function DashBoard() {
  const [error, setError] = useState("");

  return (
    <div>
      <Appbar />
      <div className="p-4">
        {error && <WarningSign error={error} />}
        <SearchBar />
      </div>
    </div>
  );
}

export default DashBoard;
