import tournamentService from "../services/tournamentService";
// lay thong tin giai dau
let handleAllTournaments = async (req, res) => {

    let id = req.query.id; //ALL, SINGER
    if(!id){
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Missing required parameters',
            tournaments: []
        })
    }
    let tournaments = await tournamentService.getAllTournaments(id);
    console.log('check:',tournaments)
    return res.status(200).json({
        errCode: 0,
        errMessage: 'Oke',
        tournaments
    })
}
//phan trang giai dau
let getTournamentForPage = async (req, res) => {
    let {page,perPage} = req.query;
    try{
        let tournaments = await tournamentService.getTournamentForPageService(+page, +perPage);
        return res.status(200).json(tournaments)
    }catch(e){
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: "Error from server.."
        })
    }
}

// them giai dau
let handleCreateNewTournament = async (req, res) => {
    let message = await tournamentService.createNewTournament(req.body);
    return res.status(200).json(message); 
}

// xoa giai dau
let handleDeleteTournaments = async (req, res) =>{
    if (!req.body.id){
        return res.status(200).json({
            errCode: 1,
            errMessage: "Missing required parameters!"
        })
    }
    else{
        let message = await tournamentService.deleteTournament(req.body.id);
        return res.status(200).json(message);
        }
}
// sua giai dau
let handleEditTournaments = async (req, res) =>{
    console.log(req.body.id);
    let data = req.body;
    let message = await tournamentService.editTournament(data);
    return res.status(200).json(message);
    
}

// lấy các tin tức liên quan đến giải đấu
let getNewsTournaments = async (req, res) =>{
    try{
        let content = await tournamentService.getNewsTournamentsService(req.query.id);
        return res.status(200).json(content)
    }catch(e){
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'error'
        })
    }
}

let handleDetailAllTournaments = async (req, res) => {

    let id = req.query.id; //ALL, SINGER
    if(!id){
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Missing required parameters',
            tournaments: []
        })
    }
    let tournaments = await tournamentService.getDetailAllTournaments(id);
    console.log('check:',tournaments)
    return res.status(200).json({
        errCode: 0,
        errMessage: 'Oke',
        tournaments
    })
}

module.exports = {
    handleDetailAllTournaments: handleDetailAllTournaments,
    handleAllTournaments: handleAllTournaments,
    handleCreateNewTournament: handleCreateNewTournament,
    handleDeleteTournaments: handleDeleteTournaments,
    handleEditTournaments: handleEditTournaments,
    getNewsTournaments: getNewsTournaments,
    getTournamentForPage: getTournamentForPage,

}

