module.exports = function(sequelize, DataTypes) {
    var roomType = sequelize.define("roomTypes", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
            unique: true
        },

        type:DataTypes.STRING,
        description : DataTypes.STRING,
        picture_url: DataTypes.STRING


    }, {timestamps: true});

    return roomType;
};