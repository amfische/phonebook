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
			const person = response.data.person
			$('main').append(
				`
				<div class="media align-items-center justify-content-between pb-3 mb-5" style="border-bottom: 1px solid black">
					<img src="https://via.placeholder.com/65" alt="placeholder image">
					<div class="d-flex align-items-center justify-content-between flex-grow-1 px-4">
						<div>
							<h2 id="name-${person.id}" class="m-0">${person.first_name} ${person.last_name}</h2>
							<p id="title-${person.id}" class="m-0">${person.title}</p>
						</div>
						<p id="phone-${person.id}" class="m-0 px-5" style="font-size: 2rem;">${person.formatted_phone}</p>
					</div>
					<div>
						<button class="btn btn-sm btn-info mx-2 px-4" data-toggle="modal" data-target="#editModal" data-info="${person}">edit</button>
						<button class="btn btn-sm btn-danger mx-2 px-4">delete</button>
					</div>
				</div>
				`)

			clearModal('create')
			$('#createModal').modal('hide');

			$('#status-alert .message').empty();
			$('#status-alert').prepend(`<span class="message">${response.data.status}</span>`);
			$('#status-alert').removeClass('d-none');
		})
		.catch(errors => {
			$('#pbc-errors ul').empty();
			$('#pbc-errors').removeClass('d-none');
			for (let e in errors.response.data.errors) {
				$('#pbc-errors ul').append(`<li>${errors.response.data.errors[e]}</li>`);
			}
		})
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
			$('#name-' + id).text(`${response.data.person.first_name} ${response.data.person.last_name}`);
			$('#title-' + id).text(response.data.person.title);
			$('#phone-' + id).text(response.data.person.formatted_phone);

			clearModal('edit')
			$('#editModal').modal('hide');

			$('#status-alert .message').empty();
			$('#status-alert').prepend(`<span class="message">${response.data.status}</span>`);
			$('#status-alert').removeClass('d-none');
		})
		.catch(errors => {
			$('#pbe-errors ul').empty();
			$('#pbe-errors').removeClass('d-none');
			for (let e in errors.response.data.errors) {
				$('#pbe-errors ul').append(`<li>${errors.response.data.errors[e]}</li>`);
			}
		})
	})

	$('#createModal').on('hidden.bs.modal', (e) => {
		$('#pbc-errors').addClass('d-none');
		$('#pbc-errors ul').empty();
	})

	$('#editModal').on('hidden.bs.modal', (e) => {
		$('#pbe-errors').addClass('d-none');
		$('#pbe-errors ul').empty();
	})

	function clearModal(type) {
		if (type === 'create') {
			$('#pbc-first_name').val('');
			$('#pbc-last_name').val('');
			$('#pbc-title').val('');
			$('#pbc-phone').val('');
		} else if (type === 'edit') {
			$('#pbe-first_name').val('');
			$('#pbe-last_name').val('');
			$('#pbe-title').val('');
			$('#pbe-phone').val('');
		}
	}

	// status alert
	$('#status-alert button').on('click', () => {
		$('#status-alert').addClass('d-none');
	})

})
