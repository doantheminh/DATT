import express from "express";
import { create, getAll, getOne, remove, update } from "../controllers/product";
import { checkPermission } from "../middlewares/checkPermission";

const router = express.Router();

router.post("/products", checkPermission, create);
router.get("/products", getAll)
router.patch("/products/:id", checkPermission, update);
router.get("/products/:id", getOne);
router.delete("/products/:id", checkPermission, remove)





export default router;