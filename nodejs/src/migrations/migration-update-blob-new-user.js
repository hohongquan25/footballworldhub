module.exports = {
    up: (queryInterface, Sequelize) => {
        return Promise.all([
            queryInterface.changeColumn('Comments', 'commentContent', {
                type: Sequelize.TEXT,
                allowNull: true,
            })
        ])
    },

    down: (queryInterface, Sequelize) => {
        return Promise.all([
            queryInterface.changeColumn('Comments', 'commentContent', {
                type: Sequelize.TEXT,
                allowNull: true,
            })
        ])
    }
};