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
    <a href="/<%= name %>" class="btn btn-default pull-right">Go to the index</a>
  </div>

  <% for(var i in attributes){ %>
	<% if(attributes[i].type == "image"){ %>
		<p><b><%= attributes[i].name %>:</b><br>
		<img src='<%= SE %> <%= name%>.<%= attributes[i].name %> <%= E %>' width='100px'></p>
	<% }else{ %>
		<p><b><%= attributes[i].name %>:</b> <%= SE %> <%= name%>.<%= attributes[i].name %> <%= E %></p>
	<% } %>
  <% } %>
    
  <br><br>
    
  <div class="buttonsContainer"><a href="/<%=name%>/edit/<%= SE %><%=name%>.id<%= E %>" class="btn btn-primary">Edit</a> <a href="/<%=name%>/destroy/<%= SE %><%=name%>.id<%= E %>" class="btn btn-danger" onclick="return confirm('Are you sure?')">Delete</a></div>
  
</div>

