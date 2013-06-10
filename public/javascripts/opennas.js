$(document).ready(function () {
	$.ajax({
		type: 'GET',
		url: '/getpoolinfo',
		success: function (data, status, jqXHR) {
			//TODO
		},
		error: function (jqXHR, textStatus, errorThrown) {
			//TODO
		}
	});
	$('<tr/>', {
		'html': '<td>hui</td>'
	}).appendTo('#idTablePoolInfo');
});
