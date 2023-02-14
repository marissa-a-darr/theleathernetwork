const { Schema, model } = require("mongoose");
const validator = require("validator");
const UserSchema = new Schema({
  username: { type: String, required: true, unique: true, trim: true },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: "Please use a valid email",
      isAsync: false,
    },
    thoughts: 
  },
});
