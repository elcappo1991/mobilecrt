module.exports = function(sequelize, DataTypes) {
    var hotel = sequelize.define("hotels", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
            unique: true
        },

        name: DataTypes.STRING,
        description : DataTypes.STRING,
        capacity :DataTypes.INTEGER,

        location: DataTypes.STRING,
        longitude : DataTypes.FLOAT,
        latitude : DataTypes.FLOAT,
        owner_id: DataTypes.INTEGER,

        picture_url: DataTypes.STRING
    }, {timestamps: true});

    return hotel;
};