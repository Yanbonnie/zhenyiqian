const fdfs = require("./fdfsClient")
const path = require('path')


function FdfsStorage(opts){
  this.opts = opts;
  this.bufferList = []
}

FdfsStorage.prototype._handleFile = function(req, file, cb) {
  let ext = path.extname(file.originalname)
  if(ext) ext = ext.substring(1)

  let that = this
  //
  file.stream.on('data', chunck => {
    this.bufferList.push(chunck)
  })

  file.stream.on('end', function(){
    fdfs.upload(Buffer.concat(that.bufferList), {ext}).then(function(fileId) {
        // fileId 为 group + '/' + filename 
        that.bufferList = []
        cb(null, {
          fileId: fileId
        })
    }).catch(function(err) {
        cb(null, err)
    });  
  })

}

FdfsStorage.prototype._removeFile = function(req, file, cb) {
    fdfs.del(file.filename, cb);
};

module.exports = function (opts) {
  return new FdfsStorage(opts)
}