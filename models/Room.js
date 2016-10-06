module.exports = function(sequelize, DataTypes) {
    var room = sequelize.define("rooms", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
            unique: true
        },


        description : DataTypes.STRING,
        room_number : DataTypes.STRING,
        bed_number :DataTypes.INTEGER,
        lock_id : DataTypes.INTEGER,
       disponibility:{
            type: DataTypes.BOOLEAN,
            defaultValue: true
        },
        picture_url: DataTypes.STRING
    }, {timestamps: true});

    return room;
};