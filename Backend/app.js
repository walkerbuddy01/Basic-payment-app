import express, { urlencoded } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import user from "./src/routes/user.route.js";
import account from "./src/routes/account.route.js";

export const app = express();

app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials:true
  })
);

app.use(express.static("./public/temp"));
app.use(
  express.json({
    limit: "20kb", //  json limit 
  })
);
app.use(
  urlencoded({
    extended: true, // this show that is url encoded accepts or not
    limit: "20kb", // middleware to limit the payload of the request
  })
);

// import routes

// declartion of the routes
app.use("/api/v1/user", user)
app.use("/api/v1/account", account)
