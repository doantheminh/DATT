import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
const { Schema } = mongoose;

const productSchema = new Schema({
    name: {
        type: String,
        require: true,
        unique: true,
    },
    price: {
        type: Number,
    },
    priceSale: {
        type: Number,
    },
    describe: {
        type: String,
    },
    images: {
        type: String,
    },

    status: {
        type: Boolean
    },

    favourite: {
        type: Boolean,
        default: false
    },
    categoryId: {
        type: mongoose.Types.ObjectId,
        ref: "Category",
    },
},
    { timestamps: true, versionKey: false });

productSchema.plugin(mongoosePaginate);

export default mongoose.model("Product", productSchema);