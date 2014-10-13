/**
* <%=nameC%>.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  tableName: '<%=namePlural%>',

  attributes: {
  <% for(var i in attributes) { %>
    <%=attributes[i].name%> : { type: '<%=attributes[i].type%>'},
  <% } %>
  }
};

