/**
 * local.js
 *
 * @description :: Server-side logic for managing localitzation files
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
var defaultLang = sails.config.i18n.defaultLocale;


/**
 * @description :: given an array of contents and a language, 
 *                it returns the array index of the language.
 *                If there isn't any match, it returns the default languange content
 *                or any content.                
 * lang - language
 * contents - array of contents
 */

_contentIndex = function (lang, contents) {
  //get required languange
  var index = _.findIndex(contents, { lang: lang });
  if ( index < 0 ) {
    //required language is not set
    //get default languange
    index = _.findIndex(contents, { lang: defaultLang });
    if ( index < 0 ) {
      //default language is not set
      //get any languange
      index = 0;
    } 
  }

  return index;
}

module.exports = {
  

  /**
   * @description :: creates the localitzated content model
   * text - localized text
   * lang - language
   * parent - text which is being localized
   */
  createLocal: function (text, lang, parent, cb) {
    var paramObj = {
      text: text,

      lang: lang,

      parent: parent,
    };

    Content.create(paramObj, function (err, content) {    
      if (err) {
        console.log(err);
        cb(err, null);
      } else {
        cb(null, content);
      }
    });
  },

  /**
   * @description :: updates the localitzated content model
   * text - localized text
   * lang - language
   * parent - text which is being localized
   */
  updateLocal: function (text, lang, parent, cb) {
    var paramObj = {
      text: text,
    };

    Content.update({parent:parent, lang:lang}, paramObj, function (err) {    
      if (err) {
        console.log(err);
        cb(err, null);
      } else {
        cb(null, null);
      }
    });
  },

  /**
   * @description :: retrieves the localitzated content model
   * lang - language
   * parent - text which is being retrieved
   */
  loadLocal: function (lang, parent, cb) {

    Content.find({parent:parent}, function (err, contents) { 
      if (err || !contents || contents.length <= 0) {
        console.log(err);
        cb(err, null);
      } else {
        cb(null, contents[ _contentIndex(lang, contents) ].text);        
      }
    });
  }

};

 
