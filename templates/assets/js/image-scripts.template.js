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

				var id = $('.uploading').children('.imageBtn').attr('id');
				$('.uploading').children('.hidden').val(data.path);
				$('.uploading').children('.imageResult').html( '<p><img src="'+data.path+'" width="100px"></p><a href="javascript:void(0)" onclick="javascript:resetImage(\''+id+'\')" class="btn btn-xs btn-warning">Edit</a> <a href="javascript:void(0)" onclick="javascript:removeImage(\''+id+'\')" class="btn btn-xs btn-danger">Delete</a>' );
				$('.uploading').children('.imageBtn').hide();
				$('.uploading').removeClass('uploading');

			},
			error: function(data){

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
