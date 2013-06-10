var choosdHDDs = []; //HDD choose for RAID creating
var choosedSSDs = []; //SSD choose for RAID creating
var admin = {};    //name and pass here

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
			$('<div/>', {
				'id': 'tablerow',
				'class': 'row span6 offset3'
			}).appendTo('body');
			$('<table/>', {
				'class': 'table table-stripped table-condensed table-hover span6',
				'id': 'idTableHDD',
				html: hdds.join(''),
				style: 'cursor:pointer;'
			}).appendTo('#tablerow');
			$('<thead/>', {
				'html': '<th></th><th>name</th><th>product id</th><th>size</th><th>type</th><th>vendor</th>'
			}).appendTo('table');
			$('#idInfoBlock').html('<h4>Choose disks for your storage</h4>');
			$('<tfooter/>').appendTo('table');
			$('<button/>', {
				'id': 'idBtnStage2',
				'class': 'btn btn-danger span2 pull-right',
				'html': 'create storage',
				'style': 'padding:15px;margin:15px'
			}).appendTo('tfooter');
			$('#idBtnStage2').click(function () {//click on create storage button
				$('table tr').filter(':has(:checkbox:checked)').each(function () {
					// this = tr
					$tr = $(this);
					//get row values
					choosdHDDs.push(this.id);
				});
//				//TODO create storage
//				$.ajax({
//					type: 'POST',
//					dataType: 'json',
//					url: '/createstorage',
//					data: {hdds: choosdHDDs},
//					success: function (data, status, jqXHR) {
//						console.log(data);
//					},
//					error: function (jqXHR, textStatus, errorThrown) {
//						console.log(errorThrown);
//					}
//				});

				//show form for admin name and pass
				$('table').remove();
				$('#idInfoBlock').empty();
				$('#warning').remove();
				$('#idInfoBlock').html('<h4>Register administrator</h4>');
				$.get('/getregistrationform', function (form) {
					$(form).appendTo('body');
					$('#idBtnSaveAdmin').click(function () {
						name = $('input[name=name]').val();
						pass1 = $('input[name=pass]').val();
						pass2 = $('input[name=pass2]').val();
						if (pass1 !== pass2) {
							$('<div/>', {
								'class': 'alert alert-block alert-warning span6 offset3',
								'id': 'warning',
								'style': 'margin:5px'
							}).appendTo('body');
							$('#warning').html('<h4>passwords don\'t match</h4>');
						}
						else if (pass1.length < 6) {
							$('<div/>', {
								'class': 'alert alert-block alert-warning span6 offset3',
								'id': 'warning',
								'style': 'margin:5px'
							}).appendTo('body');
							$('#warning').html('<h4>passwords lngth must be 6 or more</h4>');
						}
						else {
							$.ajax({
								type: 'POST',
								dataType: 'json',
								url: '/createstorage',
								data: {
									hdds: choosdHDDs,
									aminName: name,
									password: pass1
								},
								success: function (data, status, jqXHR) {
									console.log(data);
								},
								error: function (jqXHR, textStatus, errorThrown) {
									console.log(errorThrown);
								}
							});

						}
					});
				});

			});//end of "click on storage button" event
		});
	});
});
