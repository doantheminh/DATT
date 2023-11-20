import express from "express";
import { create, getAll, getOne, remove, update } from "../controllers/user";
const router = express.Router();
router.post("/User", create);
router.get("/User", getAll)
router.patch("/User/:id", update);
router.get("/User/:id", getOne);
router.delete("/User/:id", remove);
export default router;