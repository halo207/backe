const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    default: 0,
  },
  oldPrice: {
    type: Number,
  },
  category: {
    type: String,
    required: true, // VD: Nam, Nữ, Trẻ em, Đôi
  },
  images: [
    {
      type: String, // Link ảnh
      required: true,
    }
  ],
  description: {
    type: String,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
    default: 0,
  },
}, {
  timestamps: true,
});

const Product = mongoose.model('Product', productSchema);
module.exports = Product;
