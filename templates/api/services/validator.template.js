module.exports = function(model, validationError) {

  var validation_response = {};
  var array_error = [];
  var messages = model.validation_messages;

  validation_fields = Object.keys(messages);
  validation_fields.forEach(function(validation_field) {

    if(validationError[validation_field]) {
      var processField = validationError[validation_field];
      processField.forEach(function(rule) {
        if(messages[validation_field][rule.rule]) {

          //**************************UNUSED CODE-BUT MAYBE USEFUL********************************//
          //if(!(validation_response[validation_field] instanceof Array)) {
          //  validation_response[validation_field] = new Array();
          //}

          //var newMessage={};
          //newMessage[rule.rule] = messages[validation_field][rule.rule];
          //validation_response[validation_field].push(newMessage);

          //*************************************************************************************//

          array_error.push(messages[validation_field][rule.rule]);
        }
      });

    }
  });

  return array_error;
};
