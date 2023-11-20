import express from "express";
import { create, getAll, getOne, remove, update } from "../controllers/category";
import { checkPermission } from "../middlewares/checkPermission";

const router = express.Router();

router.post("/categorys", create);
router.patch("/categorys/:id", update);
router.get("/categorys/:id", getOne);
router.delete("/categorys/:id", remove);
router.get("/categorys", getAll);






export default router;