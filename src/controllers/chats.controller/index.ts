const Chat = require("../../models/Chat.model");
const MessageController = require("../message.controller");
import { Request, Response } from "express";
const Users = require("../../models/Chat.model");

exports.CreateChat = async (req: Request, res: Response) => {
  //
  let ms: Array<any> = [];
  const users = [req.body.user1, req.body.user2];
  const result = new Chat({
    users,
  });
  result
    .save()
    .then(async (data: any) => {
      let chatMessages: Array<any> = await MessageController.GetAllMessages({
        ...req,
        params: {
          chatId: data._id,
        },
      })
        .then((data: Object) => data)
        .catch((e: Error) => {
          return res.status(500).json({ error: e.message });
        });
      if (chatMessages) {
        ms.push(chatMessages);
      }
    })
    .catch((error: any) => {
      console.log(error);
    });
  const data = {
    id: result._id,
    users: result.users,
    messages: ms,
    createdAt: result.createdAt,
    updatedAt: result.updatedAt,
  };

  //data.push(d);
  //console.log(d);
  return res.status(200).json({ data: data });
};

exports.GetChat = async (req: Request, res: Response) => {
  const chats = await Chat.find();
  let user = "";
  const filteredObjects = chats.filter((obj: any) =>
    obj.users.includes(res.locals.id)
  );
  const data: Array<any> = [];
  await Promise.all(
    filteredObjects.map(async (obj: any) => {
      if (obj.users[0] === res.locals.id) user = obj.users[1];
      else user = obj.users[0];
      const w = await Users.findOne({ _id: user })
        .then((data: any) => data)
        .catch((error: Error) => {
          return res.status(200).json({ message: error.message });
        });
      const d = {
        id: obj._id,
        with: {
          name: w.name,
          _id: w._id,
        },
        messages: [] as Array<any>,
        createdAt: obj.createdAt,
        updatedAt: obj.updatedAt,
      };
      let messages: Array<any> = await MessageController.GetAllMessages({
        ...req,
        params: {
          chatId: obj._id,
        },
      })
        .then((data: Object) => data)
        .catch((e: Object) => []);
      if (messages) {
        d.messages = messages;
      }
      data.push(d);
    })
  );
  return res.status(200).json(data);
};
