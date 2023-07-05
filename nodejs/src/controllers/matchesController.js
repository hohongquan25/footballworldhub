import matchesService from "../services/matchesService";
// lay thong tin tran dau
let handleAllMatches = async (req, res) => {

    let id = req.query.id; //ALL, SINGER
    if(!id){
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Missing required parameters',
            matches: []
        })
    }
    let matches = await matchesService.getAllMatches(id);
    console.log(matches)
    return res.status(200).json({
        errCode: 0,
        errMessage: 'Oke',
        matches
    })
}

//phan trang tran dau
let getMatchesForPage = async (req, res) => {
    let {page,perPage} = req.query;
    
    
    try{
        let matches = await matchesService.getMatchesForPageService(+page, +perPage);
        return res.status(200).json(matches)
    }catch(e){
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: "Error from server.."
        })
    }
}


// them clb
let handleCreateNewMatches = async (req, res) => {
    let message = await matchesService.createNewMatches(req.body);
    return res.status(200).json(message); 
}

// xoa clb
let handleDeleteMatches = async (req, res) =>{
    if (!req.body.id){
        return res.status(200).json({
            errCode: 1,
            errMessage: "Missing required parameters!"
        })
    }
    else{
        let message = await matchesService.deleteMatches(req.body.id);
        return res.status(200).json(message);
        }
}
// sua clb
let handleEditMatches = async (req, res) =>{
    console.log(req.body.id);
    let data = req.body;
    let message = await matchesService.editMatches(data);
    return res.status(200).json(message);
    
}

// lay lịch thi đấu: những trận đấu đang diễn ra và sắp diễn ra
let handleAllMatchesSchedule = async (req, res) => {

    let id = req.query.id; //ALL, SINGER
    if(!id){
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Missing required parameters',
            matches: []
        })
    }
    let matches = await matchesService.getAllMatchesSchedule(id);
    console.log(matches)
    return res.status(200).json({
        errCode: 0,
        errMessage: 'Oke',
        matches
    })
}

// lay lịch thi đấu: những trận đấu da ket thuc
let handleAllMatchesResult = async (req, res) => {

    let id = req.query.id; //ALL, SINGER
    if(!id){
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Missing required parameters',
            matches: []
        })
    }
    let matches = await matchesService.getAllMatchesResult(id);
    console.log(matches)
    return res.status(200).json({
        errCode: 0,
        errMessage: 'Oke',
        matches
    })
}


//phan trang lich thi dau phia nguoi dung
let getMatchesForPageUser = async (req, res) => {
    let {page,perPage} = req.query;
    try{
        let matches = await matchesService.getMatchesForPageUserService(+page, +perPage);
        return res.status(200).json(matches)
    }catch(e){
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: "Error from server.."
        })
    }
}

//phan trang ket qua tran dau phia nguoi dung
let getResultForPageUser = async (req, res) => {
    let {page,perPage} = req.query;
    try{
        let result = await matchesService.getResultForPageUserService(+page, +perPage);
        return res.status(200).json(result)
    }catch(e){
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: "Error from server.."
        })
    }
}
module.exports = {
    handleAllMatchesResult: handleAllMatchesResult,
    handleAllMatchesSchedule: handleAllMatchesSchedule,
    handleAllMatches: handleAllMatches,
    handleCreateNewMatches: handleCreateNewMatches,
    handleDeleteMatches: handleDeleteMatches,
    handleEditMatches: handleEditMatches,
    getMatchesForPage: getMatchesForPage,
    getMatchesForPageUser: getMatchesForPageUser,
    getResultForPageUser: getResultForPageUser,
}

