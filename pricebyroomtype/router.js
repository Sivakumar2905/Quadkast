import express from "express";
import { getTotalPricebyRoomtype_Controller } from "./controller.js";
import { roomtypeJoi, schemaValidator } from "../validators.js";
const router = express.Router();

router.get(
  "/price/byroomtype",
  schemaValidator(roomtypeJoi),
  getTotalPricebyRoomtype_Controller
);

export default router;
