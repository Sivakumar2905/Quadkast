import express from "express";
import { searchByName_Controller } from "./controller.js";
import { schemaValidator, searchByNameJoi } from "../validators.js";
const router = express.Router();

router.get(
  "/search/byname",
  schemaValidator(searchByNameJoi),
  searchByName_Controller
);

export default router;
