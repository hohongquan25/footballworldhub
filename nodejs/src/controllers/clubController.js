import clubService from "../services/clubService";
// lay thong tin clb
let handleAllClubs = async (req, res) => {

    let id = req.query.id; //ALL, SINGER
    if(!id){
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Missing required parameters',
            clubs: []
        })
    }
    let clubs = await clubService.getAllClubs(id);
    console.log(clubs)
    return res.status(200).json({
        errCode: 0,
        errMessage: 'Oke',
        clubs
    })
}

//phan trang cau lac bo
let getClubForPage = async (req, res) => {
    let {page,perPage} = req.query;
    
    
    try{
        let clubs = await clubService.getClubForPageService(+page, +perPage);
        return res.status(200).json(clubs)
    }catch(e){
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: "Error from server.."
        })
    }
}

// them clb
let handleCreateNewClubs = async (req, res) => {
    let message = await clubService.createNewClubs(req.body);
    return res.status(200).json(message); 
}

// xoa clb
let handleDeleteClubs = async (req, res) =>{
    if (!req.body.id){
        return res.status(200).json({
            errCode: 1,
            errMessage: "Missing required parameters!"
        })
    }
    else{
        let message = await clubService.deleteClubs(req.body.id);
        return res.status(200).json(message);
        }
}
// sua clb
let handleEditClubs = async (req, res) =>{
    console.log(req.body.id);
    let data = req.body;
    let message = await clubService.editClubs(data);
    return res.status(200).json(message);
    
}

// lấy các tin tức liên quan đến câu lạc bộ
let getNewsClubs = async (req, res) =>{
    try{
        let content = await clubService.getNewsClubsService(req.query.id);
        return res.status(200).json(content)
    }catch(e){
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'error'
        })
    }
}

// lấy chi tiết tất cả các clb
let handleDetailAllClubs = async (req, res) => {

    let id = req.query.id; //ALL, SINGER
    if(!id){
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Missing required parameters',
            clubs: []
        })
    }
    let clubs = await clubService.getDetailAllClubs(id);
    console.log('check:',clubs)
    return res.status(200).json({
        errCode: 0,
        errMessage: 'Oke',
        clubs
    })
}

module.exports = {
    handleDetailAllClubs: handleDetailAllClubs,
    getNewsClubs: getNewsClubs,
    handleAllClubs: handleAllClubs,
    handleCreateNewClubs: handleCreateNewClubs,
    handleDeleteClubs: handleDeleteClubs,
    handleEditClubs: handleEditClubs,
    getClubForPage: getClubForPage,
    
}

