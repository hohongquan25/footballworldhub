import playerService from "../services/playerService";
// lay thong tin cau thu
let handleAllPlayers = async (req, res) => {

    let id = req.query.id; //ALL, SINGER
    if(!id){
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Missing required parameters',
            players: []
        })
    }
    let players = await playerService.getAllPlayers(id);
    console.log(players)
    return res.status(200).json({
        errCode: 0,
        errMessage: 'Oke',
        players
    })
}

//phan trang cau thu
let getPlayersForPage = async (req, res) => {
    let {page,perPage} = req.query;
    
    
    try{
        let players = await playerService.getPlayersForPageService(+page, +perPage);
        return res.status(200).json(players)
    }catch(e){
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: "Error from server.."
        })
    }
}


// them cau thu
let handleCreateNewPlayers = async (req, res) => {
    let message = await playerService.createNewPlayers(req.body);
    return res.status(200).json(message); 
}

// xoa cau thu
let handleDeletePlayers = async (req, res) =>{
    if (!req.body.id){
        return res.status(200).json({
            errCode: 1,
            errMessage: "Missing required parameters!"
        })
    }
    else{
        let message = await playerService.deletePlayers(req.body.id);
        return res.status(200).json(message);
        }
}
// sua cau thu
let handleEditPlayers = async (req, res) =>{
    console.log(req.body.id);
    let data = req.body;
    let message = await playerService.editPlayers(data);
    return res.status(200).json(message);
    
}


// lấy các tin tức liên quan đến các cầu thủ
let getNewsPlayers = async (req, res) =>{
    try{
        let content = await playerService.getNewsPlayersService(req.query.id);
        return res.status(200).json(content)
    }catch(e){
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'error'
        })
    }
}

let handleDetailAllPlayers = async (req, res) => {

    let id = req.query.id; //ALL, SINGER
    if(!id){
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Missing required parameters',
            players: []
        })
    }
    let players = await playerService.getDetailAllPlayer(id);
    console.log(players)
    return res.status(200).json({
        errCode: 0,
        errMessage: 'Oke',
        players
    })
}

// lấy nội dung thông tin chi tiết của cầu thủ
let getInfoPlayer = async (req, res) =>{
    try{
        let player = await playerService.getInfoPlayerService(req.query.id);
        return res.status(200).json(player)
    }catch(e){
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'error'
        })
    }
}

// viết nội dung chính của thông tin cầu thủ
let handleCreateWirteInfoPlayer = async (req, res) => {
    try{
        let response = await playerService.SaveWirteInfoPlayer(req.body);
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

//phan trang cau thu
let getPlayersForPageUser = async (req, res) => {
    let {page,perPage} = req.query;
    
    
    try{
        let players = await playerService.getPlayersForPageUserService(+page, +perPage);
        return res.status(200).json(players)
    }catch(e){
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: "Error from server.."
        })
    }
}

module.exports = {
    handleCreateWirteInfoPlayer: handleCreateWirteInfoPlayer,
    getInfoPlayer: getInfoPlayer,
    handleDetailAllPlayers: handleDetailAllPlayers,
    getNewsPlayers: getNewsPlayers,
    handleAllPlayers: handleAllPlayers,
    handleCreateNewPlayers: handleCreateNewPlayers,
    handleDeletePlayers: handleDeletePlayers,
    handleEditPlayers: handleEditPlayers,
    getPlayersForPage: getPlayersForPage,
    getPlayersForPageUser: getPlayersForPageUser,
}

