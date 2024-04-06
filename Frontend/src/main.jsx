import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Signup from "./pages/Signup.jsx";
import Signin from "./pages/SignIn.jsx";
import DashBoard from "./pages/DashBoard.jsx";
import MoneyTransfer from "./pages/MoneyTransfer.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      {/* <Route path="/" element={<App/>} /> */}
      <Route path="/" element={<Signup/>} />
      <Route path="/signin" element={<Signin/>} />
      <Route path="/dashboard" element={<DashBoard/>} />
      <Route path="/moneytransfer/:username" element={<MoneyTransfer/>} />
    </>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router}>
    <App />
  </RouterProvider>
);
