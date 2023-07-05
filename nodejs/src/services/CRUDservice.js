import bycrypt from 'bcryptjs';
import db from '../models/index';

const salt = bycrypt.genSaltSync(10);

let createNewUser = async (data) => {
    return new Promise(async (resolve, reject) =>{
        try{
            let hashPasswordFromBycrypt = await hashUserPassword(data.passWord);
            await db.User.create({
                userName: data.userName,
                passWord: hashPasswordFromBycrypt,
                birthDay: data.birthDay,
                email: data.email,
                fullName: data.fullName,
                Gender: data.Gender === '1' ? true : false,
            });

            resolve('ok yeu Trang tao moi thanh cong');
        }catch(e){
            reject(e)
        }
    });
}

let hashUserPassword = (passWord) => {
    return new Promise(async(resolve,reject) => {
        try{
            let hashPassword = await bycrypt.hashSync(passWord, salt);
            resolve(hashPassword);
        }catch(e){
            reject(e);
        }
    });
}

let getAllUser = async () =>{
    return new Promise( async (resolve,reject) =>{
        try{
            let users = db.User.findAll({
                raw: true,
            });
            resolve(users);
        }catch(e){
            reject(e);
        }
    });
}

let getUserInfoById = (id) => {
    return new Promise( async (resolve, reject) => {
        try{
            let user = await db.User.findOne({
                where: { id:id },
                raw: true,
            });

            if(user){
                resolve(user);
            }
            else{
                resolve({});
            }
        }catch(e){
            reject(e);
        }
    });
}

let updateUserData = (data) => {
    return new Promise ( async (resolve,reject) => {

        try{
            let user = await db.User.findOne({
                where: {id: data.id}
            });
            if(user){
                user.birthDay = data.birthDay;
                user.fullName = data.fullName;
                user.Gender = data.Gender;

                await user.save();
                
                let allUsers = await db.User.findAll();
                resolve(allUsers);

            }else{
                resolve();
            }
        
        }catch(e){
            reject(e);
        }
    });

}

let deleteUserById = (userId) => {
    return new Promise(async(resolve,reject) => {
        try{
            let user = await db.User.findOne({
                where: {id: userId}
            })
            if(user){
                await user.destroy();
                let allUsers = await db.User.findAll();
                resolve(allUsers);

            }
            resolve();
        }catch(e){

        }
    });
}

module.exports = {
    createNewUser: createNewUser,
    getAllUser: getAllUser,
    getUserInfoById: getUserInfoById,
    updateUserData: updateUserData,
    deleteUserById: deleteUserById,
}