import userService from "../services/userService";

let handleLogin = async (req, res) => {
    let username = req.body.username;
    let password = req.body.password;
    if(!username || !password){
        return res.status(500).json({
            errCode: 1,
            message: 'Missing inputs parameter!'
        })
    }
     
    let userData = await userService.handleUserLogin(username, password);
    // check username
    // so sanh password
    // return userinfo
    return res.status(200).json({
    
        errCode: userData.errCode,
        message: userData.errMessage,
        user: userData.user ? userData.user : {}
       
    });
}

let handleAllUser = async (req, res) => {

    let id = req.query.id; //ALL, SINGER
    if(!id){
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Missing required parameters',
            users: []
        })
    }
    let users = await userService.getAllUsers(id);
    console.log(users)
    return res.status(200).json({
        errCode: 0,
        errMessage: 'Oke',
        users
    })
}

let handleCreateNewUser = async (req, res) => {
    let message = await userService.createNewUser(req.body);
    return res.status(200).json(message); 
}

let handleEditUser = async (req, res) =>{
    console.log(req.body.id);
    let data = req.body;
    let message = await userService.editUser(data);
    return res.status(200).json(message);
    
}
    

let handleDeleteUser = async (req, res) =>{
    if (!req.body.id){
        return res.status(200).json({
            errCode: 1,
            errMessage: "Missing required parameters!"
        })
    }
    else{
        let message = await userService.deleteUser(req.body.id);
        return res.status(200).json(message);
        }
}

let getCode = async (req, res) =>{
    try{
        let data = await userService.getCodeService(req.query.Type);
      
        return res.status(200).json(data)
    }catch(e){
        console.log('Get all code error:', e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from sever'
        })
        
    }

}

module.exports = {
    handleLogin: handleLogin,
    handleAllUser: handleAllUser,
    handleCreateNewUser: handleCreateNewUser,
    handleDeleteUser: handleDeleteUser,
    handleEditUser: handleEditUser,
    getCode: getCode,

}