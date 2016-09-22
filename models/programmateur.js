module.exports = function(sequelize, DataTypes) {
    var programmateur = sequelize.define("programmateurs", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
            unique: true
        },
        programateur_id: DataTypes.INTEGER,
        description: DataTypes.STRING,
        adress_ip: DataTypes.STRING,
        topic : DataTypes.STRING
    }, {timestamps: true});

    return programmateur;
};