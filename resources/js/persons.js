$(document).ready(function() {

	// create modal
	$('#pbc-submit').click((e) => {
		e.preventDefault();

		let data = new FormData()
		data.set('first_name', $('#pbc-first_name').val())
		data.set('last_name', $('#pbc-last_name').val())
		data.set('title', $('#pbc-title').val())
		data.set('phone', $('#pbc-phone').val())
		if (document.querySelector('#pbc-image').files[0] !== undefined) {
			data.set('avatar', document.querySelector('#pbc-image').files[0])
		}

		axios.post('/contact/create', data)
		.then(response => {
			const person = response.data.person
			$('main').append(
				`
				<div class="media align-items-center justify-content-between pb-3 mb-5" style="border-bottom: 1px solid black" id="contact-block_${person.id}">
					<img src="https://via.placeholder.com/65" alt="placeholder image">
					<div class="d-flex align-items-center justify-content-between flex-grow-1 px-4">
						<div>
							<h2 id="name-${person.id}" class="m-0">${person.first_name} ${person.last_name}</h2>
							<p id="title-${person.id}" class="m-0">${person.title}</p>
						</div>
						<p id="phone-${person.id}" class="m-0 px-5" style="font-size: 2rem;">${person.formatted_phone}</p>
					</div>
					<div>
						<button 
							class="btn btn-sm btn-info mx-2 px-4" 
							data-toggle="modal" data-target="#editModal" 
							data-id="${ person.id }"
							data-fn="${ person.first_name }"
							data-ln="${ person.last_name }"
							data-title="${ person.title }"
							data-phone="${ person.phone }">
							edit
						</button>
						<button 
							class="btn btn-sm btn-danger mx-2 px-4" 
							data-toggle="modal" data-target="#deleteModal" 
							data-id="${ person.id }" 
							data-fn="${ person.first_name }" 
							data-ln="${ person.last_name }">
							delete
						</button>
					</div>
				</div>
				`)

			clearModal('create')
			$('#createModal').modal('hide');

			$('#status-alert .message').empty();
			$('#status-alert').prepend(`<span class="message">${response.data.status}</span>`);
			$('#status-alert').removeClass('d-none');

			$('main > .alert').addClass('d-none');
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
	  var button = event.relatedTarget // Button that triggered the modal
	  // var person = typeof button.data('info') === 'string' ? JSON.parse(button.data('info')) : button.data('info') // Extract info from data-* attributes // newly created entries are stringified
	  var modal = $(this)

	  modal.find('#pbe-id').val(button.dataset.id);
	  modal.find('#pbe-first_name').val(button.dataset.fn);
	  modal.find('#pbe-last_name').val(button.dataset.ln);
	  modal.find('#pbe-title').val(button.dataset.title);
	  modal.find('#pbe-phone').val(button.dataset.phone);
	})

	$('#pbe-submit').click((e) => {
		e.preventDefault();
		let id = $('#pbe-id').val()
		axios.put('/contact/' + id, {
			first_name: $('#pbe-first_name').val(),
			last_name: $('#pbe-last_name').val(),
			title: $('#pbe-title').val(),
			phone: $('#pbe-phone').val()
		})
		.then(response => {
			$('#name-' + id).text(`${response.data.person.first_name} ${response.data.person.last_name}`);
			$('#title-' + id).text(response.data.person.title);
			$('#phone-' + id).text(response.data.person.formatted_phone);

			$('#edit-btn_' + id).attr('data-fn', response.data.person.first_name)
			$('#edit-btn_' + id).attr('data-ln', response.data.person.last_name)
			$('#edit-btn_' + id).attr('data-title', response.data.person.title)
			$('#edit-btn_' + id).attr('data-phone', response.data.person.phone)

			$('#delete-btn_' + id).attr('data-id', response.data.person.id)
			$('#delete-btn_' + id).attr('data-fn', response.data.person.first_name)
			$('#delete-btn_' + id).attr('data-ln', response.data.person.last_name)

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

	// delete modal
	$('#deleteModal').on('show.bs.modal', function(event) {
		var button = event.relatedTarget // Button that triggered the modal
	  var modal = $(this)
	  var message = `<p>Are you sure you want to remove <strong>${button.dataset.fn} ${button.dataset.ln}</strong> from your phonebook?</p>`
	  modal.find('.modal-body').empty();
	  modal.find('.modal-body').prepend(message);
	  modal.find('#pbd-id').val(button.dataset.id)
	})

	$('#pbd-submit').click((e) => {
		let id = $('#pbd-id').val()
		axios.delete('/contact/' + id)
		.then(response => {
			$('#deleteModal').modal('hide');
			$('#contact-block_' + id).remove();
			$('#status-alert .message').empty();
			$('#status-alert').prepend(`<span class="message">${response.data.status}</span>`);
			$('#status-alert').removeClass('d-none');
		})
		.catch(() => {

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
