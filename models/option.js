module.exports = function(sequelize, DataTypes) {
    var option = sequelize.define("options", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
            unique: true
        },

        description : DataTypes.STRING


    }, {timestamps: true});

    return option;
};