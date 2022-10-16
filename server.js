const http = require('http');
const { getProducts ,getProduct,createProduct,updateProduct,removeProduct,DummyDemo } = require('./controllers/product_controller');

const server = http.createServer((req,res)=>{
    // res.statusCode = 200;
    // res.setHeader('Content-Type','text/html');
    // res.write('<h1>HEap fkjewpg</h1>');
    // res.end;

    // Set Route 
    if(req.url === '/api/products' && req.method === 'GET'){
        
        getProducts(req,res);
    
    }else if(req.url.match(/\/api\/products\/([0-9]+)/) && req.method === 'GET'){

        const id = req.url.split('/')[3] // api/products/2
        getProduct(req,res,id);

    }else if(req.url === '/api/products' && req.method === 'POST'){
        
        createProduct(req,res);

    }else if(req.url.match(/\/api\/products\/([0-9]+)/) && req.method === 'PUT'){ 
        // @disc    This route is for submit fourm received and process to excuate my program 
        // @commit  Khant Si Thu Phyo
        const id = req.url.split('/')[3] // api/products/2
        updateProduct(req,res,id);
    
    }else if(req.url.match(/\/api\/products\/([0-9]+)/) && req.method === 'DELETE'){ 
        // @disc    This route is for submit delete btn received and process to excuate my program to delete recored 
        // @commit  Khant Si Thu Phyo
        const id = req.url.split('/')[3] // api/products/2
        removeProduct(req,res,id);
    
    }else if (req.url === '/test' && req.method === 'GET'){
        DummyDemo(req,res);
    }else {
    
        res.writeHead(404,{'Content-Type':'application/json'});
        res.end(JSON.stringify ({message: 'Route Not Found'}));
    
    }
});

// /api/products/{id}
// Router 


const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port : ${PORT}`));