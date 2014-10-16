<!-- SELECT i18n -->
  <div class="form-group">
    <label for="">Select language:</label>
     <select id="languages" name="languages">
      <% for(var l in languages){ %>
        <option id="<%= languages[l]%>" value="<%= languages[l]%>"><%= languages[l]%></option>
      <% } %>		
    </select>
  </div>

 <% for(var i in attributes){ %>
  <div class="form-group">
    <label for="input<%= attributes[i].name %>"><%= attributes[i].name %></label>

    <% if( attributes[i].type == "string" ){ %>
    
     <% if( attributes[i].i18n ){ %>
       <% for(var l in languages){ %>
         <input type="text" name="<%= attributes[i].name %><%=languages[l]%>" class="form-control lang <%=languages[l]%>" id="" placeholder="Enter <%= attributes[i].name %> in language <%=languages[l]%>" value="<%=S%>if(typeof <%= name%>.<%= attributes[i].name %><%=languages[l]%> !== "undefined"){<%=E%><%=SE%><%= name%>.<%= attributes[i].name %><%=languages[l]%><%=E%><%=S%>}<%=E%>" <% if(l>0){ %>style="display:none"<%}%>>
       <% } %>
     <% }else{ %>
       <input type="text" name="<%= attributes[i].name %>" class="form-control" id="" placeholder="Enter <%= attributes[i].name %>" value="<%=SE%><%= name%>.<%= attributes[i].name %><%=E%>">
     <% } %>
      

    <% } else if( attributes[i].type == "date" ){ %>
      <input type="date" name="<%= attributes[i].name %>" class="form-control" id="" placeholder="Enter <%= attributes[i].name %>" value="<%=SE%><%= name%>.<%= attributes[i].name %><%=E%>">
       
    <% } else if( attributes[i].type == "boolean" ){ %>
      <select name="<%= attributes[i].name %>">
      <%= S %> if(<%= name%>.<%= attributes[i].name %>) { <%=E%>
      <option>false</option>
      <option selected>true</option>
      <%= S %> } else { <%=E%>
      <option selected>false</option>
      <option>true</option>
      <%= S %> } <%=E%>
      </select>
        
    <% } else if( attributes[i].type == "image" ){ %>
    
		<div class="imageContainer">
			<a href="javascript:void(0)" id="<%= attributes[i].name %>" class="<%= attributes[i].name %> imageBtn btn btn-success btn-sm" style="<%= S %> if( <%= name%>.<%= attributes[i].name %> ){ <%= E %>display:none<%= S %> } <%= E %>">Choose image...</a>
			<input class="hidden" type="hidden" name="<%= attributes[i].name %>" value="<%=SE%><%= name%>.<%= attributes[i].name %><%=E%>">
			<div class="imageResult">
				<%= S %> if( <%= name%>.<%= attributes[i].name %> ){ <%= E %>
				<p><img src="<%=SE%><%= name%>.<%= attributes[i].name %><%=E%>" width="100px"></p>
         <a href="javascript:void(0)" onclick="javascript:resetImage('<%= attributes[i].name %>')" class="btn btn-xs btn-warning">Edit</a> <a href="javascript:void(0)" onclick="javascript:removeImage('<%= attributes[i].name %>')" class="btn btn-xs btn-danger">Delete</a>
         		<%= S %> } <%= E %>
			</div>
		</div>	
      

    <% } else if( attributes[i].type == "integer" ){ %>
      <input type="number" name="<%= attributes[i].name %>" class="form-control" id="" placeholder="Enter <%= attributes[i].name %>" value="<%=SE%><%= name%>.<%= attributes[i].name %><%=E%>">
    <% } %>

  </div>

<% } %>
