const mongoose = require('mongoose')
const config = require('../config/config').db
const M = require('../util/m')
mongoose.Promise = global.Promise;

let dbUtil = {
    async get() {
        let db = await mongoose.createConnection(`mongodb://${config.host}:${config.port}/${config.schema}?poolSize=${config.poolSize}`, {useMongoClient : true})
        return db
    },
    async close([db, result]){
        db.close()
        return result
    }
}

let execute = function(...funs){
    let args = [dbUtil.get, ...funs, dbUtil.close]
    let exec = M.pipeline(...args);
    return exec.call(this, null)
}

module.exports = execute
