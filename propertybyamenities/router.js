import express from "express";
import { getAmenitiesProperties_Controller } from "./controller.js";
import { amenitiesJoi, schemaValidator } from "../validators.js";
const router = express.Router();

router.get(
  "/properties",
  schemaValidator(amenitiesJoi),
  getAmenitiesProperties_Controller
);

export default router;
