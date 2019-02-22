function toggleAlert(message) {
	$('#status-alert .message').empty();
	$('#status-alert').prepend(`<span class="message">${message}</span>`);
	$('#status-alert').removeClass('d-none');
}

//check session storage for flash messages
let flash_message = sessionStorage.getItem('pb.flash.message')
if (flash_message) {
	sessionStorage.removeItem('pb.flash.message')
	toggleAlert(flash_message)
}

// remove alert when clicking X
$('#status-alert button').on('click', () => {
	$('#status-alert').addClass('d-none');
})


// show image preview when uploading file
const _createFile = document.querySelector('#pbc-upload')
const _editFile = document.querySelector('#pbe-upload')

_createFile.addEventListener('change', loadImagePreview)
_editFile.addEventListener('change', loadImagePreview)

function loadImagePreview(e) {
	let img = e.target.parentElement.nextElementSibling
	img.src = URL.createObjectURL(e.target.files[0])
}
