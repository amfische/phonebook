$(document).ready(function() {

	// create modal
	$('#pbc-submit').click((e) => {
		e.preventDefault();
		axios.post('/store-person', {
			first_name: $('#pbc-first_name').val(),
			last_name: $('#pbc-last_name').val(),
			title: $('#pbc-title').val(),
			phone: $('#pbc-phone').val()
		})
		.then(response => {
			$('#pbc-first_name').val('');
			$('#pbc-last_name').val('');
			$('#pbc-title').val('');
			$('#pbc-phone').val('');
			$('#createModal').modal('hide');
			$('#status-alert').removeClass('d-none');
			$('#status-alert').prepend(`<span>${response.data.status}</span>`);
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

	// edit modal
	$('#editModal').on('show.bs.modal', function (event) {
	  var button = $(event.relatedTarget) // Button that triggered the modal
	  var person = button.data('info') // Extract info from data-* attributes
	  var modal = $(this)
	  modal.find('#pbe-id').val(person.id);
	  modal.find('#pbe-first_name').val(person.first_name);
	  modal.find('#pbe-last_name').val(person.last_name);
	  modal.find('#pbe-title').val(person.title);
	  modal.find('#pbe-phone').val(person.phone);
	})

		$('#pbe-submit').click((e) => {
		e.preventDefault();
		let id = $('#pbe-id').val()
		axios.post('/update-person/' + id, {
			first_name: $('#pbe-first_name').val(),
			last_name: $('#pbe-last_name').val(),
			title: $('#pbe-title').val(),
			phone: $('#pbe-phone').val()
		})
		.then(response => {
			$('#name-' + id).text($('#pbe-first_name').val() + ' ' +  $('#pbe-last_name').val() );
			$('#title-' + id).text($('#pbe-title').val());
			$('#phone-' + id).text($('#pbe-phone').val());

			$('#pbe-first_name').val('');
			$('#pbe-last_name').val('');
			$('#pbe-title').val('');
			$('#pbe-phone').val('');

			$('#editModal').modal('hide');
			$('#status-alert').removeClass('d-none');
			$('#status-alert').prepend(`<span>${response.data.status}</span>`);
		})
		.catch(errors => {
			$('#pbe-errors').removeClass('d-none');
			for (let e in errors.response.data.errors) {
				$('#pbe-errors ul').append(`<li>${errors.response.data.errors[e]}</li>`);
			}
		})
	})

	$('#editModal').on('hidden.bs.modal', (e) => {
		$('#pbe-errors').addClass('d-none');
	})

	// status alert
	$('#status-alert button').on('click', () => {
		$('#status-alert').addClass('d-none');
	})


})
