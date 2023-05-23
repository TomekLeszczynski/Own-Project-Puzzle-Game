const square = document.querySelectorAll('img')
const startBtn = document.querySelector('button')
const container = document.querySelector('.square-container')
const click = document.querySelector('.click')
const finish = document.querySelector('.finish')
const reset = document.querySelector('.reset')
const doneInfo = document.querySelector('.done-info')

let figure
let rotate

// <-- rotate cells / avoid 0deg, 360deg -->

function mixFigures() {
	startBtn.style.display = 'none'
	reset.style.display = 'block'
	square.forEach(el => {
		let newAngle = Math.floor(Math.random() * 3) * 90
		while (newAngle === 0 || newAngle === 360) {
			newAngle = Math.floor(Math.random() * 3) * 90
		}
		el.style.rotate = `${newAngle}deg`
	})
	startBtn.disabled = true
}

function getParams(e) {
	figure = e.target
	const rotateValue = parseInt(figure.style.rotate)
	rotate = rotateValue
}

// <-- rotate selected cell / play rotate sound + invoke checking function -->

function rotateCells(e) {
	e.preventDefault()
	if (e.key === 'ArrowLeft') {
		rotate -= 90
	} else if (e.key === 'ArrowRight') {
		rotate += 90
	} else return
	figure.style.rotate = `${rotate}deg`
	checkAngle()
	click.play()
}

// <-- check if the cells have proper rotate values, display info if yes + finish sound

function checkAngle() {
	finish.pause()
	let isCheckedAll = true
	square.forEach(el => {
		if (el.style.rotate == '0deg' || el.style.rotate == '-360deg' || el.style.rotate == '360deg') {
			el.style.opacity = '1'
			el.style.border = 'none'
			el.isChecked = true
		} else if (!el.isChecked) {
			isCheckedAll = false
		}
	})
	if (isCheckedAll) {
		finish.play()
		doneInfo.style.visibility = 'visible'
	}
}

document.addEventListener('keydown', rotateCells)
square.forEach(el => el.addEventListener('click', getParams))
startBtn.addEventListener('click', mixFigures)
reset.addEventListener('click', () => location.reload())
