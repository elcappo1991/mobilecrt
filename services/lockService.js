
var models=require('./../models');
var config = require('./../config/dbconfig.json');




/**
 * add lock is a function that add a lock
 * to the database
 * @param req
 * @param res
 *
 */
var addLock=function(lock){

    models.lock.create(lock).then(function(){});
};

/**
 * this function delete a lock and take in parameter his id
 * @param data
 */
var deleteLock=function(idLock,cb){

    models.lock.findOne({where:{id:idLock}}).then(function(lock) {

        cb(lock.destroy());
    });
};
/**
 * function that updates   a lock
 * @param idLock
 * @param lock
 */
var updateLock=function(idLock,lock){

    models.lock.findOne({where:{id:idLock}}).then(function(lockToUpdate){

        lockToUpdate.update(lock);
    });

}

/**
 * function that return all locks
 * @param cb
 */
var getAllLock=function(cb){

    models.lock.findAll().then(function(rows){
        return cb(rows);
    })
}


/**
 * function that return a lock by their id
 * @param idManager
 */
var getLockById=function(idLock,cb){

    models.manager.findOne({where:{id: idLock}}).then(function(lockfound){

        return cb(lockfound);
    })

}
exports.deleteLock=deleteLock;
exports.addLock=addLock;
exports.updateLock=updateLock;
exports.getAllLock=getAllLock;
exports.getLockById=getLockById;


