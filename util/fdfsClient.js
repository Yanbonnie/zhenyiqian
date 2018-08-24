const FdfsClient = require("fdfs")
const config = require('../config/config').fdfs

let fdfs = new FdfsClient({
    // tracker servers 
    trackers: [
        {
            host: config.host,
            port: config.port
        }
    ],
    // 默认超时时间10s 
    timeout: config.timeout,
    // 默认后缀 
    // 当获取不到文件后缀时使用 
    defaultExt: '',
    // charset默认utf8 
    charset: 'utf8'
});

module.exports = fdfs