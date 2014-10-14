  <% for(var i in attributes){ %>

  <div class="form-group">
    <label for="input<%= attributes[i].name %>"><%= attributes[i].name %></label>

    <% if( attributes[i].type == "string" ){ %>
      <input type="text" name="<%= attributes[i].name %>" class="form-control" id="" placeholder="Enter <%= attributes[i].name %>" value="<%=SE%><%= name%>.<%= attributes[i].name %><%=E%>">

    <% } else if( attributes[i].type == "date" ){ %>
      <input type="date" name="<%= attributes[i].name %>" class="form-control" id="" placeholder="Enter <%= attributes[i].name %>" value="<%=SE%><%= name%>.<%= attributes[i].name %><%=E%>">
        
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
      

    <% } else if( attributes[i].type == "int" ){ %>
      <input type="number" name="<%= attributes[i].name %>" class="form-control" id="" placeholder="Enter <%= attributes[i].name %>" value="<%=SE%><%= name%>.<%= attributes[i].name %><%=E%>">
    <% } %>

  </div>

<% } %>
  
  <script src="//ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>
  <script>
    $(function(){
    
      $('.imageBtn').click(function(){
        $('#'+ $(this).attr('id') + "Input" ).click();
        $(this).parent().addClass('uploading');
        
      });
    
      $('.imageInput').change(function(){
        $(this).parent().submit();
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
				
				var id = $('.uploading').children('.imageBtn').attr('id');

                $('.uploading').children('.hidden').val(data.path);
                $('.uploading').children('.imageResult').html( '<p><img src="'+data.path+'" width="100px"></p><a href="javascript:void(0)" onclick="javascript:resetImage(\''+id+'\')" class="btn btn-xs btn-warning">Edit</a> <a href="javascript:void(0)" onclick="javascript:removeImage(\''+id+'\')" class="btn btn-xs btn-danger">Delete</a>' );
              
                $('.uploading').children('.imageBtn').hide();
                $('.uploading').removeClass('uploading');

            },
            error: function(data){
                console.log("error");
                console.log(data);
            }
        });
    }));
    });
	  
	  function resetImage(id){
		  $('#'+id).click();
	  }
	  function removeImage(id){
		  $('#'+id).show();
		  $('#'+id).parent().children('.imageResult').html('');
		  $('#'+id).parent().children('.hidden').val('');
	  }
  </script>