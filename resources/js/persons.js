$(document).ready(function() {

	$('#haha').click((e) => {
		e.preventDefault();
		axios.post('/store-person', {
			first_name: $('#pbc-first_name').val(),
			last_name: $('#pbc-last_name').val(),
			title: $('#pbc-title').val(),
			phone: $('#pbc-phone').val()
		})
		.catch(errors => {
			$('#pbc-errors').removeClass('d-none');
			for (let e in errors.response.data.errors) {
				$('#pbc-errors ul').append(`<li>${errors.response.data.errors[e]}</li>`);
			}
		})
	})

	$('#createModal').on('hidden.bs.modal', (e) => {
		$('#pbc-errors').addClass('d-none');
	})


})
