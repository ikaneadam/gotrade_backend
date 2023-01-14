import "reflect-metadata"
import { DataSource } from "typeorm"
import dotenv from "dotenv";

import { User } from "./entity/User"
import { Address } from "./entity/Address";
import { Category } from "./entity/Category";
import { Notification } from "./entity/Notification";
import { Product } from "./entity/Product";
import { ProductAttribute } from "./entity/ProductAttribute";
import { Order } from "./entity/Order";
import { Profile } from "./entity/Profile";
import { Review } from "./entity/Review";
import {Offer} from "./entity/Offer";

dotenv.config();

export const AppDataSource = new DataSource({
    type: "postgres",
    host: String(process.env.DB_HOST),
    username: String(process.env.POSTGRES_USERNAME),
    password: String(process.env.POSTGRES_PASSWORD),
    database: String(process.env.POSTGRES_DB),
    port: Number(process.env.POSTGRES_PORT),
    synchronize: true,
    logging: false,
    entities: [Address, Category, Notification, Order, Product, ProductAttribute, Profile, Review, User, Offer]
})

