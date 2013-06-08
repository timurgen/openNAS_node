$(document).ready(function(){
	$('#idBtnStartInstall').click(function(){
		$.get('/getdisks',function(data){
			$('#idInfoBlock').empty();
			var hdds = [];
			var sdds = [];
			$.each(data, function(key, val) {
				if(val.ssd === 'no') {

				}
			});
		});
	});
});
