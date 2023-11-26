const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
      trim: true,
      default: null,
    },
    category: {
      require: true,
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category"
    },
    brand: {
      require: true,
      type: mongoose.Schema.Types.ObjectId,
      ref: "Brand"
    },
    price: {
      type: Number,
      default: 0,
    },
    image: {
      type: Array,
      default: [{
        url: String,
        publicId: String
      }],
    },
    rating: {
      type: Number,
      default: 0,
    },
    quantity: {
      type: Number,
      default: 0
  },
  sold: {
      type: Number,
      default: 0
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
    ratings: [
      {
          star: { type: Number },
          postedBy: { type: mongoose.Types.ObjectId, ref: 'User' },
          comment: { type: String }
      }
  ],
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
