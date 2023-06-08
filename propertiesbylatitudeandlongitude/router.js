import express from "express";
import { getPropertiesByNearLatitudeAndLongitude } from "./controller.js";
import { latitudeAndLongitudeJoi, schemaValidator } from "../validators.js";
const router = express.Router();

router.get(
  "/properties/bycoordinates",
  schemaValidator(latitudeAndLongitudeJoi),
  getPropertiesByNearLatitudeAndLongitude
);

export default router;
