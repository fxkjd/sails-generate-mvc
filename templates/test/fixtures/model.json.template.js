[
  {

    <% for(var i in attributes) { %>"<%=attributes[i].name%>" : <%if(attributes[i].type == 'integer'){%>1<%}else{%>"<%=attributes[i].name%>"<%}%><%if(i < attributes.length - 1 ){%>,<%}%>
    <% } %>
  }
]
