<!-- Latest compiled and minified CSS -->
<!-- Delete that line if you don't want to use Bootstrap or you're using it -->
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.2.0/css/bootstrap.min.css">
<style>
  .buttonsContainer{
    background: #f0f0f0;
    border-top: 2px solid #eee;
    padding: 20px;
  }
</style>

<div class="container">
 
 <!-- HEADER -->
  <div class="jumbotron" style="margin-top:40px;">
    <h1>Show</h1>
    <a href="/<%= name %>" class="btn pull-right">Go to the index</a>
  </div>

  <% for(var i in attributes){ %>
    <b><%= attributes[i].name %>:</b> <%= SE %> <%= name%>.<%= attributes[i].name %> <%= E %><br>
  <% } %>
    
  <br><br>
    
  <div class="buttonsContainer"><a href="/<%=name%>/edit/<%= SE %><%=name%>.id<%= E %>" class="btn btn-primary">Edit</a> <a href="/<%=name%>/destroy/<%= SE %><%=name%>.id<%= E %>" class="btn btn-danger" onclick="return confirm('Are you sure?')">Delete</a></div>
  
</div>

