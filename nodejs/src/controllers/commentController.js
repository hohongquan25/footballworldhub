import commentService from "../services/commentService";
// lay thong tin clb
let handleAllComments = async (req, res) => {

    let id = req.query.id; //ALL, SINGER
    if(!id){
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Missing required parameters',
            comments: []
        })
    }
    let comments = await commentService.getAllComments(id);
    console.log(comments)
    return res.status(200).json({
        errCode: 0,
        errMessage: 'Oke',
        comments
    })
}

//phan trang quoc gia
let getCountriesForPage = async (req, res) => {
    let {page,perPage} = req.query;
    
    
    try{
        let countries = await countriesService.getCountriesForPageService(+page, +perPage);
        return res.status(200).json(countries)
    }catch(e){
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: "Error from server.."
        })
    }
}


// them binh luan
let handleCreateNewComments = async (req, res) => {
    let message = await commentService.createNewComments(req.body);
    return res.status(200).json(message); 
}

// xoa clb
let handleDeleteComments = async (req, res) =>{
    if (!req.body.id){
        return res.status(200).json({
            errCode: 1,
            errMessage: "Missing required parameters!"
        })
    }
    else{
        let message = await commentService.deleteComments(req.body.id);
        return res.status(200).json(message);
        }
}
// sua clb
let handleEditComments = async (req, res) =>{
    console.log(req.body.id);
    let data = req.body;
    let message = await commentService.editComments(data);
    return res.status(200).json(message);
    
}
module.exports = {
    handleAllComments: handleAllComments,
    handleCreateNewComments: handleCreateNewComments,
    handleDeleteComments: handleDeleteComments,
    handleEditComments: handleEditComments,
    getCountriesForPage: getCountriesForPage,
}

