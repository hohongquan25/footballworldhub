import db from "../models/index";

// lay du lieu doi bong
let getAllClubs = (clubsId) =>{
    return new Promise( async(resolve, reject) =>{
        try{
            let clubs = '';
            if(clubsId === 'ALL'){
                clubs = await db.Clubs.findAll()
            }
            if(clubsId && clubsId !== 'ALL'){
                clubs = await db.Clubs.findOne({
                    where: { id: clubsId },
                })
               
            }
            resolve(clubs);
        }catch(e){
            reject(e);
        }
    })
}

// phan trang cau lac bo
let getClubForPageService = (page, perPage) =>{
    return new Promise (async(resolve, reject)=>{
        const offset = (page - 1) * perPage;
        const limit = perPage;
        try{
            let clubs = await db.Clubs.findAll({
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
            if(clubs && clubs.countryLogo ){
                clubs.countryLogo = new Buffer.from(clubs.countryLogo, 'base64').toString('binary');
            }
            resolve({
                errCode: 0,
                clubs,
                currentPage: parseInt(page),
                perPage: parseInt(perPage),
            })
        }catch(e){
            reject(e);
        }
    })
}

// them doi bong
let createNewClubs = (data) => {
    return new Promise (async(resolve, reject) => {
        try{            
            await db.Clubs.create({
                clubName: data.clubName,
                clubLogo: data.clubLogo,
                clubStadium: data.clubStadium,
                CountryId: data.CountryId,
                clubCoach: data.clubCoach,
                
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
let deleteClubs = (clubsId) =>{
    return new Promise (async (resolve, reject) =>{
        let clubs = await db.Clubs.findOne({
            where: {id: clubsId}
        })
        if(!clubs){
            resolve({
                errCode: 2,
                errMessage: "Err"
            })
        }
        await db.Clubs.destroy({
            where: { id: clubsId }
        })
        resolve({
            errCode: 0,
            errMessage: "oke"
        })
    })
}

// sua doi bong

let editClubs = (data) =>{
    return new Promise ( async (resolve, reject) =>{
        try{
            if(!data.id ){   
                resolve({
                    errCode: 2,
                    errMessage: 'Missing requied parameters!'
                })
            }
            let clubs = await db.Clubs.findOne({
                where: {id: data.id},
               // raw: false
            });
            if(clubs){
                
                clubs.clubName = data.clubName;
                clubs.clubStadium = data.clubStadium;
                clubs.CountryId = data.CountryId;
                clubs.clubCoach = data.clubCoach;
                if(data.clubLogo){
                    clubs.clubLogo = data.clubLogo;
                }
               
                await clubs.save();
        
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

//Lấy tin tức liên quan đến câu lạc bộ
let getNewsClubsService = (inputId) =>{
    return new Promise ( async(resolve, reject)=>{
        try{
            if(!inputId){
                resolve({
                    errCode: 1,
                    errMessage: 'error'
                })
            }
            else{
                let data = await db.Clubs.findOne({
                    where: {
                        id: inputId
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


// lấy thông tin chi tiết clb
let getDetailAllClubs = (clubsId) =>{
    return new Promise( async(resolve, reject) =>{
        try{                 
            let clubs = '';
            if(!clubsId){
                resolve({
                    errCode: 1,
                    errMessage: 'error'
                })
            }
            else if(clubsId === 'ALL'){
                    clubs = await db.Clubs.findAll({
                    include: [
                        { model: db.Countries, attributes: ['id', 'countryName', 'countryLogo']}
                    ],
                    // attributes: {
                    //     exclude: ['tournamentLogo']
                    // },
                    raw: false,
                    nest: true
                })

                if(clubs && clubs.countryLogo ){
                    clubs.countryLogo = new Buffer.from(clubs.countryLogo, 'base64').toString('binary');
                }

                if(!clubs) clubs = {};
                resolve(clubs);
                
            }
            else{
                    clubs = await db.Clubs.findOne({
                    where: {
                        id: clubsId
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

                if(clubs && clubs.countryLogo ){
                    clubs.countryLogo = new Buffer.from(clubs.countryLogo, 'base64').toString('binary');
                }

                if(!clubs) clubs = {};
                resolve(clubs);
            }
        }catch(e){
            reject(e);
        }
    })
}

module.exports = {
    getDetailAllClubs: getDetailAllClubs,
    getNewsClubsService: getNewsClubsService,
    getAllClubs: getAllClubs,
    createNewClubs: createNewClubs,
    deleteClubs: deleteClubs,
    editClubs: editClubs,
    getClubForPageService: getClubForPageService,
    
}

