[
  {

    <% for(var i in attributes) { %>"<%=attributes[i].name%>" : <%if(attributes[i].type == 'integer'){%>1<%}else{%><%if(attributes[i].type == 'boolean'){%>true<%}else{%><%if(attributes[i].type == 'array'){%>[]<%}else{%><%if(attributes[i].type == 'json'){%>{}<%}else{%>"<%=attributes[i].name%>"<%}%><%}%><%}%><%}%><%if(i < attributes.length - 1 ){%>,<%}%>
    <% } %>
  }
]
