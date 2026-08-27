import { v2 as cloudinary } from "cloudinary";
import productModel from "../models/productModel.js";
import productVersionModel from "../models/productVersionModel.js";

// ============================================================
// PRODUCT VERSION
// ============================================================

const increaseProductVersion = async () => {
    let versionData = await productVersionModel.findOne();

    if (!versionData) {
        versionData = await productVersionModel.create({
            version: 1,
        });
    } else {
        versionData.version += 1;
        await versionData.save();
    }

    return versionData.version;
};

// ============================================================
// GET PRODUCT VERSION
// ============================================================

const getProductVersion = async (req, res) => {
    try {
        let versionData = await productVersionModel.findOne();

        // Create version document if it doesn't exist
        if (!versionData) {
            versionData = await productVersionModel.create({
                version: 1,
            });
        }

        res.json({
            success: true,
            version: versionData.version,
        });
    } catch (error) {
        console.log(error);

        res.json({
            success: false,
            message: error.message,
        });
    }
};

// ============================================================
// ADD PRODUCT
// ============================================================

const addProduct = async (req, res) => {
    try {
        const {
            name,
            description,
            price,
            category,
            subCategory,
            sizes,
            bestseller,
        } = req.body;

        const image1 =
            req.files.image1 &&
            req.files.image1[0];

        const image2 =
            req.files.image2 &&
            req.files.image2[0];

        const image3 =
            req.files.image3 &&
            req.files.image3[0];

        const image4 =
            req.files.image4 &&
            req.files.image4[0];

        const images = [
            image1,
            image2,
            image3,
            image4,
        ].filter(
            (item) => item !== undefined
        );

        const imagesUrl = await Promise.all(
            images.map(async (item) => {
                const result =
                    await cloudinary.uploader.upload(
                        item.path,
                        {
                            resource_type: "image",
                        }
                    );

                return result.secure_url;
            })
        );

        const productData = {
            name,
            description,
            category,
            price: Number(price),
            subCategory,
            bestseller:
                bestseller === "true"
                    ? true
                    : false,
            sizes: JSON.parse(sizes),
            image: imagesUrl,
            date: Date.now(),
        };

        console.log(productData);

        const product =
            new productModel(productData);

        await product.save();

        // IMPORTANT:
        // Tell the frontend that products changed
        await increaseProductVersion();

        res.json({
            success: true,
            message: "Product Added",
        });
    } catch (error) {
        console.log(error);

        res.json({
            success: false,
            message: error.message,
        });
    }
};

// ============================================================
// LIST PRODUCTS
// ============================================================

const listProducts = async (req, res) => {
    try {
        const products =
            await productModel.find({});

        res.json({
            success: true,
            products,
        });
    } catch (error) {
        console.log(error);

        res.json({
            success: false,
            message: error.message,
        });
    }
};

// ============================================================
// REMOVE PRODUCT
// ============================================================

const removeProduct = async (req, res) => {
    try {
        await productModel.findByIdAndDelete(
            req.body.id
        );

        // IMPORTANT:
        // Tell the frontend that products changed
        await increaseProductVersion();

        res.json({
            success: true,
            message: "Product Removed",
        });
    } catch (error) {
        console.log(error);

        res.json({
            success: false,
            message: error.message,
        });
    }
};

// ============================================================
// SINGLE PRODUCT
// ============================================================

const singleProduct = async (req, res) => {
    try {
        const { productId } = req.body;

        const product =
            await productModel.findById(
                productId
            );

        res.json({
            success: true,
            product,
        });
    } catch (error) {
        console.log(error);

        res.json({
            success: false,
            message: error.message,
        });
    }
};

// ============================================================
// EXPORT
// ============================================================

export {
    listProducts,
    addProduct,
    removeProduct,
    singleProduct,
    getProductVersion,
};