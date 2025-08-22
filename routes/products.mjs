import express from "express";
import Product from "../models/products.mjs"
import upload from "../middleware/uploadingimage.mjs";

const router = express.Router();

// Get all products
router.get("/", async (req, res) => {
  try {
    const allProducts = await Product.find();
    res.send({ message: "Data fetched successfully", Data: allProducts });
  } catch (e) {
    res.status(500).send({ message: e.message });
  }
});

// Get single product
router.get("/:id", async (req, res) => {
  try {
    const singleProduct = await Product.findById(req.params.id);
    if (!singleProduct) return res.status(404).send({ message: "Product not found" });
    res.send({ message: "Product fetched successfully", Data: singleProduct });
  } catch (e) {
    res.status(500).send({ message: e.message });
  }
});

// Create product
router.post("/post", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).send({ message: "Image is required" });
    }

    const adData = {
      ...req.body,
      image: req.file.path,
    };

    const product = new Product(adData);
    await product.save();

    res.send({ message: "Ad posted successfully", product });
  } catch (e) {
    res.status(500).send({ message: e.message });
  }
});

// Update product
router.put("/:id", async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedProduct) return res.status(404).send({ message: "Product not found" });
    res.send({ message: "Product updated successfully", Data: updatedProduct });
  } catch (e) {
    res.status(500).send({ message: e.message });
  }
});

// Delete product
router.delete("/:id", async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) return res.status(404).send({ message: "Product not found" });
    res.send({ message: "Product deleted successfully", Data: deletedProduct });
  } catch (e) {
    res.status(500).send({ message: e.message });
  }
});

export default router;
