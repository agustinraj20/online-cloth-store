import mongoose from "mongoose";

const productVersionSchema = new mongoose.Schema(
    {
        version: {
            type: Number,
            default: 1,
        },
    },
    {
        timestamps: true,
    }
);

const productVersionModel =
    mongoose.models.productVersion ||
    mongoose.model("productVersion", productVersionSchema);

export default productVersionModel;