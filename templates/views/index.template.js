<!-- Latest compiled and minified CSS -->
<!-- Delete that line if you don't want to use Bootstrap or you're using it -->
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.2.0/css/bootstrap.min.css">

<div class="container">
 
 <!-- HEADER -->
  <div class="jumbotron" style="margin-top:40px;">
    <h1><%= nameC %></h1>
    <a href="/<%= name %>/add" class="btn btn-primary pull-right">Create new <%= name %></a>
  </div>
  
  <!-- SHOW <%= namePlural %> -->
  
  <div class="table-responsive">
    <table class="table table-striped">
      <thead>
        <tr>
          <th>#</th>
    
          <% for(var i in attributes){ %>
            <th><%= attributes[i].name %></th>
          <% } %>
            
          <th>createdAt</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
      


      <%= S%> for(var i in <%= namePlural %> ){ <%= E %>
        <tr>

      <td><%= SE %> <%=namePlural%>[i].id <%= E %></td>
      
      <% for(var ii in attributes){ %>
        <td><%= SE %> <%=namePlural%>[i].<%= attributes[ii].name %><%= E %></td>
      <% } %>
        
      <td><%= SE %> <%=namePlural%>[i].createdAt<%= E %></td>
      <td><a href="/<%=name%>/show/<%= SE %><%=namePlural%>[i].id<%= E %>">Show</a> - <a href="/<%=name%>/edit/<%= SE %><%=namePlural%>[i].id<%= E %>">Edit</a> - <a href="/<%=name%>/destroy/<%= SE %><%=namePlural%>[i].id<%= E %>" onclick="return confirm('Are you sure?')">Delete</a></td>

      </tr>
      <%= S%> } <%= E %>

      
      </tbody>
    </table>
  </div>
    

  
  
</div>

