const mongoose = require("mongoose");

const tokenSchema = mongoose.Schema(
  {
    token: {
      type: String,
      require: true,
    },
    user: {
        type: mongoose.SchemaTypes.ObjectId,
        require: true,
    },
    expires: {
        type: Date,
        required: true,
      },
  },
  {
    timestamps: true,
  }
);

const Token = mongoose.model("Token", tokenSchema);

module.exports = Token;
