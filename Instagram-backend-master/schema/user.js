const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;



const UserSchema = new Schema({
  phone_number: Number,
  name: String,
  username: String,
  password: String,
  profile_image: String,
  following: [],
  followers: [],
});



const User = mongoose.model("User", UserSchema);

module.exports = User;
