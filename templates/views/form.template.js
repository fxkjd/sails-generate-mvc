<% for(var i in attributes){ %>

  <div class="form-group">
    <label for="input<%= attributes[i].name %>"><%= attributes[i].name %></label>

    <% if( attributes[i].type == "string" ){ %>
      <input type="text" name="<%= attributes[i].name %>" class="form-control" id="" placeholder="Enter <%= attributes[i].name %>" value="<%=SE%><%= name%>.<%= attributes[i].name %><%=E%>">

    <% } else if( attributes[i].type == "date" ){ %>
      <input type="date" name="<%= attributes[i].name %>" class="form-control" id="" placeholder="Enter <%= attributes[i].name %>" value="<%=SE%><%= name%>.<%= attributes[i].name %><%=E%>">
        
    <% } else if( attributes[i].type == "image" ){ %>
      <input type="file" id="<%= attributes[i].name %>Field" name="image" class="imageInput">

    <% } else if( attributes[i].type == "int" ){ %>
      <input type="number" name="<%= attributes[i].name %>" class="form-control" id="" placeholder="Enter <%= attributes[i].name %>" value="<%=SE%><%= name%>.<%= attributes[i].name %><%=E%>">
    <% } %>

  </div>

<% } %>
  
  <script src="//ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>
  <script>
    $(function(){
    
      $('.imageInput').change(function(){
        $(".form").submit();
      });
    
      $('.form').on('submit',(function(e) {
        e.preventDefault();
        var formData = new FormData(this);

        $.ajax({
            type:'POST',
            url: '/image/upload',
            data:formData,
            cache:false,
            contentType: false,
            processData: false,
            success:function(data){
                console.log("success");
                console.log(data);
            },
            error: function(data){
                console.log("error");
                console.log(data);
            }
        });
    }));
    });
  </script>