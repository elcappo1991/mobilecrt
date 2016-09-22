module.exports = function(sequelize, DataTypes) {
    var feedback = sequelize.define("feedbacks", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
            unique: true
        },
        note: DataTypes.INTEGER,
        description: DataTypes.STRING,
        topic : DataTypes.STRING
    }, {timestamps: true});

    return feedback;
};