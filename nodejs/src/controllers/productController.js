import productService from "../services/productService";
// lay thong tin clb
let handleAllProducts = async (req, res) => {

    let id = req.query.id; //ALL, SINGER
    if(!id){
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Missing required parameters',
            products: []
        })
    }
    let products = await productService.getAllProducts(id);
    console.log(products)
    return res.status(200).json({
        errCode: 0,
        errMessage: 'Oke',
        products
    })
}

//phan trang san pham
let getProductsForPage = async (req, res) => {
    let {page,perPage} = req.query;
    try{
        let products = await productService.getProductsForPageService(+page, +perPage);
        return res.status(200).json(products)
    }catch(e){
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: "Error from server.."
        })
    }
}

// them clb
let handleCreateNewProducts = async (req, res) => {
    let message = await productService.createNewProducts(req.body);
    return res.status(200).json(message); 
}

// xoa clb
let handleDeleteProducts = async (req, res) =>{
    if (!req.body.id){
        return res.status(200).json({
            errCode: 1,
            errMessage: "Missing required parameters!"
        })
    }
    else{
        let message = await productService.deleteProducts(req.body.id);
        return res.status(200).json(message);
        }
}
// sua thong tin sản phẩm
let handleEditProducts = async (req, res) =>{
    console.log(req.body.id);
    let data = req.body;
    let message = await productService.editProducts(data);
    return res.status(200).json(message);
    
}

module.exports = {
    handleAllProducts: handleAllProducts,
    handleCreateNewProducts: handleCreateNewProducts,
    handleDeleteProducts: handleDeleteProducts,
    handleEditProducts: handleEditProducts,
    getProductsForPage: getProductsForPage,
}

