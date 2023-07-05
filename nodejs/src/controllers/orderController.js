import orderService from "../services/orderService";
// lay thong tin clb
let handleAllOrders = async (req, res) => {

    let id = req.query.id; //ALL, SINGER
    if(!id){
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Missing required parameters',
            orders: []
        })
    }
    let orders = await orderService.getAllOrders(id);
    console.log(orders)
    return res.status(200).json({
        errCode: 0,
        errMessage: 'Oke',
        orders
    })
}

//phan trang don dat hang
let getOrdersForPage = async (req, res) => {
    let {page,perPage} = req.query;
    try{
        let orders = await orderService.getOrdersForPageService(+page, +perPage);
        return res.status(200).json(orders)
    }catch(e){
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: "Error from server.."
        })
    }
}

// them don hang
let handleCreateNewOrders = async (req, res) => {
    let message = await orderService.createNewOrders(req.body);
    return res.status(200).json(message); 
}

// xoa don hang
let handleDeleteOrders = async (req, res) =>{
    if (!req.body.id){
        return res.status(200).json({
            errCode: 1,
            errMessage: "Missing required parameters!"
        })
    }
    else{
        let message = await orderService.deleteOrders(req.body.id);
        return res.status(200).json(message);
        }
}
// sua clb
let handleEditOrders = async (req, res) =>{
    console.log(req.body.id);
    let data = req.body;
    let message = await orderService.editOrders(data);
    return res.status(200).json(message);
    
}
module.exports = {
    handleAllOrders: handleAllOrders,
    handleCreateNewOrders: handleCreateNewOrders,
    handleDeleteOrders: handleDeleteOrders,
    handleEditOrders: handleEditOrders,
    getOrdersForPage: getOrdersForPage,
}

