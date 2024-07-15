const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// insert one product
const createProduct = async (req, res) => {
    const { product_id, name, description, price, category, image_url } = req.body;
    try {
        const product = await prisma.products.create({
            data: {
                product_id,
                name,
                description,
                price,
                category,
                image_url
            }
        });
        res.status(200).json(product);
    } catch (err) {
        res.status(500).json(err);as
    }
};

// update one product
const updateProduct = async (req, res) => {
    const { id, name, description, price, category, image_url } = req.body;
    try {
        const product = await prisma.products.update({
            data: {
                name,
                description,
                price,
                category,
                image_url
            },
            where: { product_id: Number(id) }
        });
        res.status(200).json(product);
    } catch (err) {
        res.status(500).json(err);
    }
};

// delete product by product_id
const deleteProduct = async (req, res) => {
    const id = req.params.id;
    try {
        const product = await prisma.products.delete({
            where: {
                product_id: Number(id),
            },
        });
        res.status(200).json(product);
    } catch (err) {
        res.status(500).json(err);
    }
};

// get all products
const getProducts = async (req, res) => {
    const products = await prisma.products.findMany();
    res.json(products);
};

// get only one product by product_id
const getProduct = async (req, res) => {
    const id = req.params.id;
    try {
        const product = await prisma.products.findUnique({
            where: { product_id: Number(id) },
        });
        if (!product) {
            res.status(404).json({ 'message': 'Product not found!' });
        } else {
            res.status(200).json(product);
        }
    } catch (err) {
        res.status(500).json(err);
    }
};

// search any product by name or category
const getProductsByTerm = async (req, res) => {
    const searchString = req.params.term;
    try {
        const products = await prisma.products.findMany({
            where: {
                OR: [
                    {
                        name: {
                            contains: searchString
                        }
                    },
                    {
                        category: {
                            contains: searchString
                        }
                    }
                ]
            },
        });
        if (!products || products.length == 0) {
            res.status(404).json({ 'message': 'Product not found!' });
        } else {
            res.status(200).json(products);
        }
    } catch (err) {
        res.status(500).json(err);
    }
};

module.exports = {
    createProduct, getProduct, getProducts,
    updateProduct, deleteProduct, getProductsByTerm
};
