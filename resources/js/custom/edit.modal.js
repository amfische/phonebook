$('#editModal').on('show.bs.modal', function (event) {
  let button = event.relatedTarget // Button that triggered the modal
  $('#pbe-id').val(button.dataset.id)
  $('#pbe-first_name').val(button.dataset.fn)
  $('#pbe-last_name').val(button.dataset.ln)
  $('#pbe-title').val(button.dataset.title)
  $('#pbe-phone').val(button.dataset.phone)
  if (button.dataset.avatar !== '') {
  	$('#editModal img').attr('src', button.dataset.avatar)
  }
})

$('#editModal').on('hidden.bs.modal', (e) => {
	$('#pbe-errors').addClass('d-none')
	$('#pbe-errors ul').empty()
	$('#pbe-upload').val('')
	$('#editModal img').attr('src', 'https://via.placeholder.com/65')
})

$('#pbe-submit').click((e) => {
	e.preventDefault()

	let id = $('#pbe-id').val()
	let data = new FormData()

	data.set('first_name', $('#pbe-first_name').val())
	data.set('last_name', $('#pbe-last_name').val())
	data.set('title', $('#pbe-title').val())
	data.set('phone', $('#pbe-phone').val())
	if (document.querySelector('#pbe-upload').files[0] !== undefined) {
		data.set('avatar', document.querySelector('#pbe-upload').files[0])
	}
	data.set('_method', 'put') //have to spoof the put method, FormData and ajax put methods send an empty request, core PHP bug
	
	axios.post('/contact/' + id, data)
	.then(response => {
		sessionStorage.setItem('pb.flash.message', response.data.message)
		window.location.reload()
	})
	.catch(errors => {
		$('#pbe-errors ul').empty();
		$('#pbe-errors').removeClass('d-none');
		for (let e in errors.response.data.errors) {
			$('#pbe-errors ul').append(`<li>${errors.response.data.errors[e]}</li>`);
		}
	})
})
