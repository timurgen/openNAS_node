$(document).ready(function () {
	$('#idBtnStartInstall').click(function () {
		$('<div/>', {
			'class': 'alert alert-block alert-warning span6 offset3',
			'id': 'warning'
		}).appendTo('body');
		$('#warning').html('<h4>WARNING! it will erase data on all your disks!</h4>');
		$.get('/getdisks', function (data) {
			$('#idInfoBlock').empty();
			var hdds = [];
			var sdds = [];
			$.each(data, function (key, val) {
				if (val.ssd === 'no' && val.remv === 'no') {
					hdds.push('<tr id="' + val.name + '">' +
						'<td><img src="/images/hdd.png"></td>' +
						'<td>' + val.name + '</td>' +           //name
						'<td>' + val.pid + '</td>' +             //product id
						'<td>' + val.size / 1024.0 / 1024.0 / 1024.0 + 'GB</td>' +  //size GB
						'<td>' + val.type + '</td>' +           //type
						'<td>' + val.vid + '</td>' +            //vendor id
						'<td><input type="checkbox" checked></td>' +
						'</tr>'
					);
				}
				else if (val.ssd === 'yes') {
					sdds.push('<tr id="' + val.name + '">' +
						'<td><img src="/images/ssd.png"></td>' +
						'<td>' + val.name + '</td>' +           //name
						'<td>' + val.pid + '</td>' +             //product id
						'<td>' + val.size / 1024.0 / 1024.0 / 1024.0 + 'GB</td>' +  //size GB
						'<td>' + val.type + '</td>' +           //type
						'<td>' + val.vid + '</td>' +            //vendor id
						'</tr>'
					);
				}
			});
			$('<table/>', {
				'class': 'table table-bordered table-condensed span6',
				html: hdds.join(''),
				style: 'cursor:pointer;'
			}).appendTo('body');
			$('#idInfoBlock').html('<h4>Choose disks for your storage</h4>');
			$('<tfooter/>').appendTo('table');
			$('<button/>', {
				'id': 'idBtnStage2',
				'class': 'btn btn-danger span2 pull-right',
				'html': 'create storage',
				'style': 'padding:15px;margin:15px'
			}).appendTo('tfooter');
			$('#idBtnStage2').click(function () {
				alert('hui');
				//TODO Finne alle valgte disker (ider til rader i tabell)
			});
		});
	});
});
