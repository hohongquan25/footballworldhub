import db from "../models/index";

// lay du lieu doi bong
let getAllCountries = (countriesId) =>{
    return new Promise( async(resolve, reject) =>{
        try{
            let countries = '';
            if(countriesId === 'ALL'){
                countries = await db.Countries.findAll()
            }
            if(countriesId && countriesId !== 'ALL'){
                countries = await db.Countries.findOne({
                    where: { id: countriesId },
                })
               
            }
            resolve(countries);
        }catch(e){
            reject(e);
        }
    })
}

// phan trang quoc gia
let getCountriesForPageService = (page, perPage) =>{
    return new Promise (async(resolve, reject)=>{
        const offset = (page - 1) * perPage;
        const limit = perPage;
        try{
            let countries = await db.Countries.findAll({
                limit,
                offset,
                order: [['createdAt', 'DESC']],
                
            })
            let total = await db.Countries.count();
            resolve({
                errCode: 0,
                countries,
                total,
                currentPage: parseInt(page),
                perPage: parseInt(perPage),
            })
        }catch(e){
            reject(e);
        }
    })
}

// them doi bong
let createNewCountries = (data) => {
    return new Promise (async(resolve, reject) => {
        try{            
            await db.Countries.create({
                countryName: data.countryName,
                countryLogo: data.countryLogo,
                
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
let deleteCountries = (countriesId) =>{
    return new Promise (async (resolve, reject) =>{
        let countries = await db.Countries.findOne({
            where: {id: countriesId}
        })
        if(!countries){
            resolve({
                errCode: 2,
                errMessage: "Err"
            })
        }
        await db.Countries.destroy({
            where: { id: countriesId }
        })
        resolve({
            errCode: 0,
            errMessage: "oke"
        })
    })
}

// sua doi bong

let editCountries = (data) =>{
    return new Promise ( async (resolve, reject) =>{
        try{
            if(!data.id ){   
                resolve({
                    errCode: 2,
                    errMessage: 'Missing requied parameters!'
                })
            }
            let countries = await db.Countries.findOne({
                where: {id: data.id},
               // raw: false
            });
            if(countries){
                
                countries.countryName = data.countryName;
                if(data.countryLogo){
                    countries.countryLogo = data.countryLogo;
                }
               
                await countries.save();
        
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
module.exports = {
    getAllCountries: getAllCountries,
    createNewCountries: createNewCountries,
    deleteCountries: deleteCountries,
    editCountries: editCountries,
    getCountriesForPageService: getCountriesForPageService,
}

