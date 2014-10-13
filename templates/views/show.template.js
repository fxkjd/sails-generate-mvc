<!-- Latest compiled and minified CSS -->
<!-- Delete that line if you don't want to use Bootstrap or you're using it -->
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.2.0/css/bootstrap.min.css">

<div class="container">
 
 <!-- HEADER -->
  <div class="jumbotron" style="margin-top:40px;">
    <h1>Show <%= nameC %></h1>
  </div>
  
  <!-- SHOW <%= namePlural %> -->
  
  <% for(var i in attributes){ %>
    
    <b><%= attributes[i].name %>:</b> <%= SE %> <%= name%>.<%= attributes[i].name %> <%= E %><br>
    
  <% } %>
  
</div>

