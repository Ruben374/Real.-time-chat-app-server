import mongoose from "mongoose";
const messageSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      require: true,
    },
    body: {
      type: String,
      require: true,
    },
    author: {
      type: String,
      require: true,
    },

    receiver: {
      type: String,
      require: true,
    },
    chatId: {
      type: String,
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

const message = mongoose.model("message", messageSchema);
module.exports = message;
