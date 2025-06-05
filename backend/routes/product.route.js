import express from "express";
import { createProduct, deleteProduct, getProduct, updateProduct } from "../controllers/product.controller.js";

import mongoose from "mongoose";
import Product from "../models/product.model.js";

const router = express.Router()

router.post("/", createProduct);

router.delete("/:id", deleteProduct);

router.get("/", getProduct);

router.put("/:id", updateProduct);

export default router;