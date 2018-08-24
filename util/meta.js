let meta = function(data, paging = null, code = 0,msg = 'success'){
    let r =  {code, msg}
    if( Array.isArray(data) ){
        r.data = data
    }else if(typeof data === 'object'){
        for(let [k,v] of Object.entries(data)){
            r[k] = v
        }
    }
    if(paging){
        for(let [k,v] of Object.entries(paging)){
            r[k] = v
        }
    }
    return r
}

module.exports = meta