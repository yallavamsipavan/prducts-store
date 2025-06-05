import Product from "../models/product.model.js";
import mongoose from "mongoose";

export const createProduct = async (req, res) => {
    const product = req.body;
    if(!product.name || !product.price || !product.image) {
        return res.status(400).json({
            success : false,
            message : "Please provide all feilds"
        });
    }
    const newProduct = new Product(product);
    try {
        await newProduct.save();
        res.status(201).json({
            success : true,
            data : newProduct
        });
    } catch (error) {
        console.error("Error in Create Product : ", error.message);
        res.status(500).json({
            success : false,
            message : "Server Error"
        });
    }
};

export const getProduct = async (req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json({
            success : true,
            data : products
        });
    } catch (error) {
        console.log(`Error in fetching Products : ${error.message}`);
        res.status(500).json({
            success : false,
            message : "Server Error"
        });
    }
};

export const updateProduct = async (req, res) => {
    const {id} = req.params;
    const product = req.body;
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({
            success : false,
            message : "Enter valied Product ID"
        });
    }
    try {
        const existingProduct = await Product.findById(id);
        if (!existingProduct) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }
        const updatedProduct = await Product.findByIdAndUpdate(id, product, {new : true});
        res.status(200).json({
            success : true,
            data : updatedProduct
        });
    } catch (error) {
        console.log(`Error in updating Product : ${error.message}`);
        res.status(500).json({
            success : false,
            message : "Updaing failed"
        });
    }
};

export const deleteProduct = async (req, res) => {
    const {id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({
            success : false,
            message : "Enter valied Product ID"
        });
    }
    try {
        const existingProduct = await Product.findById(id);
        if (!existingProduct) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }
        await Product.findByIdAndDelete(id);
        res.status(200).json({
            success : true,
            message : "Product deleted"
        });
    } catch (error) {
        console.error("Error in deleting Product : ", error.message);
        res.status(500).json({
            success : false,
            message :  "Server Error"
        })
    }
};