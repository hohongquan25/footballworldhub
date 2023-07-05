import db from "../models/index";

// lay du lieu tran dau
let getAllMatches = (matchesId) =>{
    return new Promise ( async(resolve, reject)=>{
        try{
            let matches = '';
            if(!matchesId){
                resolve({
                    errCode: 1,
                    errMessage: 'error'
                })
            }

            else if(matchesId === 'ALL'){
                matches = await db.Matches.findAll({
                    include: [
                        { model: db.Clubs, as: 'homeTeam' },
                        { model: db.Clubs, as: 'awayTeam' },
                        { model: db.Tournaments, as: 'tournaments' },
                        { model: db.Codes, as: 'status' },

                    ],
                // attributes: {
                //     exclude: ['tournamentLogo']
                // },
                raw: false,
                nest: true
                })

                if(matches && matches.tournamentLogo ){
                matches.tournamentLogo = new Buffer.from(matches.tournamentLogo, 'base64').toString('binary');
                 }

                if(!matches) matches = {};
            resolve(matches);
            
            }
            else{
                    matches = await db.Matches.findOne({
                    where: {
                        id: matchesId
                    },
                    include: [
                        { model: db.Clubs, as: 'homeTeam' },
                        { model: db.Clubs, as: 'awayTeam' },
                        { model: db.Tournaments, as: 'tournaments' },
                        { model: db.Codes, as: 'status' },

                    ],
                    // attributes: {
                    //     exclude: ['tournamentLogo']
                    // },
                    raw: false,
                    nest: true
                })

                if(matches && matches.tournamentLogo ){
                    matches.tournamentLogo = new Buffer.from(matches.tournamentLogo, 'base64').toString('binary');
                }

                if(!matches) matches = {};
                resolve(matches);
            }
        }catch(e){  
            reject(e);
        }
    })
}

// phan trang cau lac bo
let getMatchesForPageService = (page, perPage) =>{
    return new Promise (async(resolve, reject)=>{
        const offset = (page - 1) * perPage;
        const limit = perPage;
        try{
            let matches = await db.Matches.findAll({
                limit,
                offset,
                order: [['createdAt', 'DESC']],
                include: [
                    { model: db.Clubs, as: 'homeTeam' },
                    { model: db.Clubs, as: 'awayTeam' },
                    { model: db.Tournaments, as: 'tournaments' },
                    { model: db.Codes, as: 'status' },

                ],
                raw: false,
                nest: true
            })
        
            resolve({
                errCode: 0,
                matches,
                currentPage: parseInt(page),
                perPage: parseInt(perPage),
            })
        }catch(e){
            reject(e);
        }
    })
}

// them tran dau
let createNewMatches = (data) => {
    return new Promise (async(resolve, reject) => {
        try{            
            await db.Matches.create({
                matchDate: data.matchDate,
                matchTime: data.matchTime,
                clubIdHome: data.clubIdHome,
                clubIdAway: data.clubIdAway,
                matchStatus: data.matchStatus,
                tournamentsId: data.tournamentsId,
                matchGoalHome: data.matchGoalHome,
                matchGoalAway: data.matchGoalAway,
              
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
let deleteMatches = (matchesId) =>{
    return new Promise (async (resolve, reject) =>{
        let matches = await db.Matches.findOne({
            where: {id: matchesId}
        })
        if(!matches){
            resolve({
                errCode: 2,
                errMessage: "Err"
            })
        }
        await db.Matches.destroy({
            where: { id: matchesId }
        })
        resolve({
            errCode: 0,
            errMessage: "oke"
        })
    })
}

// sua doi bong

let editMatches = (data) =>{
    return new Promise ( async (resolve, reject) =>{
        try{
            if(!data.id ){   
                resolve({
                    errCode: 2,
                    errMessage: 'Missing requied parameters!'
                })
            }
            let matches = await db.Matches.findOne({
                where: {id: data.id},
               // raw: false
            });
            if(matches){
                
                matches.matchDate = data.matchDate,
                matches.matchTime = data.matchTime,
                matches.clubIdHome = data. clubIdHome,
                matches.clubIdAway = data.clubIdAway,
                matches.matchStatus = data.matchStatus,
                matches.tournamentsId = data.tournamentsId,
                matches.matchGoalHome = data.matchGoalHome,
                matches.matchGoalAway = data.matchGoalAway,
              
               
                await matches.save();
        
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

// lấy lịch thi đấu: những trận đấu đang diễn ra và sắp diễn ra
let getAllMatchesSchedule = (matchesId) =>{
    return new Promise ( async(resolve, reject)=>{
        try{
            let matches = '';
            if(!matchesId){
                resolve({
                    errCode: 1,
                    errMessage: 'error'
                })
            }

            else if(matchesId === 'ALL'){
                matches = await db.Matches.findAll({
                    where: {
                        matchStatus: [19, 20],
                    },
                    include: [
                        { model: db.Clubs, as: 'homeTeam' },
                        { model: db.Clubs, as: 'awayTeam' },
                        { model: db.Tournaments, as: 'tournaments' },
                        { model: db.Codes, as: 'status'},

                    ],
                // attributes: {
                //     exclude: ['tournamentLogo']
                // },
                raw: false,
                nest: true
                })

                if(matches && matches.tournamentLogo ){
                matches.tournamentLogo = new Buffer.from(matches.tournamentLogo, 'base64').toString('binary');
                 }

                if(!matches) matches = {};
            resolve(matches);
            
            }
            else{
                    matches = await db.Matches.findOne({
                    where: {
                        id: matchesId,
                        matchStatus: [19, 20],
                    },
                    include: [
                        { model: db.Clubs, as: 'homeTeam' },
                        { model: db.Clubs, as: 'awayTeam' },
                        { model: db.Tournaments, as: 'tournaments' },
                        { model: db.Codes, as: 'status'},

                    ],
                    // attributes: {
                    //     exclude: ['tournamentLogo']
                    // },
                    raw: false,
                    nest: true
                })

                if(matches && matches.tournamentLogo ){
                    matches.tournamentLogo = new Buffer.from(matches.tournamentLogo, 'base64').toString('binary');
                }

                if(!matches) matches = {};
                resolve(matches);
            }
        }catch(e){  
            reject(e);
        }
    })
}

// lấy kết quả trận đấu: những trận đấu đã kết thúc
let getAllMatchesResult = (matchesId) =>{
    return new Promise ( async(resolve, reject)=>{
        try{
            let matches = '';
            if(!matchesId){
                resolve({
                    errCode: 1,
                    errMessage: 'error'
                })
            }

            else if(matchesId === 'ALL'){
                matches = await db.Matches.findAll({
                    where: {
                        matchStatus: [21],
                    },
                    include: [
                        { model: db.Clubs, as: 'homeTeam' },
                        { model: db.Clubs, as: 'awayTeam' },
                        { model: db.Tournaments, as: 'tournaments' },
                        { model: db.Codes, as: 'status'},

                    ],
                // attributes: {
                //     exclude: ['tournamentLogo']
                // },
                raw: false,
                nest: true
                })

                if(matches && matches.tournamentLogo ){
                matches.tournamentLogo = new Buffer.from(matches.tournamentLogo, 'base64').toString('binary');
                 }

                if(!matches) matches = {};
            resolve(matches);
            
            }
            else{
                    matches = await db.Matches.findOne({
                    where: {
                        id: matchesId,
                        matchStatus: [21],
                    },
                    include: [
                        { model: db.Clubs, as: 'homeTeam' },
                        { model: db.Clubs, as: 'awayTeam' },
                        { model: db.Tournaments, as: 'tournaments' },
                        { model: db.Codes, as: 'status'},

                    ],
                    // attributes: {
                    //     exclude: ['tournamentLogo']
                    // },
                    raw: false,
                    nest: true
                })

                if(matches && matches.tournamentLogo ){
                    matches.tournamentLogo = new Buffer.from(matches.tournamentLogo, 'base64').toString('binary');
                }

                if(!matches) matches = {};
                resolve(matches);
            }
        }catch(e){  
            reject(e);
        }
    })
}

// lấy lịch thi đấu: phan trang lich thi dau phia nguoi dung
let getMatchesForPageUserService = (page, perPage) =>{
    return new Promise ( async(resolve, reject)=>{
        const offset = (page - 1) * perPage;
        const limit = perPage;
        try{
            let matches = await db.Matches.findAll({
                limit,
                offset,
                order: [['createdAt', 'DESC']],
                    where: {
                        matchStatus: [19, 20],
                    },
                    include: [
                        { model: db.Clubs, as: 'homeTeam' },
                        { model: db.Clubs, as: 'awayTeam' },
                        { model: db.Tournaments, as: 'tournaments' },
                        { model: db.Codes, as: 'status'},

                    ],
                // attributes: {
                //     exclude: ['tournamentLogo']
                // },
                raw: false,
                nest: true
                })

                if(matches && matches.tournamentLogo ){
                matches.tournamentLogo = new Buffer.from(matches.tournamentLogo, 'base64').toString('binary');
                 }

                if(!matches) matches = {};
                resolve({
                    errCode: 0,
                    matches,
                    currentPage: parseInt(page),
                    perPage: parseInt(perPage),
                })
         
        }catch(e){  
            reject(e);
        }
    })
}

// lấy lịch thi đấu: phan trang lich thi dau phia nguoi dung
let getResultForPageUserService = (page, perPage) =>{
    return new Promise ( async(resolve, reject)=>{
        const offset = (page - 1) * perPage;
        const limit = perPage;
        try{
            let result = await db.Matches.findAll({
                limit,
                offset,
                order: [['createdAt', 'DESC']],
                    where: {
                        matchStatus: [21],
                    },
                    include: [
                        { model: db.Clubs, as: 'homeTeam' },
                        { model: db.Clubs, as: 'awayTeam' },
                        { model: db.Tournaments, as: 'tournaments' },
                        { model: db.Codes, as: 'status'},

                    ],
                // attributes: {
                //     exclude: ['tournamentLogo']
                // },
                raw: false,
                nest: true
                })

                if(result && result.tournamentLogo ){
                    result.tournamentLogo = new Buffer.from(result.tournamentLogo, 'base64').toString('binary');
                 }

                if(!result) result = {};
                resolve({
                    errCode: 0,
                    result,
                    currentPage: parseInt(page),
                    perPage: parseInt(perPage),
                })
         
        }catch(e){  
            reject(e);
        }
    })
}
module.exports = {
    getAllMatchesResult: getAllMatchesResult,
    getAllMatchesSchedule:getAllMatchesSchedule,
    getAllMatches: getAllMatches,
    createNewMatches: createNewMatches,
    deleteMatches: deleteMatches,
    editMatches: editMatches,
    getMatchesForPageService: getMatchesForPageService,
    getMatchesForPageUserService: getMatchesForPageUserService,
    getResultForPageUserService: getResultForPageUserService,
}

