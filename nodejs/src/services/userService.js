import db from "../models/index";
import bcrypt from 'bcryptjs';

const salt = bcrypt.genSaltSync(10);

let hashUserPassword = (passWord) => {
    return new Promise(async(resolve,reject) => {
        try{
            let hashPassword = await bcrypt.hashSync(passWord, salt);
            resolve(hashPassword);
        }catch(e){
            reject(e);
        }
    });
}

let handleUserLogin = (username,password) => {
    return new Promise ( async (resolve,reject) =>{
        try{
            let userData = {};
            let isExist = await checkUserName(username);
            if(isExist){
                 // nguoi dung ton tai
                let user = await db.User.findOne({
                    attributes: ['userName', 'userRole', 'passWord', 'fullName'],
                    where: { userName: username },
                    raw: true
                    
                });
                if(user){
                // check pass
                   let check = await bcrypt.compareSync(password, user.passWord);
                   if(check){
                        userData.errCode = 0;
                        userData.errMessage = 'Oke';
                        delete user.passWord;
                        userData.user = user;
                   }else{
                        userData.errCode = 3;
                        userData.errMessage = 'Wrong password';
                   }
                }else{
                    userData.errCode = 2;
                    userData.errMessage = 'User not found'
                }
               
            }
            else{
                // bao loi
                userData.errCode = 1;
                userData.errMessage = 'Your username is not exist in your system. Pls try other username';      
                
            }
            resolve(userData)
        }catch(e){
            reject(e)
        }
    })

}

let checkUserName = (username) => {
    return new Promise ( async (resolve, reject) => {
        try{
            let user =  await db.User.findOne({
                where: {userName : username},
            });
            if(user){
                resolve(true)
            }
            else{
                resolve(false)
            }
        }catch(e){
            reject(e);
        }
    });
}
let checkUserEmail = (useremail) => {
    return new Promise ( async (resolve, reject) => {
        try{
            let email =  await db.User.findOne({
                where: {email : useremail},
            });
            if(email){
                resolve(true)
            }
            else{
                resolve(false)
            }
        }catch(e){
            reject(e);
        }
    });
}
let getAllUsers = (userId) =>{
    return new Promise( async(resolve, reject) =>{
        try{
            let users = '';
            if(userId === 'ALL'){
                users = await db.User.findAll({
                    attributes: {
                        exclude: ['passWord']
                    },
                })
            }
            if(userId && userId !== 'ALL'){
                users = await db.User.findOne({
                    where: { id: userId },
                    attributes: {
                        exclude: ['passWord']
                    },
                })
               
            }
            resolve(users);
        }catch(e){
            reject(e);
        }
    })
}

let createNewUser = (data) => {
    return new Promise (async(resolve, reject) => {
        try{
            // check username ton tai
            let check = await checkUserName(data.userName);
            let check2 = await checkUserEmail(data.email);
            
            if(check === true){
                    resolve({
                        errCode: 1,
                        errMessage: 'username is already in used',
                    });
            }
            else if (check2 === true){
                    resolve({
                        errCode: 2,
                        errMessage: 'email is already in used',
                    });
            }
            
            
            else{
                let hashPasswordFromBycrypt = await hashUserPassword(data.passWord);
            await db.User.create({
                userName: data.userName,
                passWord: hashPasswordFromBycrypt,
                fullName: data.fullName,
                email: data.email,
                phoneNumber: data.phoneNumber,
                birthDay: data.birthDay,         
                Gender: data.Gender,
                Address1: data.Address1,
                Avatar: data.Avatar,
                userRole: data.userRole,
            });

            resolve({
                errCode: 0,
                message: 'oke'
            });
            }
            

        }catch(e){  
            reject(e);
        }
    }) 
}

let deleteUser = (userId) =>{
    return new Promise (async (resolve, reject) =>{
        let user = await db.User.findOne({
            where: {id: userId}
        })
        if(!user){
            resolve({
                errCode: 2,
                errMessage: "The user is not exist"
            })
        }
        await db.User.destroy({
            where: { id: userId }
        })
        resolve({
            errCode: 0,
            errMessage: "The user is delete"
        })
    })
}

let editUser = (data) =>{
    return new Promise ( async (resolve, reject) =>{
        try{
            if(!data.id ){   
                resolve({
                    errCode: 2,
                    errMessage: 'Missing requied parameters!'
                })
            }
            let user = await db.User.findOne({
                where: {id: data.id},
               // raw: false
            });
            if(user){
                user.fullName = data.fullName;
                user.email = data.email;
                user.phoneNumber = data.phoneNumber;
                user.birthDay = data.birthDay;
                user.Gender = data.Gender;
               // user.Address1 = data.Address1;
                if(data.Avatar){
                    user.Avatar = data.Avatar;
                }
                user.userRole = data.userRole;
                await user.save();
        
                resolve({
                    errCode: 0,
                    message: 'Update the user success',
                });

            }else{
                resolve({
                    errCode: 1,
                    errMessage: 'user is not found',
                });
            }
        
        }catch(e){
            reject(e);
        }
    })
}

let getCodeService = (typeInput) => {
    return new Promise( async (resolve, reject) => { 
        try{
            if(!typeInput){
                resolve({
                    errCode: 1,
                    errMessage: 'Missing requied parmanter!',
                   
                }); 
                console.log(typeInput)
            }else{
                let res = {};
                let allcode = await db.Codes.findAll({
                    where: { Type: typeInput}
                });
                res.errCode = 0;
                res.data =  allcode;
                resolve(res);   
            }
            
        }catch(e){
            reject(e);
        }
    })
}


module.exports = {
    handleUserLogin: handleUserLogin,
    checkUserName: checkUserName,
    getAllUsers: getAllUsers,
    createNewUser: createNewUser,
    checkUserEmail: checkUserEmail,
    deleteUser: deleteUser,
    editUser: editUser,
    getCodeService: getCodeService,
}