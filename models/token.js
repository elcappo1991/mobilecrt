module.exports = function(sequelize, DataTypes) {
    var token = sequelize.define("tokens", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
            unique: true
        },
        validation_date:DataTypes.DATE
    }, {timestamps: true});

    return token;
};