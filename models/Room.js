module.exports = function(sequelize, DataTypes) {
    var room = sequelize.define("rooms", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
            unique: true
        },

        type:DataTypes.STRING,
        description : DataTypes.STRING,
        bed_number :DataTypes.INTEGER,
        lock_id : DataTypes.INTEGER
    }, {timestamps: true});

    return room;
};