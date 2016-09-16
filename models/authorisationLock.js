module.exports = function(sequelize, DataTypes) {
    var authorisationLock = sequelize.define("authorisationLocks", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
            unique: true
        }


    }, {timestamps: true});

    return authorisationLock;
};