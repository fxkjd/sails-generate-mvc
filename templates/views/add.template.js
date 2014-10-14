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
    <h1>Add <%= name %></h1>
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
  
  <form role="form" action="/<%= name %>/create">

  <%= SP %> partial('form.ejs', {<%= name %>:<%= name %>}) <%= E %>
  
  <div class="buttonsContainer">
    <button type="submit" class="btn btn-primary">Create</button>
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

