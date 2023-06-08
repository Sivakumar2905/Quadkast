import { QUADKAST } from "../collection.js";
import { connectDB } from "../mongodb.js";

export const getAmenitiesProperties_Controller = async (req, res, next) => {
  try {
    const { amenities } = req.query;

    
    /**
     * Splitting Amenities Suppose One More Data From Request
     * Ex:- [Air Conditioner,Wifi]
     */

    const splitedData = amenities.split(",");

    //Connecting DataBase
    const db = await connectDB();

    //Query
    const data = await db
      .collection(QUADKAST)
      .find(
        {
          amenities: {
            $in: splitedData,
          },
        },
        {
          projection: {
            _id: 0,
            amenities: 1,
          },
        }
      )
      .toArray();

    if (!data.length) {
      res.status(400).json({ status: 400, data: "No Data Found" });
      return;
    }

    //Checking TotalCount
    const totalCount = await db.collection(QUADKAST).countDocuments({
      amenities: {
        $in: splitedData,
      },
    });
    console.log("totalCount", totalCount);

    res.status(200).json({ status: 200, data });
    return;
  } catch (err) {
    console.log("Error In GetProperty", err);
    res.status(400).json({status:400,data:err})
  }
};
