module.exports = function(sequelize, DataTypes) {
    var authorisation = sequelize.define("autorisations", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
            unique: true
        },
        name : DataTypes.STRING,
        dateValidation: DataTypes.DATE,
        startHour: DataTypes.TIME,
        endHour: DataTypes.TIME,
        description : DataTypes.STRING
    }, {timestamps: true});

    return authorisation;
};