/**
* Content.js
*
* @description :: Content model - used for dynamic content localitzation
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  tableName: 'content',

  attributes: {

    text : { type: 'string' },

    lang : { type: 'string' },

    parent : { type: 'string' }
  }
};

