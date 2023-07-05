import db from "../models/index";

// lay du lieu doi bong
let getAllOrders = (ordersId) =>{
    return new Promise( async(resolve, reject) =>{
        try{
            let orders = '';
            if(ordersId === 'ALL'){
                orders = await db.Orders.findAll()
            }
            if(ordersId && ordersId !== 'ALL'){
                orders = await db.Orders.findOne({
                    where: { id: ordersId },
                })
                
            }
            resolve(orders);
        }catch(e){
            reject(e);
        }
    })
}

// phan trang don dat hang
let getOrdersForPageService = (page, perPage) =>{
    return new Promise (async(resolve, reject)=>{
        const offset = (page - 1) * perPage;
        const limit = perPage;
        try{
            let orders = await db.Orders.findAll({
                limit,
                offset,
                order: [['createdAt', 'DESC']],
                
            })
            let total = await db.Orders.count();
            resolve({
                errCode: 0,
                orders,
                total,
                currentPage: parseInt(page),
                perPage: parseInt(perPage),
            })
        }catch(e){
            reject(e);
        }
    })
}

// them doi bong
let createNewOrders = (data) => {
    return new Promise (async(resolve, reject) => {
        try{            
            await db.Orders.create({
                customerName: data.customerName,
                customerAddress: data.customerAddress,
                customerPhone: data.customerPhone,
                productId: data.productId,
                size: data.size,
                color: data.color,
                description: data.description,
                totalAmount: data.totalAmount,
            });

            resolve({
                errCode: 0,
                message: 'oke'
            });
             

        }catch(e){  
            reject(e);
        }
    }) 
}

// xoa doi bong
let deleteOrders = (ordersId) =>{
    return new Promise (async (resolve, reject) =>{
        let orders = await db.Orders.findOne({
            where: {id: ordersId}
        })
        if(!orders){
            resolve({
                errCode: 2,
                errMessage: "Err"
            })
        }
        await db.Orders.destroy({
            where: { id: ordersId }
        })
        resolve({
            errCode: 0,
            errMessage: "oke"
        })
    })
}

// sua doi bong

let editOrders = (data) =>{
    return new Promise ( async (resolve, reject) =>{
        try{
            if(!data.id ){   
                resolve({
                    errCode: 2,
                    errMessage: 'Missing requied parameters!'
                })
            }
            let orders = await db.Orders.findOne({
                where: {id: data.id},
               // raw: false
            });
            if(orders){
                customerName = data.customerName,
                customerAddress = data.customerAddress,
                customerPhone = data.customerPhone,
                productId = data.productId,
                size = data.size,
                color = data.color,
                description = data.description,
               
                await orders.save();
        
                resolve({
                    errCode: 0,
                    message: 'Update the Tournament success',
                });

            }else{
                resolve({
                    errCode: 1,
                    errMessage: 'Tournament is not found',
                });
            }
        
        }catch(e){
            reject(e);
        }
    })
}
module.exports = {
    getAllOrders: getAllOrders,
    createNewOrders: createNewOrders,
    deleteOrders: deleteOrders,
    editOrders: editOrders,
    getOrdersForPageService: getOrdersForPageService,
}

