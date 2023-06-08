import { QUADKAST } from "../collection.js";
import { connectDB } from "../mongodb.js";

export const getTotalPricebyRoomtype_Controller = async (req, res, next) => {
  try {
    const { room_type } = req.query;

    if (!room_type) {
      res.status(400).json({
        status: 400,
        data: "Room_type Must Be Given",
      });
      return;
    }

    //Connecting DataBase
    const db = await connectDB();

    //For Dynamically Assigning the Price of Room_Type
    const totalprice = `totalprice_of_${room_type}`;

    //Getting the TotalPrice of RoomType In All Documents
    const aggPipe = [
      {
        $match: { room_type },
      },
      {
        $group: {
          _id: "$product",
          [totalprice]: {
            $sum: "$price",
          },
        },
      },
      {
        $project: {
          _id: 0,
          [totalprice]: 1,
        },
      },
    ];

    //Query
    const [data] = await db.collection(QUADKAST).aggregate(aggPipe).toArray();

    if (!data) {
      res.status(400).json({ status: 400, data: "Invalid RoomType" });
      return;
    }

    res.status(200).json({ status: 200, data });
    return;
  } catch (err) {
    console.log("Error In Pricebyroomtype", err);
    res.status(400).json({ status: 400, data: err });
  }
};
