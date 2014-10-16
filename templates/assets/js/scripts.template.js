$(function(){
	//INDEX POPOVER
	$('.imageIcon').popover();
  
    //i18n SELECT
    $('#languages').change(function(){
      var lan = $(this).val();
      $('.lang').hide();
      $('.lang.'+lan).show();
    });
});