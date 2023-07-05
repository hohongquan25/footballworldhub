import countriesService from "../services/countriesService";
// lay thong tin clb
let handleAllCountries = async (req, res) => {

    let id = req.query.id; //ALL, SINGER
    if(!id){
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Missing required parameters',
            countries: []
        })
    }
    let countries = await countriesService.getAllCountries(id);
    console.log(countries)
    return res.status(200).json({
        errCode: 0,
        errMessage: 'Oke',
        countries
    })
}

//phan trang quoc gia
let getCountriesForPage = async (req, res) => {
    let {page,perPage} = req.query;
    
    
    try{
        let countries = await countriesService.getCountriesForPageService(+page, +perPage);
        return res.status(200).json(countries)
    }catch(e){
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: "Error from server.."
        })
    }
}


// them clb
let handleCreateNewCountries = async (req, res) => {
    let message = await countriesService.createNewCountries(req.body);
    return res.status(200).json(message); 
}

// xoa clb
let handleDeleteCountries = async (req, res) =>{
    if (!req.body.id){
        return res.status(200).json({
            errCode: 1,
            errMessage: "Missing required parameters!"
        })
    }
    else{
        let message = await countriesService.deleteCountries(req.body.id);
        return res.status(200).json(message);
        }
}
// sua clb
let handleEditCountries = async (req, res) =>{
    console.log(req.body.id);
    let data = req.body;
    let message = await countriesService.editCountries(data);
    return res.status(200).json(message);
    
}
module.exports = {
    handleAllCountries: handleAllCountries,
    handleCreateNewCountries: handleCreateNewCountries,
    handleDeleteCountries: handleDeleteCountries,
    handleEditCountries: handleEditCountries,
    getCountriesForPage: getCountriesForPage,
}

