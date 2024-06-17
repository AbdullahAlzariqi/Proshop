import asyncHandler from '../middleware/asyncHandler.js'
import Product from "../models/productModel.js";

//@desc Fetch All Products
//@route GET /api/products
//@access Public


const getProducts = asyncHandler(async (req, res) => {
    const products = await Product.find({});
    res.json(products);
})
const getProductById = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)

    if (product) {

        return res.json(product);
    } else {
        res.status(404)
        throw new Error('resource not found')
    }

})

//@desc Create A new Product
// @route POST /api/products
// @access Provate/Admin
const createProduct = asyncHandler(async (req, res) => {
    // const { name, image, brand, category, description,
    //     rating, numReviews, price, countInStock, reviews } = req.res;
    try {
        const newProduct = await Product.create({
            name: "Sample Product",
            image: "../images/smaple.jpg",
            brand: "Sample brand",
            category: "Sample category",
            description: "Sample description",
            user: req.user._id,
            rating: 0,
            numReviews: 0,
            price: 0,
            countInStock: 0,
        })

        res.status(201).json(newProduct);
    } catch (e) {
        res.status(400)
        throw new Error('Product Could not be added')
    }
});

//@desc Update a Product
// @route PUT /api/products/:id
// @access Private/Admin

const updateProduct = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { name, description, price, image, category, countInStock, brand } = req.body
    const product = await Product.findOne({ _id: id })

    if (product) {
        product.name = name;
        product.description = description;
        product.price = price;
        product.countInStock = countInStock;
        product.brand = brand;
        product.image = image;
        product.category = category;
        const updatedProduct = await product.save();
        res.json(updatedProduct)
    } else {
        res.status(404)
        throw new Error('Resource was not Found!')
    }
});


const deleteProduct = asyncHandler(async (req, res) => {
    const { id } = req.params;

    try {
        await Product.deleteOne({ _id: id });
        res.status(200).json({ message: 'Product was deleted' });
    } catch (error) {
        res.status(404)
        throw new Error('Resource was not Found!')
    }

});


export { getProductById, getProducts, createProduct, updateProduct, deleteProduct }