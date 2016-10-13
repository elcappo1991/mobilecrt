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


        checkin_date: DataTypes.DATE,
        checkout_date: DataTypes.DATE,
        checkin: {type:DataTypes.BOOLEAN, defaultValue: false},
        checkout:{type:DataTypes.BOOLEAN, defaultValue: false},
        companion_nb :DataTypes.INTEGER,
        room_nb :DataTypes.INTEGER,
        reservation_option: DataTypes.STRING,
        hotel_id : DataTypes.INTEGER
    }, {timestamps: true});

    return reservation;
};