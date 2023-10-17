const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
  {
    title: {
      type: String,
      require: true,
      trim: true,
      default: null,
    },
    category: {
      require: true,
      type: mongoose.Schema.Types.ObjectId,
    },
    price: {
      type: Number,
      default: 0,
    },
    image: {
      type: Array,
      default: [],
    },
    rating: {
      type: Number,
      default: 0,
    },
    color: {
      type: Array,
      default: [],
    },
    size: {
      type: Array,
      default: [],
    },
    description: {
      type: String,
      default: null,
    },
    slug: {
      type: String,
      require: true,
      unique: true
    }
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
