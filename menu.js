// Sidebar Toggle
const menuButtons = document.querySelectorAll('#menu-btn');

menuButtons.forEach((button) =>{
	button.addEventListener('click', function () {
		const sideBar = document.getElementById('sidebar')
		sideBar.style.display = 'flex';
		// sideBar.classList.toggle('sidebar-active')
	})
	
})

// Hides Sidebar when you click outside it
const newsContainer = document.getElementById('news-wrapper')
newsContainer.addEventListener('click', function () {
	const sideBar = document.getElementById('sidebar')
	sideBar.style.display = 'none';
	// sideBar.classList.remove('sidebar-active')
})

//Search bar, clear input when you click in it
// const searchInput = document.getElementById('search-input')
// searchInput.addEventListener('click', function () {
// 	searchInput.value = ''
// })
