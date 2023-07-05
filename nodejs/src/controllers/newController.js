import newService from "../services/newService";

let handleTopNews = async (req, res) => {
    let limit = req.query.limit;
    if(!limit) limit = 2;
    try{
        let topnews = await newService.getTopNew(+limit);
        return res.status(200).json(topnews)
    }catch(e){
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: "Error from server.."
        })
    }
}

// lay tin tuc
let handleAllNews = async (req, res) => {

    let id = req.query.id; //ALL, SINGER
    if(!id){
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Missing required parameters',
            news: []
        })
    }
    let news = await newService.getAllNews(id);
    console.log(news)
    return res.status(200).json({
        errCode: 0,
        errMessage: 'Oke',
        news
    })
}
//phan trang tin tuc
let getNewsForPage = async (req, res) => {
    let {page,perPage} = req.query;
    
    
    try{
        let news = await newService.getNewsForPageService(+page, +perPage);
        return res.status(200).json(news)
    }catch(e){
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: "Error from server.."
        })
    }
}

// them tin tuc
let handleCreateNewNews = async (req, res) => {
    let message = await newService.createNewNews(req.body);
    return res.status(200).json(message); 
}

// xoa tin tuc
let handleDeleteNews = async (req, res) =>{
    if (!req.body.id){
        return res.status(200).json({
            errCode: 1,
            errMessage: "Missing required parameters!"
        })
    }
    else{
        let message = await newService.deleteNews(req.body.id);
        return res.status(200).json(message);
        }
}
// sua tin tuc
let handleEditNews = async (req, res) =>{
    console.log(req.body.id);
    let data = req.body;
    let message = await newService.editNews(data);
    return res.status(200).json(message);
    
}

// viet tin
let handleAllNewsWirte = async (req, res) => {

   try{
    let listnews = await newService.getAllNewsWirte();
    return res.status(200).json(listnews)
   }
   catch(e){
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error',
        })
   }
    
}

// viết nội dung chính của tin
let handleCreateWirteNews = async (req, res) => {
    try{
        let response = await newService.SaveWirteNews(req.body);
        return res.status(200).json(response)
       }
       catch(e){
            console.log(e)
            return res.status(200).json({
                errCode: -1,
                errMessage: 'Error',
            })
       }
        
}

//lay noi dung chinh cua tin
let getContentNews = async (req, res) =>{
    try{
        let content = await newService.getContentNewsService(req.query.id);
        return res.status(200).json(content)
    }catch(e){
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'error'
        })
    }
}


// lấy tin tức tổng hợp không theo giải đấu, câu lạc bộ hay cầu thủ
let handleAllNewsSyn = async (req, res) => {

    let id = req.query.id; //ALL, SINGER
    if(!id){
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Missing required parameters',
            news: []
        })
    }
    let news = await newService.getAllNewsSyn(id);
    console.log(news)
    return res.status(200).json({
        errCode: 0,
        errMessage: 'Oke',
        news
    })
}




module.exports = {
    handleAllNewsSyn: handleAllNewsSyn,
    handleAllNewsWirte: handleAllNewsWirte,
    handleAllNews: handleAllNews,
    handleCreateNewNews: handleCreateNewNews,
    handleDeleteNews: handleDeleteNews,
    handleEditNews: handleEditNews,
    handleTopNews: handleTopNews,
    handleCreateWirteNews: handleCreateWirteNews,
    getContentNews: getContentNews,
    getNewsForPage: getNewsForPage,
 
}