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
    <h1>Edit <%= name %></h1>
  </div>
  
  <%= S %> if( req.session.flash && req.session.flash.error ){ <%= E %>
    <%= S %> var error = req.flash('error') <%= E %>
    <div class="alert alert-danger" role="alert">
    <b>Error</b>
     <ul>
      <%= S %> for(var i in error){  <%= E %>
        <li><%= SE %> error[i] <%= E %></li>
      <%= S %> } <%= E %>
      </ul>
    </div>
  <%= S %> } <%= E %>
  
  <form role="form" action="/<%= name %>/update/<%=SE%><%= name%>.id<%=E%>">

  <%= SP %> partial('form.ejs', {<%= name %>:<%= name %>}) <%= E %>
  
  <div class="buttonsContainer">
    <button type="submit" class="btn btn-primary">Update</button>
  </div>
</form>
    
    <% for(var i in attributes){ %>
      <% if( attributes[i].type == "image" ){ %>
        <form class="form" id="<%= attributes[i].name %>Form" enctype="multipart/form-data" action="/image/upload">
          <input type="file" id="<%= attributes[i].name %>Input" name="image" class="imageInput" style="display:none !important">
        </form>
      <% } %>
    <% } %>
  

</div>

