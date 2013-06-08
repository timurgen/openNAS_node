$(document).ready(function(){
	$('#idBtnStartInstall').click(function(){
		$.get('/getdisks',function(data){
			alert(data);
		});
	});
});
