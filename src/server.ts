import BackendApp from "./backendApp";
import cors from "cors";
import express from "express";

import UserController from "./controllers/userController";
import AuthenticationController from "./controllers/authenticationController";

import dotenv from "dotenv";

dotenv.config();

const server = new BackendApp({
    port: Number(process.env.PORT) || 65036,
    middleWares: [
        cors(),
        express.json(),
        express.urlencoded({ extended: true })
    ],
    controllers: [
        new UserController(),
        new AuthenticationController()
    ]
})

server.listen()
