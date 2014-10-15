/**
 * Module dependencies
 */

var util = require('util')
  , utils = require('utilities')
  , _ = require('lodash');
_.defaults = require('merge-defaults');


/**
 * sails-generate-mvc
 *
 * Usage:
 * `sails generate mvc`
 *
 * @description Generates a mvc
 * @help See http://links.sailsjs.org/docs/generators
 */

module.exports = {

  /**
   * `before()` is run before executing any of the `targets`
   * defined below.
   *
   * This is where we can validate user input, configure default
   * scope variables, get extra dependencies, and so on.
   *
   * @param  {Object} scope
   * @param  {Function} cb    [callback]
   */

  before: function (scope, cb) {

    // scope.args are the raw command line arguments.
    //
    // e.g. if someone runs:
    // $ sails generate mvc user find create update
    // then `scope.args` would be `['user', 'find', 'create', 'update']`
    if (!scope.args[0]) {
      return cb( new Error('Please provide a name for this mvc.') );
    }

    // scope.rootPath is the base path for this generator
    //
    // e.g. if this generator specified the target:
    // './Foobar.md': { copy: 'Foobar.md' }
    //
    // And someone ran this generator from `/Users/dbowie/sailsStuff`,
    // then `/Users/dbowie/sailsStuff/Foobar.md` would be created.
    if (!scope.rootPath) {
      return cb( INVALID_SCOPE_VARIABLE('rootPath') );
    }


    // Attach defaults
    _.defaults(scope, {
      createdAt: new Date()
    });

    //Names used on MVC
    scope.name = utils.string.decapitalize(scope.args[0]);
    scope.nameC = utils.string.capitalize(scope.name);
    scope.namePlural = utils.inflection.pluralize(scope.name);
    scope.namePluralC = utils.string.capitalize(scope.namePlural);

    // Decide the output filename for use in targets below:
    scope.controllerFilename = scope.nameC +"Controller"

    //Process attributes
    var attributes = scope.args.slice(1);
    scope.attributes = _.map(attributes, processAttr());    
    scope.hasImage = hasImage(scope.attributes);

    //Escape chars for EJS
    scope.S = "<%"
    scope.SE = "<%="
    scope.SP = "<%-"
    scope.E = "%>"

    //modify package.json
    if(scope.hasImage){
      updatePackage (scope.rootPath);
    }

    // When finished, we trigger a callback with no error
    // to begin generating files/folders as specified by
    // the `targets` below.
    cb();
  },



  /**
   * The files/folders to generate.
   * @type {Object}
   */

  targets: {

    // Usage:
    // './path/to/destination.foo': { someHelper: opts }

    // Creates a dynamically-named file relative to `scope.rootPath`
    // (defined by the `filename` scope variable).
    //
    // The `template` helper reads the specified template, making the
    // entire scope available to it (uses underscore/JST/ejs syntax).
    // Then the file is copied into the specified destination (on the left).
    './api/controllers/:controllerFilename.js': { template: {templatePath: './api/controllers/controller.template.js', force: true}  },
    './api/models/:nameC.js': { template: {templatePath: './api/models/model.template.js', force: true}  },
    './api/services/validator.js': { template: {templatePath: './api/services/validator.template.js', force: true}  },

    './api/services/image.js': { template: {templatePath: './api/services/image.template.js', force: true}  },
    './api/controllers/ImageController.js': { template: {templatePath: './api/controllers/imageController.template.js', force: true}  },

    
    //CREATE VIEWS
    './views/:name/index.ejs': { template: {templatePath: './views/index.template.js', force: true}  },
    './views/:name/add.ejs': { template: {templatePath: './views/add.template.js', force: true}  },
    './views/:name/show.ejs': { template: {templatePath: './views/show.template.js', force: true}  },
    './views/:name/edit.ejs': { template: {templatePath: './views/edit.template.js', force: true}  },
    './views/:name/form.ejs': { template: {templatePath: './views/form.template.js', force: true}  },
	  
	//CREATE SCRIPTS
	'./assets/js/mvc-scripts.js': { template: {templatePath: './assets/js/scripts.template.js', force: true}  },

  },


  /**
   * The absolute path to the `templates` for this generator
   * (for use with the `template` helper)
   *
   * @type {String}
   */
  templatesDirectory: require('path').resolve(__dirname, './templates')
};


function processAttr() {
  return function(attribute, i) {
    var parts = attribute.split(':');

    if (parts[1] === undefined) {
      parts[1] = 'string';
    }

    // Handle Attributes that are invalid
    if (!parts[1] || !parts[0]) {
      invalidAttributes.push(
        'Invalid attribute :   "' + attribute + '"');
      return;
    }

    return {
      name: parts[0],
      type: parts[1]
    };

  }
}

function hasImage(attributes) {
  var hasImage = false; 
  for(var i in attributes){
    if(attributes[i].type == 'image') {
      hasImage = true;
    }
  }
  return hasImage;
}

function updatePackage (path) {
  var filename = path + '/package.json'
  var packageJson = require(filename);  
  var fs = require('fs');
  packageJson.dependencies['node-uuid'] = "latest";
  packageJson.dependencies['fs-extra'] = "latest";

  fs.writeFileSync(filename, JSON.stringify(packageJson,null,2));
}

/**
 * INVALID_SCOPE_VARIABLE()
 *
 * Helper method to put together a nice error about a missing or invalid
 * scope variable. We should always validate any required scope variables
 * to avoid inadvertently smashing someone's filesystem.
 *
 * @param {String} varname [the name of the missing/invalid scope variable]
 * @param {String} details [optional - additional details to display on the console]
 * @param {String} message [optional - override for the default message]
 * @return {Error}
 * @api private
 */

function INVALID_SCOPE_VARIABLE (varname, details, message) {
  var DEFAULT_MESSAGE =
  'Issue encountered in generator "sails-generate-mvc":\n'+
  'Missing required scope variable: `%s`"\n' +
  'If you are the author of `sails-generate-mvc`, please resolve this '+
  'issue and publish a new patch release.';

  message = (message || DEFAULT_MESSAGE) + (details ? '\n'+details : '');
  message = util.inspect(message, varname);

  return new Error(message);
}

