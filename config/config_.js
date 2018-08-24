let config = {
    db : {
        // host: '192.168.162.51',
        // port: '27017',   
        // schema: 'test',
        host:'192.168.82.227',
        port: '27017',        
        schema: 'cs',
        poolSize : 4,
        replset : [
        ]
    },
    fdfs : {
        // host: "192.168.162.51",
        // port : 22122,        
        host:"192.168.80.21",        
        port:45005,
        timeout : 10000
    },
    // linkUrl:'http://192.168.162.51/'
    linkUrl:'https://www.zhenyiqian.com/dfs/'
}
module.exports = config