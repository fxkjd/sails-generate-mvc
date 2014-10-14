
var uuid = require('node-uuid')
  , fse = require('fs-extra')
  , tmpDirname = '../public/images/upload';


module.exports = {

  upload: function (req, fileName, cb) {
    var filename = uuid.v4()+".jpg"
      , subfolder = filename.substring(0, 2); 

    req.file(fileName).upload({ dirname: tmpDirname+'/'+subfolder, saveAs: filename }, function (err, files) {
      if (err) {
        cb(err, null);
      } else {
        var source = '.tmp/public/images/upload/'+subfolder+'/'+filename
          , target = 'assets/images/upload/'+subfolder+'/'+filename;
        if(files.length > 0) {
          fse.copy(source, target, function (err) {
            if (err) {
              cb(err, null);
            } else {
              var file = {
                filename: filename,
                parth: source
              };
              cb(null, file);
            }
          });
        } else {
          cb(null, null);
        }
      }      
    });
  },

  path: function (fileName) {
    path = "";
    if(fileName){
      var subfolder = fileName.substring(0, 2)
        , path = '/images/upload/'+subfolder+'/'+fileName;
                  
    }

    return path;
  }
}
