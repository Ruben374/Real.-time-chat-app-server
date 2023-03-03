const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
    },
    avatar: {
      type: String,
      default: "",
      require: true,
    },
    socket:{
      type:String,
      default:"",
      require:true
    }
  },
  {
    timestamps: true,
  }
);

const user = mongoose.model("user", userSchema);
module.exports = user;
