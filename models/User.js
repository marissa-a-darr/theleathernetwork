const { Schema, model } = require('mongoose');
const validator = require('validator');
const userSchema = new Schema(
  {
    username: { type: String, required: true, unique: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: validator.isEmail,
        message: 'Please use a valid email',
        isAsync: false,
      },
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Thought',
      },
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);


userSchema.virtual("friendCount").get(function () {
  return this.friends.length;
});

const User = model("User", userSchema);

module.exports = User;
