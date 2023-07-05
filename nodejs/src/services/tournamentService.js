import db from "../models/index";

// lay du lieu giai dau
let getAllTournaments = (tournamentsId) =>{
    return new Promise( async(resolve, reject) =>{
        try{
            let tournaments = '';
            if(tournamentsId === 'ALL'){
                tournaments = await db.Tournaments.findAll()
            }
            if(tournamentsId && tournamentsId !== 'ALL'){
                tournaments = await db.Tournaments.findOne({
                    where: { id: tournamentsId },
                })
               
            }
            resolve(tournaments);
        }catch(e){
            reject(e);
        }
    })
}
// phan trang giai dau
let getTournamentForPageService = (page, perPage) =>{
    return new Promise (async(resolve, reject)=>{
        const offset = (page - 1) * perPage;
        const limit = perPage;
        try{
            let tournaments = await db.Tournaments.findAll({
                limit,
                offset,
                order: [['createdAt', 'DESC']],
                include: [
                    { model: db.Countries, attributes: ['id', 'countryName', 'countryLogo']}
                ],
                // attributes: {
                //     exclude: ['tournamentLogo']
                // },
                raw: false,
                nest: true
                
            })
            if(tournaments && tournaments.countryLogo ){
                tournaments.countryLogo = new Buffer.from(tournaments.countryLogo, 'base64').toString('binary');
            }
            resolve({
                errCode: 0,
                tournaments,
                currentPage: parseInt(page),
                perPage: parseInt(perPage),
            })
        }catch(e){
            reject(e);
        }
    })
}
// them giai dau
let createNewTournament = (data) => {
    return new Promise (async(resolve, reject) => {
        try{            
            await db.Tournaments.create({
                tournamentName: data.tournamentName,
                countryId: data.countryId,
                tournamentLogo: data.tournamentLogo,         
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

// xoa giai dau
let deleteTournament = (tournamentId) =>{
    return new Promise (async (resolve, reject) =>{
        let tournament = await db.Tournaments.findOne({
            where: {id: tournamentId}
        })
        if(!tournament){
            resolve({
                errCode: 2,
                errMessage: "Err"
            })
        }
        await db.Tournaments.destroy({
            where: { id: tournamentId }
        })
        resolve({
            errCode: 0,
            errMessage: "oke"
        })
    })
}

// sua giai dau

let editTournament = (data) =>{
    return new Promise ( async (resolve, reject) =>{
        try{
            if(!data.id ){   
                resolve({
                    errCode: 2,
                    errMessage: 'Missing requied parameters!'
                })
            }
            let tournament = await db.Tournaments.findOne({
                where: {id: data.id},
               // raw: false
            });
            if(tournament){
                tournament.tournamentName = data.tournamentName;
                tournament.countryId = data.countryId;
                if(data.tournamentLogo){
                    tournament.tournamentLogo = data.tournamentLogo;
                }
                await tournament.save();
        
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

// lay tin lien quan den giai dau
let getNewsTournamentsService = (newsId) =>{
    return new Promise ( async(resolve, reject)=>{
        try{
            let news = '';
            if(!newsId){
                resolve({
                    errCode: 1,
                    errMessage: 'error'
                })
            }
            else{
                news = await db.Tournaments.findOne({
                    where: {
                        id: newsId
                    },
                    include: [
                        { model: db.News, attributes: ['id', 'newTitle','newContent','imageNew'] }
                    ],
                    // attributes: {
                    //     exclude: ['tournamentLogo']
                    // },
                    raw: false,
                    nest: true
                })

                if(news && news.imageNew){
                    news.imageNew = new Buffer.from(news.imageNew, 'base64').toString('binary');
                }
                if(!news) news = {};
                resolve({
                    errCode: 0,
                    news
                })
            }
        }catch(e){  
            reject(e);
        }
    })
 }

 // lấy giải đấu chi tiết
 let getDetailAllTournaments = (tournamentsId) =>{
    
    return new Promise( async(resolve, reject) =>{
        try{                 
            let tournaments = '';
            if(!tournamentsId){
                resolve({
                    errCode: 1,
                    errMessage: 'error'
                })
            }
            else if(tournamentsId === 'ALL'){
                    tournaments = await db.Tournaments.findAll({
                    include: [
                        { model: db.Countries, attributes: ['id', 'countryName', 'countryLogo']}
                    ],
                    // attributes: {
                    //     exclude: ['tournamentLogo']
                    // },
                    raw: false,
                    nest: true
                })

                if(tournaments && tournaments.countryLogo ){
                    tournaments.countryLogo = new Buffer.from(tournaments.countryLogo, 'base64').toString('binary');
                }

                if(!tournaments) tournaments = {};
                resolve(tournaments);
                
            }
            else{
                    tournaments = await db.Tournaments.findOne({
                    where: {
                        id: tournamentsId
                    },
                    include: [
                        { model: db.Countries, attributes: ['id', 'countryName','countryLogo'] }
                    ],
                    // attributes: {
                    //     exclude: ['tournamentLogo']
                    // },
                    raw: false,
                    nest: true
                })

                if(tournaments && tournaments.countryLogo ){
                    tournaments.countryLogo = new Buffer.from(tournaments.countryLogo, 'base64').toString('binary');
                }

                if(!tournaments) tournaments = {};
                resolve(tournaments);
            }
        }catch(e){
            reject(e);
        }
    })
}

module.exports = {
    getDetailAllTournaments: getDetailAllTournaments,
    getAllTournaments: getAllTournaments,
    createNewTournament: createNewTournament,
    deleteTournament: deleteTournament,
    editTournament: editTournament,
    getNewsTournamentsService: getNewsTournamentsService,
    getTournamentForPageService: getTournamentForPageService,
   
}

