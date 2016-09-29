module.exports = function(sequelize, DataTypes) {
    var roomOption = sequelize.define("roomOptions", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
            unique: true
        }


    }, {timestamps: true});

    return roomOption;
};