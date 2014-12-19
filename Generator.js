/**
 * Module dependencies
 */

var util = require('util')
  , utils = require('utilities')
  , clc = require('cli-color')
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
    scope.localFilename = scope.nameC +"Local"

    //Process attributes
    var attributes = scope.args.slice(1);
    scope.hasI18N = hasI18N(attributes);
    scope.languages = [];

    if(scope.hasI18N){
      scope.languages = attributes[attributes.length-1].split(':').slice(1);
      attributes = scope.args.slice(1,scope.args.length-1);      
    }

    scope.attributes = _.map(attributes, processAttr(scope.hasI18N));    
    scope.attributesNOI18N = _.map(attributes, processAttr(scope.hasI18N));
    scope.hasImage = hasImage(scope.attributes);

    if(scope.hasI18N){
      scope.attributesI18N = _.remove(scope.attributesNOI18N, function(attr) { return attr.i18n; });
    }

    //print attributes
    _.forEach(scope.attributes, function(attr) {console.log(clc.green(attr.name)+" type "+ clc.red(attr.type) +" and i18n on "+ attr.i18n);});

    //Escape chars for EJS
    scope.S = "<%"
    scope.SE = "<%="
    scope.SP = "<%-"
    scope.E = "%>"

    //modify package.json
    updatePackage (scope.rootPath, scope.hasImage, scope.hasI18N);

    //adapt targets
    if(scope.hasImage){
      addImageFiles(this.targets)
    }
    if(scope.hasI18N){
      addI18NFiles(this.targets, scope.languages)
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
    
    //CREATE VIEWS
    './views/:name/index.ejs': { template: {templatePath: './views/index.template.js', force: true}  },
    './views/:name/add.ejs': { template: {templatePath: './views/add.template.js', force: true}  },
    './views/:name/show.ejs': { template: {templatePath: './views/show.template.js', force: true}  },
    './views/:name/edit.ejs': { template: {templatePath: './views/edit.template.js', force: true}  },
    './views/:name/form.ejs': { template: {templatePath: './views/form.template.js', force: true}  },
	  
	  //CREATE SCRIPTS
  	'./assets/js/mvc-scripts.js': { template: {templatePath: './assets/js/scripts.template.js', force: true}  },

    //config files
    './config/connections.js': { template: {templatePath: './config/connections.template.js', force: true}  },

    //testing files
    './test/mocha.opts': { template: {templatePath: './test/mocha.opts', force: true}  },    
    './test/bootstrap.test.js': { template: {templatePath: './test/bootstrap.test.js', force: true}  },
    './test/fixtures/apples.json': { template: {templatePath: './test/fixtures/apples.json', force: true}  },
    './test/fixtures/oranges.json': { template: {templatePath: './test/fixtures/oranges.json', force: true}  },
    './test/unit/controllers/ApplesController.test.js': { template: {templatePath: './test/unit/controllers/ApplesController.test.js', force: true}  },
    './test/unit/models/Apples.test.js': { template: {templatePath: './test/unit/models/Apples.test.js', force: true}  },
    './test/unit/models/Oranges.test.js': { template: {templatePath: './test/unit/models/Oranges.test.js', force: true}  }      
  },


  /**
   * The absolute path to the `templates` for this generator
   * (for use with the `template` helper)
   *
   * @type {String}
   */
  templatesDirectory: require('path').resolve(__dirname, './templates')
};


function processAttr(hasI18N) {
  return function(attribute, i) {
    var parts = attribute.split(':')
      , i18n = false;

    if (parts[1] === undefined) {
      parts[1] = 'string';
    }

    if(parts[2] && parts[2] == "i18n" && hasI18N){
      i18n = true;
    }

    // Handle Attributes that are invalid
    if (!parts[1] || !parts[0]) {
      invalidAttributes.push(
        'Invalid attribute :   "' + attribute + '"');
      return;
    }

    return {
      name: parts[0],
      type: parts[1],
      i18n: i18n
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

function hasI18N(attributes) {
  if(attributes[attributes.length-1]){
    var parts = attributes[attributes.length-1].split(':')
      , hasI18N = false; 

    if (parts[0] == "i18n" && parts.length > 1) {
      hasI18N = true;
    }
    return hasI18N;
  } else {
    return false;
  }
}

function updatePackage (path, hasImages, hasI18N) {
  var filename = path + '/package.json'
  var packageJson = require(filename);  
  var fs = require('fs');
  if(hasImages || hasI18N){
    packageJson.dependencies['node-uuid'] = "latest";
  }
  if(hasImages){
    packageJson.dependencies['fs-extra'] = "latest";
  }

  //devDependencies
  if(!packageJson.devDependencies){
    packageJson.devDependencies = {};
  }
  packageJson.devDependencies['barrels'] = "latest";
  packageJson.devDependencies['mocha'] = "latest";
  packageJson.devDependencies['sails-memory'] = "latest";
  packageJson.devDependencies['should'] = "latest";
  packageJson.devDependencies['supertest'] = "latest";

  //scripts
  if(!packageJson.scripts){
    packageJson.scripts = {};
  }
  packageJson.scripts['test'] = "PORT=9999 NODE_ENV=test mocha -R spec -b --recursive";

  fs.writeFileSync(filename, JSON.stringify(packageJson,null,2));
}

function addImageFiles(targets){

  targets['./api/services/image.js'] = { template: {templatePath: './api/services/image.template.js', force: true}  };
  targets['./api/controllers/ImageController.js'] = { template: {templatePath: './api/controllers/imageController.template.js', force: true}  };
  targets['./assets/js/mvc-image-scripts.js'] = { template: {templatePath: './assets/js/image-scripts.template.js', force: true} }; 
}

function addI18NFiles(targets,languages){

  targets['./api/models/Content.js'] = { template: {templatePath: './api/models/content.template.js', force: true}  };
  targets['./api/services/local.js'] = { template: {templatePath: './api/services/local.template.js', force: true}  };
  targets['./api/services/:localFilename.js'] = { template: {templatePath: './api/services/localModel.template.js', force: true}  };
  targets['./config/i18n.js'] = { template: {templatePath: './config/i18n.template.js', force: true}  };

  for(var i in languages){
    
    targets['./config/locales/'+languages[i]+'.json'] = { template: {templatePath: './config/locales/local.template.js', force: true}  };
  }
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
