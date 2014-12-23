
var locales = sails.config.i18n.locales;

module.exports = {

  /**
   * Function that retrieves <%=name%> localitzations given a language
   * @Params:: lang - <%=name%> lang
   *           <%=name%> - <%=name%> to be localitzated
   */

  findOne: function (lang, <%=name%>, cb) {
    async.map([<%for(var i in attributesI18N){%><%=name%>.<%=attributesI18N[i].name%><%if(i < attributesI18N.length - 1 ){%>,<%}%><%}%>],
      function(val,callback){
        local.loadLocal(lang, val, function (err, local) {
          if (err) {
            callback(err, null);
          } else {
            callback(null, local);
          }
        });        
      },
      // callback
      function(err, locals){
        if (err) {
          cb(err, null);
        } else {<%for(var i in attributesI18N){%>
          <%=name%>.<%=attributesI18N[i].name%> = locals[<%=i%>];<%}%>
          cb(null, <%=name%>);
        }
    });
  },

  /**
   * Function that retrieves <%=name%> localitzations 
   * @Params:: <%=name%> - <%=name%> to be localitzated
   */

  find: function (<%=name%>, cb) {
    async.each(locales, function( lang, callback) {
      async.each([<%for(var i in attributesI18N){%>"<%=attributesI18N[i].name%>"<%if(i < attributesI18N.length - 1 ){%>,<%}%><%}%>], function( attr, callback) {
          local.findLocal(lang, <%=name%>[attr], function (err, localText) {          
            <%=name%>[attr+lang] = localText;
            callback(err);              
          });
      }, callback);       
    }, function(err){
      cb(err,<%=name%>);
    }); 
  },

  /**
   * Function that creates <%=name%> localitzations 
   * @Params:: req - http request
   *           <%=name%> - <%=name%> to be localitzated
   */

  create: function (req, <%=name%>, cb) {
    async.each(locales, function( lang, callback) {
      async.each([<%for(var i in attributesI18N){%>"<%=attributesI18N[i].name%>"<%if(i < attributesI18N.length - 1 ){%>,<%}%><%}%>], function( attr, callback) {
        var param = attr+lang;
        if (req.param(param)) {
          local.createLocal(req.param(param), lang, <%=name%>[attr], function (err, localText) {          
            callback(err);              
          });
        } else {
          callback(null);
        }
      }, callback);       
    }, function(err){
      cb(err,null);
    });     
  },


  /**
   * Function that updates <%=name%> localitzations 
   * @Params:: req - http request
   *           <%=name%> - <%=name%> to be localitzated
   */

  update: function (req, <%=name%>, cb) {
    async.each(locales, function( lang, callback) {
      async.each([<%for(var i in attributesI18N){%>"<%=attributesI18N[i].name%>"<%if(i < attributesI18N.length - 1 ){%>,<%}%><%}%>], function( attr, callback) {
        var param = attr+lang;
        if (req.param(param)) {
          local.updateLocal(req.param(param), lang, <%=name%>[attr], function (err, localText) {          
            callback(err);              
          });
        } else {
          callback(null);
        }
      }, callback);       
    }, function(err){
      cb(err,null);
    });
  },


  /**
   * Function that deletes <%=name%> localitzations 
   * @Params:: <%=name%> - <%=name%> localitzations to be deleted
   */

  delete: function (<%=name%>, cb) {
    async.series([<%for(var i in attributesI18N){%>
        function(callback){
          Content.destroy({parent:<%=name%>.<%=attributesI18N[i].name%>},function(err){
            callback(err,null);
          });
        },<%}%>   
      ],
    // optional callback
    function(err, results){
        cb(err, results);
    });
  }
}
