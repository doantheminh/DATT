import express from "express";
import mongoose from "mongoose";
import authrouter from "./routers/auth"
import categoryRouter from "./routers/catagory";
import productRouter from "./routers/product";
import cors from "cors";
import routerUser from "./routers/user";
import favouriteRouter from "./routers/favourite"
const app = express();

app.use(express.json());
app.use(cors());

app.use("/api", routerUser);
app.use("/api", productRouter);
app.use("/api", authrouter)
app.use("/api", categoryRouter);
app.use("/api", favouriteRouter);

mongoose.connect("mongodb://127.0.0.1:27017/angular");

export const viteNodeApp = app;