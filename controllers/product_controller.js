const Product = require('../models/products_model');
const { getPostData } = require('../utils');

//@desc     Get All Products 
//@route    Get /api/products
async function getProducts(req, res) {
    try {
        const products = await Product.findAll();

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(products,null,2));
    } catch (error) {
        console.log(error);
    }
}

//@desc     Get Products by id 
//@route    Get /api/products/1
async function getProduct(req, res, id) {
    try {
        const product = await Product.findByID(id);
        if (!product) {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: "Product Not Found" }));
        } else {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(product));
        }
    } catch (error) {
        console.log(error);
    }
}

//@desc     Create a Product 
//@route    Post /api/products/1
async function createProduct(req, res, id) {
    try {

        const body = await getPostData(req);
        const { name, description, price } = JSON.parse(body);
        const product = {
            name,
            description,
            price
        };

        const newProduct = await Product.create(product);

        res.writeHead(404, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify(newProduct));




        /// I test in this and move to uliti
        // const product ={
        //     "name": "New Product",
        //     "description": "Bluetooth technology lets you connect it with compatible devices wirelessly High-quality AAC audio offers immersive listening experience Built-in microphone allows you to take calls while working",
        //     "price": 1200
        // }

        // let body = '';
        // req.on('data',(chunk) => {
        //     body += chunk.toString()
        // });
        // req.on('end',async() => {
        // const {name, description, price} = JSON.parse(body);
        // const product = {
        //     name,
        //     description,
        //     price
        // };

        // const newProduct = await Product.create(product);

        // res.writeHead(404,{'Content-Type':'application/json'});
        // return res.end(JSON.stringify(newProduct));    

        // });

    } catch (error) {
        console.log(error);
    }
}

//@desc     Update a Product 
//@route    PUT /api/products/:id
async function updateProduct(req, res, id) {
    try {
        const product = await Product.findByID(id)

        if (!product) {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: "Product Not Found" }));
        } else {
            const body = await getPostData(req);
            const { name, description, price } = JSON.parse(body);
            const productData = {
                name:name || product.name,
                description:description || product.description,
                price:price || product.price
            };

            const upProduct = await Product.update(id,productData);

            res.writeHead(200, { 'Content-Type': 'application/json' });
            return res.end(JSON.stringify(upProduct));
        }

    } catch (error) {
        console.log(error);
    }
}

//@desc     Delete a Product 
//@route    DeLETE /api/products/:id
async function removeProduct(req, res, id) {
    try {
        const product = await Product.findByID(id);
        if (!product) {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: "Product Not Found" }));
        } else {
            await Product.remove(id);
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({message : `Product ${id} have been remove from record`}));
        }
    } catch (error) {
        console.log(error);
    }
}

async function DummyDemo(req, res, id) {
    try {
        const products = await Product.findAll();

        res.writeHead(200, { 'Content-Type': 'application/json' });

        res.end(JSON.stringify(products,null,2));
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    removeProduct,
    DummyDemo
}
