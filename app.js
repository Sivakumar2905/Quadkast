import express from "express";
import dotenv from "dotenv";

import propertyByAmenitiesRouter from "./propertybyamenities/router.js";
import totalPriceByRoomTypeRouter from "./pricebyroomtype/router.js";
import searchByNameRouter from "./searchbyname//router.js";
import propertyByCoordinates from "./propertiesbylatitudeandlongitude/router.js";

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(express.json());

const methodMiddleWare = async (req, res, next) => {
  const methods = ["GET"];
  if (!methods.includes(req.method)) {
    res.status(405).json({ status: 405, data: "Invalid Method" });
    return;
  }
  next();
};

app.use(methodMiddleWare);

app.use(
  "/api",
  propertyByAmenitiesRouter,
  totalPriceByRoomTypeRouter,
  searchByNameRouter,
  propertyByCoordinates
);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
