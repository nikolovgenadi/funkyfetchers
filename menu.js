// Sidebar Toggle
const menuButton = document.getElementById('menu-btn')
menuButton.addEventListener('click', function () {
	const sideBar = document.getElementById('sidebar')
	sideBar.classList.toggle('sidebar-active')
})

// Hides Sidebar when you click outside it
const sectionContainer = document.getElementById('section-container')
sectionContainer.addEventListener('click', function () {
	const sideBar = document.getElementById('sidebar')
	sideBar.classList.remove('sidebar-active')
})