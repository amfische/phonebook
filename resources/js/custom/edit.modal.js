$('#editModal').on('show.bs.modal', function (event) {
  var button = event.relatedTarget // Button that triggered the modal
  var modal = $(this)
  modal.find('#pbe-id').val(button.dataset.id);
  modal.find('#pbe-first_name').val(button.dataset.fn);
  modal.find('#pbe-last_name').val(button.dataset.ln);
  modal.find('#pbe-title').val(button.dataset.title);
  modal.find('#pbe-phone').val(button.dataset.phone);
  console.log(button.dataset)
  // modal.find('#pbe-image').val()
})

$('#editModal').on('hidden.bs.modal', (e) => {
	$('#pbe-errors').addClass('d-none');
	$('#pbe-errors ul').empty();
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

		$('#editModal').modal('hide');
		toggleAlert(response.data.status);
	})
	.catch(errors => {
		$('#pbe-errors ul').empty();
		$('#pbe-errors').removeClass('d-none');
		for (let e in errors.response.data.errors) {
			$('#pbe-errors ul').append(`<li>${errors.response.data.errors[e]}</li>`);
		}
	})
})
