import express from "express";
import homeController from "../controllers/homeController";
import userController from "../controllers/userController";
import newController from "../controllers/newController";
import tournamentController from "../controllers/tournamentController";
import clubController from "../controllers/clubController";
import playerController from "../controllers/playerController";
import matchesController from "../controllers/matchesController";
import countriesController from '../controllers/countriesController';
import orderController from '../controllers/orderController';
import productController from '../controllers/productController';
import commentController from '../controllers/commentController';




let router = express.Router();

let initWebRoutes = (app) =>{

    router.get('/', homeController.getHomePage);
    router.get('/about', homeController.getAbout);
    router.get('/add-crud', homeController.getCRUD);
    router.post('/post-crud', homeController.postCRUD);
    router.get('/get-crud', homeController.displayCRUD);
    router.get('/edit-crud', homeController.editCRUD);
    router.post('/put-crud', homeController.putCRUD);
    router.get('/delete-crud', homeController.deleteCRUD);

    //user
    router.post('/api/login', userController.handleLogin);
    router.get('/api/get-all-user', userController.handleAllUser);
    router.post('/api/create-new-user', userController.handleCreateNewUser);
    router.delete('/api/delete-user', userController.handleDeleteUser);
    router.put('/api/edit-user', userController.handleEditUser);
    
    router.get('/api/allcode', userController.getCode);

    
    
    //new
    router.get('/api/get-all-news', newController.handleAllNews);
    router.post('/api/create-new-news', newController.handleCreateNewNews);
    router.delete('/api/delete-news', newController.handleDeleteNews);
    router.put('/api/edit-news', newController.handleEditNews);

    router.get('/api/get-top-news', newController.handleTopNews);
    router.get('/api/get-all-news-wirte', newController.handleAllNewsWirte);
    router.post('/api/create-wirte-news', newController.handleCreateWirteNews);

        //--- lấy tin tức tổng hợp không liên quan đến các giải đấu, câu lạc bộ, cầu thủ
         router.get('/api/get-all-news-synthetic', newController.handleAllNewsSyn);
        //--- Lấy tin tức của giải đấu
        router.get('/api/get-news-tournaments', tournamentController.getNewsTournaments)
        //--- lấy tin tức liên quan đến clb
        router.get('/api/get-news-clubs', clubController.getNewsClubs)
         //--- lấy tin tức liên quan đến cầu thủ
         router.get('/api/get-news-players', playerController.getNewsPlayers)
         //--- phan trang tin tuc
         router.get('/api/get-news-for-page', newController.getNewsForPage)

    //tournaments
    router.get('/api/get-all-tournaments', tournamentController.handleAllTournaments);
    router.post('/api/create-new-tournaments', tournamentController.handleCreateNewTournament);
    router.delete('/api/delete-tournaments', tournamentController.handleDeleteTournaments);
    router.put('/api/edit-tournaments', tournamentController.handleEditTournaments);

        // lấy ra thông tin chi tiết các giải đấu có cả quốc gia và logo clb
        router.get('/api/get-detail-all-tournaments', tournamentController.handleDetailAllTournaments);
        //--- phan trang giai dau
        router.get('/api/get-tournament-for-page', tournamentController.getTournamentForPage)
            
    //clubs
    
    router.get('/api/get-all-clubs', clubController.handleAllClubs);
    router.post('/api/create-new-clubs', clubController.handleCreateNewClubs);
    router.delete('/api/delete-clubs', clubController.handleDeleteClubs);
    router.put('/api/edit-clubs', clubController.handleEditClubs);

         // lấy ra thông tin chi tiết các giải đấu có cả quốc gia và logo clb
         router.get('/api/get-detail-all-clubs', clubController.handleDetailAllClubs);
         //--- phan trang clb
        router.get('/api/get-club-for-page', clubController.getClubForPage)

    //player
    router.get('/api/get-all-players', playerController.handleAllPlayers);
    router.post('/api/create-new-players', playerController.handleCreateNewPlayers);
    router.delete('/api/delete-players', playerController.handleDeletePlayers);
    router.put('/api/edit-players', playerController.handleEditPlayers);

        // lấy thông tin cầu thủ
        router.get('/api/get-detail-all-players', playerController.handleDetailAllPlayers);
        // lấy nội dung thông tin chi tiết của cầu thủ
        router.get('/api/get-info-player', playerController.getInfoPlayer)
        // viết nội dung thông tin chi tiết của cầu thủ
        router.post('/api/create-wirte-info-player', playerController.handleCreateWirteInfoPlayer);
        //--- phan trang cau thu
        router.get('/api/get-players-for-page', playerController.getPlayersForPage)


    //matches
    router.get('/api/get-all-matches', matchesController.handleAllMatches);
    router.post('/api/create-new-matches', matchesController.handleCreateNewMatches);
    router.delete('/api/delete-matches', matchesController.handleDeleteMatches);
    router.put('/api/edit-matches', matchesController.handleEditMatches);

        // lấy lịch thi đấu: các trận đấu đang diễn ra và sắp diễn ra 
        router.get('/api/get-all-matches-schedule', matchesController.handleAllMatchesSchedule);
        // lấy kết quả trận đấu: các trận đấu đã kết thúc
        router.get('/api/get-all-matches-result', matchesController.handleAllMatchesResult);
         //--- phan trang quan ly tran dau
        router.get('/api/get-matches-for-page', matchesController.getMatchesForPage)
         //--- phan trang lich thi dau phia nguoi dung
         router.get('/api/get-matches-for-page-user', matchesController.getMatchesForPageUser)
         //--- phan trang ket qua tran dau phia nguoi dung
         router.get('/api/get-result-for-page-user', matchesController.getResultForPageUser)

    // lay noi dung tin cho tin
    router.get('/api/get-content-news', newController.getContentNews)

   

    // countries
  
    router.get('/api/get-all-countries', countriesController.handleAllCountries);
    router.post('/api/create-new-countries', countriesController.handleCreateNewCountries);
    router.delete('/api/delete-countries', countriesController.handleDeleteCountries);
    router.put('/api/edit-countries', countriesController.handleEditCountries);

     //--- phan trang quoc gia
     router.get('/api/get-countries-for-page', countriesController.getCountriesForPage)

    // product
    router.get('/api/get-all-product', productController.handleAllProducts);
    router.post('/api/create-new-product', productController.handleCreateNewProducts);
    router.delete('/api/delete-product', productController.handleDeleteProducts);
    router.put('/api/edit-product', productController.handleEditProducts);
    
    //--- phan trang san pham
    router.get('/api/get-products-for-page', productController.getProductsForPage)   

    // order
    router.get('/api/get-all-order', orderController.handleAllOrders);
    router.post('/api/create-new-order', orderController.handleCreateNewOrders);
    router.delete('/api/delete-order', orderController.handleDeleteOrders);
    router.put('/api/edit-order', orderController.handleEditOrders);

      //--- phan trang don hang
      router.get('/api/get-orders-for-page', orderController.getOrdersForPage)

    router.get('/trang-chu', (req, res)=> {
        return res.send('T');
    });

    //comments
    router.get('/api/get-all-comments', commentController.handleAllComments);
    router.post('/api/create-new-comments', commentController.handleCreateNewComments);
    router.delete('/api/delete-comments', commentController.handleDeleteComments);
    router.put('/api/edit-comments', commentController.handleEditComments);

    return app.use("/", router);


}

module.exports = initWebRoutes;
