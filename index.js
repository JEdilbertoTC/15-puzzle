let movements = 0
const elements = document.getElementsByClassName("dashboard-element")

function shuffle(array) {
    const shallow = [...array]
    let currentIndex = shallow.length, randomIndex

    while (currentIndex !== 0) {

        randomIndex = Math.floor(Math.random() * currentIndex)
        currentIndex--

        [shallow[currentIndex], shallow[randomIndex]] = [shallow[randomIndex], shallow[currentIndex]]
    }

    return shallow
}

function timer() {
    let time = 0
    setInterval(() => {
        let hours = Math.floor(time / 60 / 60)
        let minutes = Math.floor(time / 60 % 60)
        let seconds = Math.floor(time % 60)
        time++
        document.querySelector('.timer').innerHTML = `${hours}:${minutes}:${seconds}`
    }, 1000)
}

function printName() {
    document.querySelector('.name').innerHTML = prompt("Escribe tu nombre")
}

function printMovements(movements = 0) {
    document.querySelector('.movements').innerText = movements.toString()
}

function printInfo() {
    printMovements()
    printName()
    timer()
}

function printShuffleElements(order) {
    const elements = document.querySelectorAll('.dashboard-element')
    shuffle(order).forEach((el, i) => {
        if (el === '') {
            elements[i].classList.add('active')
        }
        elements[i].innerHTML = el
    })
}

function printInitialElements(order) {
    const elements = document.querySelectorAll('.dashboard-element')
    order.forEach((el, i) => {
        elements[i].innerHTML = el
    })
}

function move(i) {
    // Up
    if (isValid(i + 4) && elements[i + 4].innerHTML === '') {
        changeElement(i, +4)
    }

    // Down
    if (isValid(i - 4) && elements[i - 4].innerHTML === '') {
        changeElement(i, -4)
    }

    // Right
    if (isValid(i + 1) && elements[i + 1].innerHTML === '') {
        changeElement(i, +1)
    }

    // Left
    if (isValid(i - 1) && elements[i - 1].innerHTML === '') {
        changeElement(i, -1)
    }

    (checkWin() && alert("Felicidades, ganaste!"))
}

function changeElement(i, k) {
    elements[i + k].innerHTML = elements[i].innerHTML
    elements[i + k].classList.remove('active')
    elements[i].innerHTML = ''
    elements[i].classList.add('active')
    document.querySelector('.movements').innerHTML = (++movements).toString();
}

function checkWin() {
    for (let i = 0; i < 15; i++) {
        if (elements[i].innerHTML !== (i + 1).toString()) {
            return false
        }
    }
    return true
}

function isValid(pos) {
    return pos >= 0 && pos <= 15
}

function main() {
    const start = document.getElementById('start')
    const order = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '']
    printInitialElements(order)
    start.addEventListener('click', () => {
        printInfo()
        printShuffleElements(order)
        start.classList.add('hidden')
    })
}

main()