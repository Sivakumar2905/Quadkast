import { connectDB } from "../mongodb.js";
import { QUADKAST } from "../collection.js";

export const getPropertiesByNearLatitudeAndLongitude = async (
  req,
  res,
  next
) => {
  try {
    const { latitude, longitude } = req.query;

    if (!latitude || !longitude) {
      res.status(400).json({
        status: 400,
        data: "Latitude and Longitude Must Be Given",
      });
      return;
    }

    //Connecting DataBase
    const db = await connectDB();

    const maxDistance = 10000; // Maximum distance in meters (10km)

    //Query
    const data = await db
      .collection(QUADKAST)
      .aggregate([
        {
          $geoNear: {
            near: {
              type: "Point",
              coordinates: [Number(latitude), Number(longitude)],
            },
            distanceField: "dist.calculated",
            maxDistance,
            spherical: true,
          },
        },
      ])
      .toArray();

    res.status(200).json({ status: 200, data });
    return;
  } catch (err) {
    console.log("Error In latiAndlong", err);
    res.status(400).json({ status: 400, data: err });
  }
};
