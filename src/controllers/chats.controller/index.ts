const Chat = require("../../models/Chat.model");
const MessageController = require("../message.controller");
import { Request, Response } from "express";

exports.CreateChat = async (req: Request, res: Response) => {
  //
  const users = [req.body.user1, req.body.user2];
  const result = new Chat({
    users,
  });
  result
    .save()
    .then((data: any) => data)
    .catch((error: any) => {
      console.log(error);
    });

  const data = {
    id: result._id,
    users: result.users,
    messages: [] as Array<any>,
    createdAt: result.createdAt,
    updatedAt: result.updatedAt,
  };

  let messages: Array<any> = await MessageController.GetAllMessages({
    ...req,
    params: {
      chatId: result._id,
    },
  })
    .then((data: Object) => data)
    .catch((e: Object) => []);
  //console.log(messages);
  if (messages) {
    data.messages = messages;
  }
  //data.push(d);
  //console.log(d);
  return res.status(200).json({ data: data });
};

exports.GetChat = async (req: Request, res: Response) => {
  //const email = "rubandre14@gmail.com";
  const chats = await Chat.find();
  const specificValue = "d";

  const filteredObjects = chats.filter((obj: any) =>
    obj.users.includes(specificValue)
  );

  console.log(filteredObjects);
  const data: Array<any> = [];
  await Promise.all(
    filteredObjects.map(async (obj: any) => {
      const d = {
        id: obj._id,
        users: obj.users,
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
  return res.status(200).json({ data: data });

};
