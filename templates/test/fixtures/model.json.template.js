[
  {

    <% for(var i in attributes) { %>"<%=attributes[i].name%>" : "<%=attributes[i].name%>"<%if(i < attributes.length - 1 ){%>,<%}%>
    <% } %>
  }
]
