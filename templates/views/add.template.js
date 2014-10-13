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
  
  <form role="form" action="/user/create">

  <% for(var i in attributes){ %>

    <% if(attributes[i].type == "string"){ %>
      <div class="form-group">
        <label for="input<%= attributes[i].name %>"><%= attributes[i].name %></label>
        <input type="text" name="<%= attributes[i].name %>" class="form-control" id="" placeholder="Enter <%= attributes[i].name %>">
      </div>
    <% } %>
      
      
    <% if(attributes[i].type == "date"){ %>
      <div class="form-group">
        <label for="input<%= attributes[i].name %>"><%= attributes[i].name %></label>
        <input type="date" name="<%= attributes[i].name %>" class="form-control" id="" placeholder="Enter <%= attributes[i].name %>">
      </div>
    <% } %>

      
      
  <% } %>
  
  <div class="buttonsContainer">
    <button type="submit" class="btn btn-primary">Create</button>
  </div>
</form>
  

</div>

