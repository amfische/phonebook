$('#deleteModal').on('show.bs.modal', function(event) {
	var button = event.relatedTarget // Button that triggered the modal
  var modal = $(this)
  var message = `<p>Are you sure you want to remove <strong>${button.dataset.fn} ${button.dataset.ln}</strong> from your phonebook?</p>`
  modal.find('.modal-body').empty();
  modal.find('.modal-body').prepend(message);
  modal.find('#pbd-id').val(button.dataset.id)
})

$('#pbd-submit').click((e) => {
	console.log('delete clicked')
	let id = $('#pbd-id').val()
	axios.delete('/contact/' + id)
	.then(response => {
		sessionStorage.setItem('pb.flash.message',  response.data.message)
		window.location.reload()
	})
	.catch(() => {

	})
})
