import db from "../models/index";

// lay du lieu cau thu
let getAllPlayers = (playersId) =>{
    return new Promise( async(resolve, reject) =>{
        try{
            let players = '';
            if(playersId === 'ALL'){
                players = await db.Players.findAll()
            }
            if(playersId && playersId !== 'ALL'){
                players = await db.Players.findOne({
                    where: { id: playersId },
                })
               
            }
            resolve(players);
        }catch(e){
            reject(e);
        }
    })
}

// phan trang cau thu
let getPlayersForPageService = (page, perPage) =>{
    return new Promise (async(resolve, reject)=>{
        const offset = (page - 1) * perPage;
        const limit = perPage;
        try{
            let players = await db.Players.findAll({
                limit,
                offset,
                order: [['createdAt', 'DESC']],
                include: [
                    { model: db.Clubs, as: 'club' },
                    { model: db.Countries, as: 'country' },
                    { model: db.Codes, as: 'position'},

                ],
            // attributes: {
            //     exclude: ['tournamentLogo']
            // },
            raw: false,
            nest: true   
            }) 
            if(players && players.tournamentLogo ){
                players.tournamentLogo = new Buffer.from(players.tournamentLogo, 'base64').toString('binary');
             }
            resolve({
                errCode: 0,
                players,
                currentPage: parseInt(page),
                perPage: parseInt(perPage),
            })
        }catch(e){
            reject(e);
        }
    })
}

// them doi bong
let createNewPlayers = (data) => {
    return new Promise (async(resolve, reject) => {
        try{            
            await db.Players.create({
                playerName: data.playerName,
                countryId: data.countryId,
                playerAge: data.playerAge,
                playerNumber: data.playerNumber,
                positionId: data.positionId,
                clubId: data.clubId,
                playerImgae: data.playerImgae,

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

// xoa cau thu
let deletePlayers = (playersId) =>{
    return new Promise (async (resolve, reject) =>{
        let players = await db.Players.findOne({
            where: {id: playersId}
        })
        if(!players){
            resolve({
                errCode: 2,
                errMessage: "Err"
            })
        }
        await db.Players.destroy({
            where: { id: playersId }
        })
        resolve({
            errCode: 0,
            errMessage: "oke"
        })
    })
}

// sua cau thu
let editPlayers = (data) =>{
    return new Promise ( async (resolve, reject) =>{
        try{
            if(!data.id ){   
                resolve({
                    errCode: 2,
                    errMessage: 'Missing requied parameters!'
                })
            }
            let players = await db.Players.findOne({
                where: {id: data.id},
               // raw: false
            });
            if(players){
                
                players.playerName = data.playerName,
                players.countryId = data.countryId,
                players.playerAge = data.playerAge,
                players.playerNumber = data.playerNumber,
                players.playerNumber = data.playerNumber,
                players.clubId = data.clubId,
                players.positionId = data.positionId
                if(data.playerImgae){
                    players.playerImgae = data.playerImgae;
                }
                
               
                await players.save();
        
                resolve({
                    errCode: 0,
                    message: 'Update the Player success',
                });

            }else{
                resolve({
                    errCode: 1,
                    errMessage: 'Player is not found',
                });
            }
        
        }catch(e){
            reject(e);
        }
    })
}


//Lấy tin tức liên quan đến cau thu
let getNewsPlayersService = (inputId) =>{
    return new Promise ( async(resolve, reject)=>{
        try{
            if(!inputId){
                resolve({
                    errCode: 1,
                    errMessage: 'error'
                })
            }
            else{
                let data = await db.Players.findOne({
                    where: {
                        id: inputId
                    },
                    include: [
                        { model: db.News, attributes: ['id', 'newTitle','newContent'] }
                    ],
                    attributes: {
                        exclude: ['playerImgae']
                    },
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

 // lấy thông tin đầy đủ của cầu thủ
 let getDetailAllPlayer = (playersId) =>{
    return new Promise ( async(resolve, reject)=>{
        try{
            let players = '';
            if(!playersId){
                resolve({
                    errCode: 1,
                    errMessage: 'error'
                })
            }

            else if(playersId === 'ALL'){
                players = await db.Players.findAll({
                    include: [
                        { model: db.Clubs, as: 'club' },
                        { model: db.Countries, as: 'country' },
                        { model: db.Codes, as: 'position'},

                    ],
                // attributes: {
                //     exclude: ['tournamentLogo']
                // },
                raw: false,
                nest: true
                })

                if(players && players.tournamentLogo ){
                    players.tournamentLogo = new Buffer.from(players.tournamentLogo, 'base64').toString('binary');
                 }

                if(!players) players = {};
            resolve(players);
            
            }
            else{
                    players = await db.Players.findOne({
                    where: {
                        id: playersId,
                    },
                    include: [
                        { model: db.Clubs, as: 'club' },
                        { model: db.Countries, as: 'country' },
                        { model: db.Codes, as: 'position'},

                    ],
                    // attributes: {
                    //     exclude: ['tournamentLogo']
                    // },
                    raw: false,
                    nest: true
                })

                if(players && players.tournamentLogo ){
                    players.tournamentLogo = new Buffer.from(players.tournamentLogo, 'base64').toString('binary');
                }

                if(!players) players = {};
                resolve(players);
            }
        }catch(e){  
            reject(e);
        }
    })
}

// lấy nội dung chính của cầu thủ trong bảng Markdown
let getInfoPlayerService = (inputId) =>{
    return new Promise ( async(resolve, reject)=>{
        try{
            if(!inputId){
                resolve({
                    errCode: 1,
                    errMessage: 'error'
                })
            }
            else{
                let data = await db.Players.findOne({
                    where: {
                        id: inputId
                    },
                    include: [
                        { model: db.Markdown, attributes: ['contentHTML', 'contentMarkdown'] },
                        { model: db.Clubs, as: 'club' },
                        { model: db.Countries, as: 'country' },
                        { model: db.Codes, as: 'position'},
                    ],
                    raw: false,
                    nest: true
                })

                if(data && data.playerImgae){
                    data.playerImgae = new Buffer.from(data.playerImgae, 'base64').toString('binary');
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

 // lưu nội dung thông tin cầu thủ đã viết
let SaveWirteInfoPlayer = (inputData) =>{
    return new Promise (async (resolve, reject) =>{
        try{
            if(!inputData.playerId || !inputData.contentHTML || !inputData.contentMarkdown || !inputData.action){
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
                        where: { playerId: inputData.playerId},
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

// phan trang lấy thông tin đầy đủ của cầu thủ
let getPlayersForPageUserService = (page, perPage) =>{
    return new Promise ( async(resolve, reject)=>{
        const offset = (page - 1) * perPage;
        const limit = perPage;
        try{
            let players = await db.Players.findAll({
                    limit,
                    offset,
                    order: [['createdAt', 'DESC']],
                    include: [
                        { model: db.Clubs, as: 'club' },
                        { model: db.Countries, as: 'country' },
                        { model: db.Codes, as: 'position'},

                    ],
                // attributes: {
                //     exclude: ['tournamentLogo']
                // },
                raw: false,
                nest: true
                })

                if(players && players.tournamentLogo ){
                    players.tournamentLogo = new Buffer.from(players.tournamentLogo, 'base64').toString('binary');
                 }

                if(!players) players = {};
                resolve({
                    errCode: 0,
                    players,
                    currentPage: parseInt(page),
                    perPage: parseInt(perPage),
                })
        
        }catch(e){  
            reject(e);
        }
    })
}
module.exports = {
    SaveWirteInfoPlayer: SaveWirteInfoPlayer,
    getInfoPlayerService: getInfoPlayerService,
    getDetailAllPlayer: getDetailAllPlayer,
    getNewsPlayersService: getNewsPlayersService,
    getAllPlayers: getAllPlayers,
    createNewPlayers: createNewPlayers,
    deletePlayers: deletePlayers,
    editPlayers: editPlayers,
    getPlayersForPageService: getPlayersForPageService,
    getPlayersForPageUserService: getPlayersForPageUserService,
}

