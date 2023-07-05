import db from "../models/index";

// lay du lieu doi bong
let getAllComments = (commentsId) =>{
    return new Promise( async(resolve, reject) =>{
        try{
            let comments = '';
            if(commentsId === 'ALL'){
                comments = await db.Comment.findAll()
            }
            if(commentsId && commentsId !== 'ALL'){
                comments = await db.Comment.findOne({
                    where: { id: commentsId },
                })           
            }
            resolve(comments);
        }catch(e){
            reject(e);
        }
    })
}

// phan trang quoc gia
let getCountriesForPageService = (page, perPage) =>{
    return new Promise (async(resolve, reject)=>{
        const offset = (page - 1) * perPage;
        const limit = perPage;
        try{
            let countries = await db.Countries.findAll({
                limit,
                offset,
                order: [['createdAt', 'DESC']],
                
            })
            let total = await db.Countries.count();
            resolve({
                errCode: 0,
                countries,
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
let createNewComments = (data) => {
    return new Promise (async(resolve, reject) => {
        try{            
            await db.Comment.create({
                newId: data.newId,
                nameAuthor: data.nameAuthor,
                commentContent: data.commentContent,           
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
let deleteComments = (commentsId) =>{
    return new Promise (async (resolve, reject) =>{
        let comments = await db.Comment.findOne({
            where: {id: commentsId}
        })
        if(!comments){
            resolve({
                errCode: 2,
                errMessage: "Err"
            })
        }
        await db.Comment.destroy({
            where: { id: commentsId }
        })
        resolve({
            errCode: 0,
            errMessage: "oke"
        })
    })
}

// sua doi bong

let editComments = (data) =>{
    return new Promise ( async (resolve, reject) =>{
        try{
            if(!data.id ){   
                resolve({
                    errCode: 2,
                    errMessage: 'Missing requied parameters!'
                })
            }
            let comments = await db.Comment.findOne({
                where: {id: data.id},
               // raw: false
            });
            if(comments){
                
                comments.nameAuthor = data.nameAuthor;
                comments.commentContent = data.commentContent;
                
                await countries.save();
        
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
    getAllComments: getAllComments,
    createNewComments: createNewComments,
    deleteComments: deleteComments,
    editComments: editComments,
    getCountriesForPageService: getCountriesForPageService,
}

