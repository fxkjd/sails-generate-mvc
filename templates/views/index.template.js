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
		<% if(attributes[ii].type == "image"){ %>
			<td>
			<%= S %> if(<%=namePlural%>[i].<%= attributes[ii].name %>){ <%= E %>
			<a href="#" tabindex="0" class="imageIcon" data-placement="top" data-trigger="hover" data-toggle="popover" data-content="<img src='<%= SE %><%=namePlural%>[i].<%= attributes[ii].name %><%= E %>' width='100px'>" data-html="true"><i class="glyphicon glyphicon-camera"></i></a>
			<%= S %> } <%= E %>
			</td>
        <% }else if(attributes[ii].type == "boolean"){ %>
            <td><span class="label label-<%=S%>if(<%=namePlural%>[i].<%= attributes[ii].name %>){<%=E%>success<%=S%>}else{<%=E%>default<%=S%>}<%=E%>"><%= SE %> <%=namePlural%>[i].<%= attributes[ii].name %><%= E %></span></td>
		<% }else{ %>
			<td><%= SE %> <%=namePlural%>[i].<%= attributes[ii].name %><%= E %></td>
		<% } %>
      <% } %>
        
      <td><%= SE %> <%=namePlural%>[i].createdAt<%= E %></td>
      <td><a href="/<%=name%>/show/<%= SE %><%=namePlural%>[i].id<%= E %>">Show</a> - <a href="/<%=name%>/edit/<%= SE %><%=namePlural%>[i].id<%= E %>">Edit</a> - <a href="/<%=name%>/destroy/<%= SE %><%=namePlural%>[i].id<%= E %>" onclick="return confirm('Are you sure?')">Delete</a></td>

      </tr>
      <%= S%> } <%= E %>

      
      </tbody>
    </table>
  </div>
    

  
  
</div>