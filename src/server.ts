import BackendApp from "./backendApp";
import cors from "cors";
import express from "express";

import UserController from "./controllers/UserController";
import AuthenticationController from "./controllers/AuthenticationController";

import dotenv from "dotenv";
import ProductController from "./controllers/ProductController";

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
        new AuthenticationController(),
        new ProductController()
    ]
})

server.listen()
