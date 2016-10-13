module.exports = function(sequelize, DataTypes) {
    var companion = sequelize.define("companions", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
            unique: true
        },
        id_account :DataTypes.INTEGER,
        id_companion : DataTypes.INTEGER,
        room: DataTypes.INTEGER,
        reservation_id : DataTypes.INTEGER

    }, {timestamps: true});

    return companion;
};