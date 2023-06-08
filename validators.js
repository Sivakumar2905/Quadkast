import Joi from "joi";

export const schemaValidator = (schema) => (req, res, next) => {
  let reqdata = req.query || req.body;

  if (!schema) {
    res
      .status(400)
      .json({ status: 400, data: "validate schema not found in root" });
  }

  const { error, value } = schema.validate(reqdata, {
    abortEarly: false,
  });

  console.log("errrrrorrrrr", error);
  if (error) {
    console.log("error Found in Schema Validations");
    const errorMessage = error.details.map((err) => err.message);
    console.log("errorMessage", errorMessage);
    res.status(400).json({ status: 400, data: errorMessage });
    return;
  }
  reqdata = value;
  next();
};

export const amenitiesJoi = Joi.object({
  amenities: Joi.string().required().messages({
    "any.required": "Amenities is Required",
  }),
}).unknown(false);

export const roomtypeJoi = Joi.object({
  room_type: Joi.string().required().messages({
    "any.required": "RoomType is Required",
  }),
}).unknown(false);

export const latitudeAndLongitudeJoi = Joi.object({
  latitude: Joi.number().required().messages({
    "any.required": "Latitude is Required",
  }),
  longitude: Joi.number().required().messages({
    "any.required": "Longitude is Required",
  }),
}).unknown(false);

export const searchByNameJoi = Joi.object({
  name: Joi.string().required().messages({
    "any.required": "Name is Required",
  }),
}).unknown(false);
