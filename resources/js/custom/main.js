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
