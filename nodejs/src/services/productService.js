import db from "../models/index";

// lấy danh sách sản phẩm
let getAllProducts = (productsId) =>{
    return new Promise( async(resolve, reject) =>{
        try{
            let products = '';
            if(productsId === 'ALL'){
                products = await db.Products.findAll()
            }
            if(productsId && productsId !== 'ALL'){
                products = await db.Products.findOne({
                    where: { id: productsId },
                })
               
            }
            resolve(products);
        }catch(e){
            reject(e);
        }
    })
}

// phan trang san pham
let getProductsForPageService = (page, perPage) =>{
    return new Promise (async(resolve, reject)=>{
        const offset = (page - 1) * perPage;
        const limit = perPage;
        try{
            let products = await db.Products.findAll({
                limit,
                offset,
                order: [['createdAt', 'DESC']],
                
            })
            resolve({
                errCode: 0,
                products,
                currentPage: parseInt(page),
                perPage: parseInt(perPage),
            })
        }catch(e){
            reject(e);
        }
    })
}

// thêm sản phẩm
let createNewProducts = (data) => {
    return new Promise (async(resolve, reject) => {
        try{            
            await db.Products.create({
                productName: data.productName,
                productImage: data.productImage,
                price: data.price,
                description: data.description,
                
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

//Xóa sản phẩm
let deleteProducts = (productsId) =>{
    return new Promise (async (resolve, reject) =>{
        let products = await db.Products.findOne({
            where: {id: productsId}
        })
        if(!products){
            resolve({
                errCode: 2,
                errMessage: "Err"
            })
        }
        await db.Products.destroy({
            where: { id: productsId }
        })
        resolve({
            errCode: 0,
            errMessage: "oke"
        })
    })
}

//cập nhật thông tin sản phẩm
let editProducts = (data) =>{
    return new Promise ( async (resolve, reject) =>{
        try{
            if(!data.id ){   
                resolve({
                    errCode: 2,
                    errMessage: 'Missing requied parameters!'
                })
            }
            let products = await db.Products.findOne({
                where: {id: data.id},
               // raw: false
            });
            if(products){
                
                products.productName = data.productName;
                if(data.productImage){
                    products.productImage = data.productImage;
                }
                products.price = data.price;
                products.description = data.description;
                await products.save();
        
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
    getAllProducts: getAllProducts,
    createNewProducts: createNewProducts,
    deleteProducts: deleteProducts,
    editProducts: editProducts,
    getProductsForPageService: getProductsForPageService,
}

