/**
 * <%=nameC%>Controller
 *
 * @description :: Server-side logic for managing <%=name%>
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var sample = {<% for(var i in attributes) { %>
  <%=attributes[i].name%> : ''<%if(i < attributes.length - 1 ){%>,<%}%><% } %>
};

var _does<%=nameC%>Exists = function (req, res, cb) {
  <%=nameC%>.findOne(req.param('id'), function (err, <%=name%>) {
    if (err) {
      res.serverError();      
    } else {
      if (!<%=name%>) {
        res.notFound();
      } else {
        cb(<%=name%>);
      }
    }
  });
}

module.exports = {
	
  add: function(req,res){   
    var paramObj = req.flash('paramObj')
      , obj = (paramObj[0]) ? paramObj[0] : {}; 

    res.view({
      <%=name%>: _.defaults(obj, sample)
    });    
  },

  create: function(req, res) {

    var paramObj = {<% for(var i in attributesNOI18N) { %>
        <%=attributesNOI18N[i].name%> : req.param('<%=attributesNOI18N[i].name%>')<%if(i < attributesNOI18N.length - 1 ){%>,<%}%><% } %>
    }

    // Create a <%=nameC%> with the params sent from 
    // the form --> add.ejs
    <%=nameC%>.create(paramObj, function (err, <%=name%>) {

      if (err) {
        sails.log.error("<%=nameC%>Controller#create error");
        sails.log.error(err);

        if(err.ValidationError){

          error_object = validator(<%=nameC%>, err.ValidationError);

          req.flash('error', error_object);

          req.flash('paramObj', req.allParams());

          res.redirect('/<%=name%>/add');

        } else {
          res.serverError();      
        }

      } else {<%if(hasI18N){%>
        <%=localFilename%>.create(req, <%=name%>, function (err, locals) {
          if (err) {
            sails.log.error("<%=nameC%>Controller#create error");
            sails.log.error(err);
            res.serverError();
          } else {
            res.redirect('/<%=name%>/show/' + <%=name%>.id);
          }    
        });<%} else {%>
        res.redirect('/<%=name%>/show/' + <%=name%>.id);<%}%>
      }
    });
  },

  show: function(req, res, next) {
    _does<%=nameC%>Exists(req, res, function (<%=name%>) {
      <%if(hasI18N){%><%=localFilename%>.findOne(req.getLocale(), <%=name%>, function (err, localized) {
        if (err) {
          sails.log.error("<%=nameC%>Controller#show error");        
          sails.log.error(err);
          res.serverError();
        } else {
          res.view({
            <%=name%>: localized
          });
        }    
      });<%} else {%>
      res.view({
        <%=name%>: <%=name%>
      });<%}%>
    });
  },

  index: function(req, res, next) {
    <%=nameC%>.find(function (err, <%=namePlural%>) {
      if (err) {
        sails.log.error("<%=nameC%>Controller#index error");        
        sails.log.error(err);
        res.serverError();
      } else {<%if(hasI18N){%>        
        async.map(<%=namePlural%>,
          function(<%=name%>,cb){
            <%=localFilename%>.findOne(req.getLocale(), <%=name%>, function (err, local) {
                cb(err, local);
            });        
          },
          // callback
          function(err, localized){
            if (err) {
              sails.log.error("<%=nameC%>Controller#index error");        
              sails.log.error(err);
              res.serverError();
            } else {
              res.view({
                <%=namePlural%>: localized
              });
            }
        });  
      <%} else {%>  
        res.view({
          <%=namePlural%>: <%=namePlural%>
        });<%}%>
      }
    });
  },

  edit: function(req, res, next) {

    _does<%=nameC%>Exists(req, res, function (<%=name%>) {
      <%if(hasI18N){%><%=localFilename%>.find(<%=name%>, function (err, localized) {
        if (err) {
          sails.log.error("<%=nameC%>Controller#edit error");        
          sails.log.error(err);
          res.serverError();
        } else {
          var paramObj = req.flash('paramObj')
            , obj = (paramObj[0]) ? paramObj[0] : {};

          res.view({
            <%=name%>: _.defaults(obj, localized)
          });
        }    
      });<%} else {%>
      var paramObj = req.flash('paramObj')
        , obj = (paramObj[0]) ? paramObj[0] : {};

      res.view({
        <%=name%>: _.defaults(obj, <%=name%>)
      });<%}%>      
    });
  },

  update: function(req, res, next) {

    var paramObj = {<% for(var i in attributesNOI18N) { %>
        <%=attributesNOI18N[i].name%> : req.param('<%=attributesNOI18N[i].name%>')<%if(i < attributesNOI18N.length - 1 ){%>,<%}%><% } %>
    }

    <%=nameC%>.update(req.param('id'), paramObj, function (err,<%=name%>) {
      if (err) {
        sails.log.error("<%=nameC%>Controller#update error");        
        sails.log.error(err);

        if(err.ValidationError){

          error_object = validator(<%=nameC%>, err.ValidationError);

          req.flash('error', error_object);

          req.flash('paramObj', req.allParams());

          res.redirect('/<%=name%>/edit/' + req.param('id'));

        } else {
          res.serverError();
        }

      } else {<%if(hasI18N){%>
        <%=localFilename%>.update(req, <%=name%>[0], function (err, localized) {
          if (err) {
            sails.log.error("<%=nameC%>Controller#update error");        
            sails.log.error(err);
            res.serverError();
          } else {
            res.redirect('/<%=name%>/show/' + req.param('id'));
          }    
        });<%} else {%>
          res.redirect('/<%=name%>/show/' + req.param('id'));<%}%>
      }
    });
  },

  destroy: function(req, res, next) {

    _does<%=nameC%>Exists(req, res, function (<%=name%>) {
      <%if(hasI18N){%><%=nameC%>.destroy(req.param('id'), function (err) {
        if (err) {
          sails.log.error("<%=nameC%>Controller#destroy error");        
          res.serverError();
        } else {
          <%=localFilename%>.delete(<%=name%>, function (err, deleted) {
            if (err) {
              sails.log.error("<%=nameC%>Controller#destroy error");        
              res.serverError();
            } else {
              res.redirect('/<%=name%>');
            }
          });
        }
      });<%} else {%>
      <%=nameC%>.destroy(req.param('id'), function (err) {
        if (err) {
          sails.log.error("<%=nameC%>Controller#destroy error");        
          res.serverError();
        } else {
          res.redirect('/<%=name%>');
        }
      });<%}%>
    });
  } 

};

