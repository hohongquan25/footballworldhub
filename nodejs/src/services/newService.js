import db from "../models/index";


let getTopNew = (limit) => {
    return new Promise (async(resolve, reject)=>{
        try{
            let news = await db.News.findAll({
                limit: limit,
                order: [['createdAt', 'DESC']],
                
            })

            resolve({
                errCode: 0,
                data:news,
            })
        }catch(e){
            reject(e);
        }
    })

}

// lay tin tuc
let getAllNews = (newId) =>{
    return new Promise( async(resolve, reject) =>{
        try{
            let news = '';
            if(newId === 'ALL'){
                news = await db.News.findAll({
                    order: [['createdAt', 'DESC']],
                })
            }
            if(newId && newId !== 'ALL'){
                news = await db.News.findOne({
                    where: { id: newId },
                })
               
            }
            resolve(news);
        }catch(e){
            reject(e);
        }
    })
}

// phan trang tin tuc
let getNewsForPageService = (page, perPage) =>{
    return new Promise (async(resolve, reject)=>{
        const offset = (page - 1) * perPage;
        const limit = perPage;
        try{
            let news = await db.News.findAll({
                limit,
                offset,
                order: [['createdAt', 'DESC']],
                
            })
            let total = await db.News.count();
            resolve({
                errCode: 0,
                news,
                total,
                currentPage: parseInt(page),
                perPage: parseInt(perPage),
            })
        }catch(e){
            reject(e);
        }
    })
}
// them tin tuc
let createNewNews = (data) => {
    return new Promise (async(resolve, reject) => {
        try{            
            await db.News.create({
                newTitle: data.newTitle,
                newContent: data.newContent,
                userId: data.userId,
                imageNew: data.imageNew,
                tournamentsId: data.tournamentsId,
                playerId: data.playerId,
                clubId: data.clubId,


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

// xoa tin tuc
let deleteNews = (newsId) =>{
    return new Promise (async (resolve, reject) =>{
        let news = await db.News.findOne({
            where: {id: newsId}
        })
        if(!news){
            resolve({
                errCode: 2,
                errMessage: "Err"
            })
        }
        await db.News.destroy({
            where: { id: newsId }
        })
        resolve({
            errCode: 0,
            errMessage: "oke"
        })
    })
}

// sua tin tuc

let editNews = (data) =>{
    return new Promise ( async (resolve, reject) =>{
        try{
            if(!data.id ){   
                resolve({
                    errCode: 2,
                    errMessage: 'Missing requied parameters!'
                })
            }
            let news = await db.News.findOne({
                where: {id: data.id},
               // raw: false
            });
            if(news){
                
               news.newTitle = data.newTitle;
               news.newContent = data.newContent;
               if(data.imageNew){
                news.imageNew= data.imageNew;
                }
               //news.Author = data.Author;
               //news.publishDate = data.publishDate;
                news.tournamentsId = data.tournamentsId;
                news.playerId = data.playerId;
                news.clubId = data.clubId;
                await news.save();
        
                resolve({
                    errCode: 0,
                    message: 'Update the new success',
                });

            }else{
                resolve({
                    errCode: 1,
                    errMessage: 'new is not found',
                });
            }
        
        }catch(e){
            reject(e);
        }
    })
}

//viet tin
let getAllNewsWirte = () =>{
    return new Promise( async(resolve, reject) =>{
        try{
            let listnews = await db.News.findAll({
                attributes:{
                    exclude: ['imageNew']
                }
            })            
            resolve({
                errCode: 0,
                data: listnews,
            });
        }catch(e){
            reject(e);
        }
    })
}

// lưu nội dung tin tức đã viết
let SaveWirteNews = (inputData) =>{
    return new Promise (async (resolve, reject) =>{
        try{
            if(!inputData.newId || !inputData.contentHTML || !inputData.contentMarkdown || !inputData.action){
                resolve({
                    errCode: -1,
                    errMessage:'error'
                })
            }
            else{
                if(inputData.action === 'CREATE'){
                    await db.Markdown.create({
                        contentHTML: inputData.contentHTML,
                        contentMarkdown: inputData.contentMarkdown,
                        newId: inputData.newId,
                        playerId: inputData.playerId
                    })
                }
                else if(inputData.action === 'EDIT'){
                    let newsMarkdown = await db.Markdown.findOne({
                        where: { newId: inputData.newId},
                        raw: false
                    })
                    if(newsMarkdown){
                        newsMarkdown.contentHTML = inputData.contentHTML;
                        newsMarkdown.contentMarkdown = inputData.contentMarkdown;
                        await newsMarkdown.save();
                    }
                }
              
                resolve({
                    errCode: 0,
                    errMessage: 'save success'
                })
            }
        }
        catch{

        }
    })
}

// lấy tin tức và nội dung của tin trong bảng Markdown
let getContentNewsService = (inputId) =>{
    return new Promise ( async(resolve, reject)=>{
        try{
            if(!inputId){
                resolve({
                    errCode: 1,
                    errMessage: 'error'
                })
            }
            else{
                let data = await db.News.findOne({
                    where: {
                        id: inputId
                    },
                    include: [
                        { model: db.Markdown, attributes: ['contentHTML', 'contentMarkdown'] },
                        { model: db.Comment, attributes: ['nameAuthor', 'commentContent','createdAt'] },
      

                    ],
                    raw: false,
                    nest: true
                })

                if(data && data.imageNew){
                    data.imageNew = new Buffer.from(data.imageNew, 'base64').toString('binary');
                }

                if(!data) data = {};
                resolve({
                    errCode: 0,
                    data: data,
                })
            }
        }catch(e){  
            reject(e);
        }
    })
 }

 // lấy tất cả tin tức tổng hợp không theo giải đấu, câu lạc bộ hay cầu thủ
 
 let getAllNewsSyn = (newId) =>{
    return new Promise( async(resolve, reject) =>{
        try{
            let news = '';
            if(newId === 'ALL'){
                news = await db.News.findAll({
                    where: {
                        clubId: null,
                        tournamentsId: null,
                        playerId: null,
                      },
                })
            }
            if(newId && newId !== 'ALL'){
                news = await db.News.findOne({
                    where: { id: newId },
                })
               
            }
            resolve(news);
        }catch(e){
            reject(e);
        }
    })
}

module.exports = {
    getAllNewsSyn: getAllNewsSyn,
    getAllNewsWirte: getAllNewsWirte,
    getAllNews: getAllNews,
    createNewNews: createNewNews,
    deleteNews: deleteNews,
    editNews: editNews,
    getTopNew: getTopNew,
    SaveWirteNews: SaveWirteNews,
    getContentNewsService: getContentNewsService,
    getNewsForPageService: getNewsForPageService,
    
}
