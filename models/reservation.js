module.exports = function(sequelize, DataTypes) {
    var reservation = sequelize.define("reservations", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
            unique: true
        },
        ref : DataTypes.STRING,
        start_date: DataTypes.DATE,
        end_date: DataTypes.DATE,
        type_room:DataTypes.STRING,
        option_room:DataTypes.STRING,

        confirm :{
            type:DataTypes.BOOLEAN,
            defaultValue: false
        } ,
        room_number :DataTypes.INTEGER,
        lock_id : DataTypes.INTEGER
    }, {timestamps: true});

    return reservation;
};