const Message = require("../../models/Messages.model");
import { Request, Response } from "express";

exports.GetAllMessages = async (req: Request, res: Response) => {
  const messages = await Message.find({ chatId: req.params.chatId })
    .then((data: Object) => data)
    .catch((e: object) => e);
  if (messages)
    return !!res
      ? res.status(200).json({ error: false, status: 200, data: messages })
      : messages;
  else
    return !!res
      ? res.status(500).json({
          error: true,
          status: 500,
          message: "Falha",
        })
      : false;
};
