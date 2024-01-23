// Side bar Toggle
const menuButton = document.getElementById('menu-btn')
menuButton.addEventListener('click', function () {
	console.log('Menu button click!')
	const sideBar = document.getElementById('sidebar')
	sideBar.classList.toggle('sidebar-active')
})
