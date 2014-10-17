
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
    async.series({<%for(var i in attributesI18N){%><%for(var j in languages){%>
        <%=attributesI18N[i].name%><%=languages[j]%>: function(callback){
          local.findLocal('<%=languages[j]%>', <%=name%>.<%=attributesI18N[i].name%>, function (err, localText) {          
            callback(err, localText);              
          });
        },<%}}%>
    },
    function(err, results) {
      cb(err,_.assign(<%=name%>,results));
    });
  },

  /**
   * Function that creates <%=name%> localitzations 
   * @Params:: req - http request
   *           <%=name%> - <%=name%> to be localitzated
   */

  create: function (req, <%=name%>, cb) {
    async.series([<%for(var i in attributesI18N){%><%for(var j in languages){%>
        function(callback){
          if (req.param('<%=attributesI18N[i].name%><%=languages[j]%>')) {
            local.createLocal(req.param('<%=attributesI18N[i].name%><%=languages[j]%>'), '<%=languages[j]%>', <%=name%>.<%=attributesI18N[i].name%>, function (err, localText) {          
              callback(err, localText);              
            });
          } else {
            callback(null, null);
          }
        },<%}}%>      
      ],
    // callback
    function(err, results){
        cb(err, results);
    });  
  },


  /**
   * Function that updates <%=name%> localitzations 
   * @Params:: req - http request
   *           <%=name%> - <%=name%> to be localitzated
   */

  update: function (req, <%=name%>, cb) {
    async.series([<%for(var i in attributesI18N){%><%for(var j in languages){%>
        function(callback){
          if (req.param('<%=attributesI18N[i].name%><%=languages[j]%>') != null) {
            local.updateLocal(req.param('<%=attributesI18N[i].name%><%=languages[j]%>'), '<%=languages[j]%>', <%=name%>.<%=attributesI18N[i].name%>, function (err, localText) {          
              callback(err, localText);              
            });
          } else {
            callback(null, null);
          }
        },<%}}%>   
      ],
    // optional callback
    function(err, results){
        cb(err, results);
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
