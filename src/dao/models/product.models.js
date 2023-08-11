import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2"

const productSchema = mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    code: { type: String, unique: true, required: true },
    stock: { type: Number, required: true },
    thumbnails: { type: [String], default: [] },
    status: { type: Boolean, default: true }
})

mongoose.set('strictQuery', false)
productSchema.plugin(mongoosePaginate)
const productModel = mongoose.model('product', productSchema)

export default productModel