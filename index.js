const express = require('express');
const app = express();

app.use(express.json());

app.use(express.urlencoded({
    extended: true
}));

let productData = [];

app.post("/api/add_product", (req, res) => {
    console.log("Result", req.body);
    
    // Tạo đối tượng sản phẩm mới dựa trên dữ liệu từ req.body
    const pdata = {
        "id": productData.length + 1, // ID tự động tăng dựa trên độ dài của mảng productData
        "pname": req.body.pname,
        "pprice": req.body.pprice,
        "pdesc": req.body.pdesc
    };

    // Thêm sản phẩm mới vào mảng productData
    productData.push(pdata);
    console.log("final", pdata);

    // Trả về phản hồi với thông tin sản phẩm vừa thêm
    res.status(200).send({
        "status_code": 200,
        "message": "Product added successfully",
        "product": pdata
    });
});


app.get("/api/get_product", (req, res) => {
    if (productData.length > 0) {
        res.status(200).send({
            'status_code': 200,
            'products': productData
        });
    } else {
        res.status(200).send({
            'status_code': 200,
            'products': []
        });
    }
});


app.put("/api/update/:id", (req, res)=>{
    let  id =  req.params.id;
    let productToUpdate  = productData.find((product)=> product.id ==  id)
    let index = productData.indexOf(productToUpdate);


    productData[index]  = req.body ;

res.status(200).send({
    'status' : "success",
    'message': 'product updated'
})
    
;});


var  port = 2000
app.listen(port, () => {
    console.log("Connected to " + port );
});
