module.exports = function(sequelize, DataTypes) {
    var account = sequelize.define("accounts", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
            unique: true
        },
        facebook_id:DataTypes.BIGINT,
        gmail_id:DataTypes.BIGINT,
        first_name: DataTypes.STRING,
        last_name: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.STRING,
        address : DataTypes.STRING,
        code_postal: DataTypes.INTEGER,
        city : DataTypes.STRING,
        country : DataTypes.STRING,
        phone : DataTypes.STRING,
        app_info : DataTypes.STRING,
        locale : DataTypes.STRING,
        mobile_id: DataTypes.STRING,
        checkin_date: DataTypes.DATE,
        checkout_date: DataTypes.DATE,
        checkin: DataTypes.BOOLEAN,
        is_mobile_user: DataTypes.BOOLEAN,
        is_card_user: DataTypes.BOOLEAN,
        checkout: DataTypes.BOOLEAN

    }, {timestamps: true});

    return account;
};