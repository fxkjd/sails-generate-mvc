/**
* <%=nameC%>.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/
<%if(hasI18N){%>var uuid = require('node-uuid');  <%}%>

module.exports = {

  tableName: '<%=namePlural%>',

  attributes: {
  <% for(var i in attributes) { %>
    <%=attributes[i].name%> : { type: <%if(attributes[i].type == 'image'){%>'string'<%}else{%>'<%=attributes[i].type%>'<%}%>}<%if(i < attributes.length - 1 ){%>,<%}%><% } %>
  },
  <%if(hasI18N){%>
  beforeCreate: function(<%=name%>, cb) {
    <% for(var i in attributesI18N) { %> <%=name%>.<%=attributesI18N[i].name%> = uuid.v4();
    <% } %>
    cb(null, <%=name%>);
  },
  <%}%>
  validation_messages: {
  <% for(var i in attributes) { %>
    <%=attributes[i].name%> : { 
      <%=attributes[i].type%>: 'Invalid Type for <%=attributes[i].name%>' 
    }<%if(i < attributes.length - 1 ){%>,<%}%><% } %>
  }
};

