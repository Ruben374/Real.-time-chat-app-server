const Users = require("../../models/Users.model");
import { Request, Response } from "express";
exports.GetUserData = async (req: Request, res: Response) => {
  const user = await Users.findOne({ _id: res.locals.id })
    .then((data: any) => {
      if (!data) {
        return res.status(404).json({ message: "User not found" });
      }
      return res.status(200).json(data);
    })
    .catch((error: Error) => {
      return res.status(500).json({ message: error.message });
    });
};

exports.GetAllUsers = async (req: Request, res: Response) => {
  await Users.find()
    .then((data: any) => 
      {
        const filteredData = data.filter((item: any) => item._id != res.locals.id);
  
        return res.status(200).json(filteredData);
      }
    )
    .catch((error: Error) => {
      return res.status(500).json({ message: error.message });
    });
};
