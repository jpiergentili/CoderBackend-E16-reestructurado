import mongoose from 'mongoose';
import mongoosePaginate from "mongoose-paginate-v2"

const cartSchema = mongoose.Schema({
  first_name: String,
  last_name: String,
  cartProducts: [
    { product: { type: mongoose.Schema.Types.ObjectId, ref: 'product' }, qty: Number },
  ],
});

cartSchema.pre('findOne', function () {
  this.populate('cartProducts.product');
});

cartSchema.plugin(mongoosePaginate)
const cartModel = mongoose.model('cart', cartSchema);

export default cartModel;
