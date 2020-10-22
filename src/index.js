import express from "express";
//import passport from "passport";
import apiRouter from "./api/company";
//import authRouter from "./auth";
//import setJwtStrategy from "./auth/jwtstrategy";

const server = new express();
//server.use(passport.initialize());
//setJwtStrategy(passport);
server.use(express.urlencoded());
server.use(express.json());
server.use("/api/company", apiRouter);
//server.use("/auth", authRouter);
server.listen(7000);
    console.log("http://localhost:7000");
