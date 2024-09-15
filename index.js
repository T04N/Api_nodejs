const express = require('express');
const app = express();
const mongoose = require('mongoose')

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));


// 

const mongoURI = "mongodb+srv://minhtoanwork:toanmongodb@tev.hxal4.mongodb.net/?retryWrites=true&w=majority&appName=Tev"
// Kết nối đến MongoDB sử dụng Promises
mongoose.connect(mongoURI)
    .then(() => {
      console.log('Status: Connected to mongoose');
    })
    .catch((error) => {
      console.error('Connection error:', error);
    });



let productData = [];

// Route to add a new product
app.post("/api/add_product", (req, res) => {
    console.log("Received Data:", req.body);

    // Create a new product object from request body
    const pdata = {
        "id": productData.length + 1, // Auto-increment ID based on array length
        "pname": req.body.pname,
        "pprice": req.body.pprice,
        "pdesc": req.body.pdesc
    };

    // Add new product to the array
    productData.push(pdata);
    console.log("Final Product Data:", pdata);

    // Return response with the added product information
    res.status(200).send({
        "status_code": 200,
        "message": "Product added successfully",
        "product": pdata
    });
});

// Route to get all products
app.get("/api/get_product", (req, res) => {
    res.status(200).send({
        'status_code': 200,
        'products': productData.length > 0 ? productData : []
    });
});

// Route to update a product by ID
app.put("/api/update/:id", (req, res) => {
    let id = parseInt(req.params.id);
    let productToUpdate = productData.find((product) => product.id === id);

    if (!productToUpdate) {
        return res.status(404).send({
            'status': "fail",
            'message': 'Product not found'
        });
    }

    // Update only the fields provided in the request body
    productToUpdate.pname = req.body.pname || productToUpdate.pname;
    productToUpdate.pprice = req.body.pprice || productToUpdate.pprice;
    productToUpdate.pdesc = req.body.pdesc || productToUpdate.pdesc;

    res.status(200).send({
        'status': "success",
        'message': 'Product updated successfully',
        'product': productToUpdate
    });
});


app.post("/api/delete/:id", (req, res) => {
    let id = req.params.id * 1;
    let prodcutDelete = productData.find((p) => p.id == id)

    index = productData.indexOf(prodcutDelete);

    productData.splice(index, 1);

    res.status(204).send({
        'status': "success",
        'message': 'product Deleted',
    })

})

// Server setup
var port = 2000;
app.listen(port, () => {
    console.log("Server is running on http://localhost:" + port);
});
