import BackendApp from "./backendApp";
import cors from "cors";
import express from "express";

import dotenv from "dotenv";

import UserController from "./controllers/UserController";
import AuthenticationController from "./controllers/AuthenticationController";
import ProductController from "./controllers/ProductController";
import OfferController from "./controllers/OfferController";
import ProfileController from "./controllers/ProfileController";
import CategoryController from "./controllers/CategoryController";

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
        new ProductController(),
        new OfferController(),
        new ProfileController(),
        new CategoryController()
    ]
})

server.listen()
