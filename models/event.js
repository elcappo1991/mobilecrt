module.exports = function(sequelize, DataTypes) {
    var event = sequelize.define("events", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
            unique: true
        },
        description: DataTypes.STRING,
        topic : DataTypes.STRING
    }, {timestamps: true});

    return event;
};