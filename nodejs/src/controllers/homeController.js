import { render } from "ejs";
import db from "../models/index";
import CRUDservice from "../services/CRUDservice";
let getHomePage = async (req,res) =>{
    try{
        let data = await db.Comments.findAll();
        return res.render('homepage.ejs',{
            data: JSON.stringify(data)
        });
        
    }catch (e) {
        console.log(e);
    } 
}

let getAbout =  (req,res) => {
    return res.render('about/about.ejs');
}

let getCRUD = (req, res) => {
    return res.render('addCRUD.ejs');
}

let postCRUD = async (req, res) => {
    let message =  await CRUDservice.createNewUser(req.body);
    console.log(message);
    return res.send('them thanh cong');
}

let displayCRUD = async (req, res) => {
    let data = await CRUDservice.getAllUser();
    console.log(data);
    return res.render('displayCRUD.ejs', {
        dataTable: data,
    });
}

let editCRUD = async (req, res) => {

    let userId = req.query.id;
    if(userId){
        let userData = await CRUDservice.getUserInfoById(userId);
        return res.render('editCRUD.ejs', {
            userDt: userData,
        });
    }
    else{
        return res.send('ngu');
    }
   
}

let putCRUD = async (req,res) => {
    let data = req.body;
    let allUsers = await CRUDservice.updateUserData(data);
    
    return res.render('displayCRUD.ejs',{
        dataTable: allUsers,
    });
}

let deleteCRUD = async (req, res) =>{
    let id = req.query.id;
    if(id){
        await CRUDservice.deleteUserById(id);
        return res.send('xoa thanh cong');
    }else{
        return res.send('khong co du lieu');
    }
    
    
}

module.exports = {
    getHomePage: getHomePage,
    getAbout: getAbout,
    getCRUD: getCRUD,
    postCRUD: postCRUD,
    displayCRUD: displayCRUD,
    editCRUD: editCRUD,
    putCRUD: putCRUD,
    deleteCRUD: deleteCRUD,
}