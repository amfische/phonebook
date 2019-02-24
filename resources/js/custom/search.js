const searchInput = document.querySelector('.search-and-create').firstElementChild
const peoplesArray = document.querySelectorAll('.name-and-title')

searchInput.addEventListener('keyup', (e) => {
	peoplesArray.forEach(person => {
		const container = person.parentElement.parentElement
		const name = person.firstElementChild.innerText.toLowerCase()
		const title = person.lastElementChild.innerText.toLowerCase()
		const searchTerm = e.target.value.toLowerCase()
		if (!name.includes(searchTerm) && !title.includes(searchTerm) ) {
			container.classList.add('d-none')
		} else {
			container.classList.remove('d-none')
		}
	})
})
