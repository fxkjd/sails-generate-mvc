/**
 * <%=nameC%>Controller
 *
 * @description :: Server-side logic for managing <%=name%>
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	
  'add': function(req,res){
    res.view();    
  },

  create: function(req, res) {

    var paramObj = {
    }

    // Create a <%=nameC%> with the params sent from 
    // the sign-up form --> new.ejs
    <%=nameC%>.create(paramObj, function (err, <%=name%>) {

      if (err) {
        console.log(err);
        //TODO add error management
        req.session.flash = {
          err: err
        }
        return res.redirect('/<%=name%>/new');
      } else {
        res.redirect('/<%=name%>/show/' + <%=name%>.id);
      }
    });
  },

  show: function(req, res, next) {
    <%=nameC%>.findOne(req.param('id'), function (err, <%=name%>) {
      if (err) {
        return next(err);
      } else {
        if (!<%=name%>) {
          return res.notFound();
        } else {

          res.view({
            <%=name%>: <%=name%>
          });
        }
      }
    });
  },

  index: function(req, res, next) {
    <%=nameC%>.find(function (err, <%=namePlural%>) {
      if (err) {
        return next(err);
      } else {        
        res.view({
          <%=namePlural%>: <%=namePlural%>
        });
      }
    });
  },

  edit: function(req, res, next) {

    <%=nameC%>.findOne(req.param('id'), function (err, <%=name%>) {
      if (err) {
        return next(err);
      } else {
        if (!<%=name%>) {
          return res.notFound();
        } else {
          res.view({
            <%=name%>: <%=name%>
          });
        }
      }
    });
  },

  update: function(req, res, next) {

    var paramObj = {

    }

    <%=nameC%>.update(req.param('id'), paramObj, function (err) {
      if (err) {
        //TODO add error management
        console.log(err);

        req.session.flash = {
          err: err
        }
        return res.redirect('/<%=name%>/edit/' + req.param('id'));
      } else {

        res.redirect('/<%=name%>/show/' + req.param('id'));

      }
    });
  },

  destroy: function(req, res, next) {

    <%=nameC%>.findOne(req.param('id'), function (err, <%=name%>) {
      if (err) {
        return next(err);
      } else {
        if (!<%=name%>) {
          return res.notFound();
        } else {
          <%=nameC%>.destroy(req.param('id'), function (err) {
            if (err) {
              return next(err);
            } else {
              res.redirect('/<%=name%>');
            }
          });        
        }
      }
    });
  }
 

};

