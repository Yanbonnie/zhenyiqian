let config = {
    db : {
        /*开发*/
        host: '192.168.162.51',
        port: '27017',   
        schema: 'test',
        /*生产*/
        // host:'192.168.82.227',
        // port: '27017',        
        // schema: 'cs',
        poolSize : 4,
        replset : [
        ]
    },
    fdfs : {
        /*开发*/
        host: "192.168.162.51",
        port : 22122,  
        /*生产*/      
        // host:"192.168.80.21",        
        // port:45005,
        timeout : 10000
    },
    /*开发*/
    linkUrl:'http://192.168.162.51/'
    /*生产*/
    // linkUrl:'http://www.zhenyiqian.com/dfs/'
}

module.exports = config