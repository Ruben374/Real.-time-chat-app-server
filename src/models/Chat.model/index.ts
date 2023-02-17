import mongoose from "mongoose";
const chatSchema = new mongoose.Schema(
  {
    users: Array,
  },
  {
    timestamps: true,
  }
);

const chat = mongoose.model("chat", chatSchema);
module.exports= chat
