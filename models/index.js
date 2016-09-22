var Sequelize = require('sequelize');
dbConfig = require('../config/dbconfig.json');

var conString = dbConfig.App.dbConfig.conString;

/**
 * to establish connection between  the server and the dataabase in this case
 * postgres we have to add the connection string to the sequelize instance
 * @type {Sequelize}
 */
var sequelize = new Sequelize(conString);

/**
 * type all  the table name (models) to have access on it after
 * @type {string[]}
 */
var models = [
    'manager',
    'room',
    'token',
    'account',
    'authorisation',
    'authorisationLock',
    'reservation',
    'event',
    'companion',
    'feedback',
    'programmateur'

];
/**
 * import model configuration
 */
models.forEach(function(model) {
    module.exports[model] = sequelize.import(__dirname + '/' + model);
});

/**
 * orm specification for the relation between tables
 * hasMany for one to many relatiuon
 * Belongsto fo one to one relation
 * HasOne for one to one relation
 * belongstoMany for many to many relation
 */
(function(m) {

    m.account.belongsTo(m.manager);
    m.token.belongsTo(m.account);
    m.token.belongsTo(m.room);
    m.room.belongsTo(m.manager);
    m.authorisation.belongsTo(m.manager);
    m.authorisation.belongsTo(m.token);
    m.authorisationLock.belongsTo(m.authorisation);
    m.authorisationLock.belongsTo(m.room);
    m.feedback.belongsTo(m.account);
    m.feedback.belongsTo(m.reservation);
    m.reservation.belongsTo(m.account);
    m.programmateur.belongsTo(m.manager);
    m.event.belongsTo(m.room);
    m.room.belongsTo(m.reservation);
   /* m.programmateur.belongsTo(m.user);
    m.hall.belongsTo(m.residence);
    m.garage.hasMany(m.equipement);
    m.hall.hasMany(m.equipement);
    m.centrale.belongsTo(m.residence);
    m.centrale.hasMany(m.evenement);
    m.appartement.belongsTo(m.user);
    m.user.hasMany(m.reclamation);
    m.notification.belongsTo(m.user);
    m.garage.belongsTo(m.residence);
    m.equipement.belongsTo(m.centrale);
    m.badge.belongsTo(m.user);
    m.residence.belongsTo(m.user);
    m.droitAcces.belongsToMany(m.badge, { through: 'droitAccesBadges' });
    m.droitAcces.belongsTo(m.residence);
    m.droitAcces.belongsToMany(m.equipement, { through: 'droitAccesEquipement' } );
    m.equipement.belongsTo(m.equipementSystem);


*/
})(module.exports);

/**
 * export the sequelize module
 * @type {Sequelize}
 */
module.exports.sequelize = sequelize;