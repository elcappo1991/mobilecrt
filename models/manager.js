module.exports = function(sequelize, DataTypes) {
    var manager = sequelize.define("managers", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
            unique: true
        },
        first_name: DataTypes.STRING,
        last_name: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.STRING,
        address : DataTypes.STRING,
        role:{type: DataTypes.ENUM, values: ['admin', 'manager'], defaultValue: 'manager', allowNull: false}
    }, {timestamps: true});

    return manager;
};