import express from "express";
import { checkfavourite, favouriteCreat, getAllFavourites, getFavourites, removeFavourite } from "../controllers/favourite";

const router = express.Router();

router.post('/favourite', favouriteCreat)
router.get('/favourite', getAllFavourites)

router.get('/favourite/:user_id', getFavourites)
router.delete('/favourite/remove/:user_id/:product_id', removeFavourite)
router.get('/favourite/:user_id/check/:product_id', checkfavourite)

export default router   