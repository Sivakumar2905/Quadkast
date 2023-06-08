import { QUADKAST } from "../collection.js";
import { connectDB } from "../mongodb.js";

export const searchByName_Controller = async (req, res, next) => {
  try {
    const { name } = req.query;

    if (!name) {
      res.status(400).json({ status: 400, data: "Name Must Be Given" });
    }

    //Connecting DataBase
    const db = await connectDB();

    //Searching By Name(Case-Insensitive)
    const data = await db
      .collection(QUADKAST)
      .find(
        {
          name: {
            $regex: `${name}`,
            $options: "i",
          },
        },
        {
          projection: {
            _id: 0,
            name: 1,
          },
        }
      )
      .toArray();

    if (!data.length) {
      res.status(400).json({ status: 400, data: "No Data Found" });
      return;
    }

    res.status(200).json({ status: 200, data });
    return;
  } catch (err) {
    console.log("Error In searchbyname", err);
    res.status(400).json({ status: 400, data: err });
  }
};
