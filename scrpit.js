const screens = document.querySelectorAll('.screen');
const choose_teacher_btns = document.querySelectorAll('.choose-teacher-btn');
const start_btn = document.getElementById('start-btn')
const game_container = document.getElementById('game-container')

const timeEl = document.getElementById('time')
const scoreEl = document.getElementById('score')
const message = document.getElementById('message')

let seconds = 0
let score = 0
let selected_teacher = {}

start_btn.addEventListener('click', () => screens [0].classList.add('up'))
choose_teacher_btns.forEach(btn => {btn.addEventListener('click', () => {
        const img = btn.querySelector('img')
        const src = img.getAttribute('src')
        const alt = img.getAttribute('alt')
        selected_teacher = { src, alt }
        screens[1].classList.add('up')
        setTimeout(createTeacher, 1000)
        startGame()
    })
})

function startGame(){
    setInterval(increaseTime, 1000)
}

function increaseTime(){
    let m = Math.floor(seconds / 60)
    let s = seconds % 60
    m = m < 10 ? `0${m}` : m
    s = s < 10 ? `0${s}` : s
    timeEl.innerHTML = `Time : ${m} ${s}`
    seconds++
}

function createTeacher(){
    const teacher = document.createElement('div')
    teacher.classList.add('teacher')
    const { x, y} = getRandomLocation()
    teacher.style.top = `${y}px`
    teacher.style.left = `${x}px`
  teacher.innerHTML = `<img src="${selected_teacher.src}" alt="${selected_teacher.alt}"
  style="transform: rotate(${Math.random () * 360}deg)">`

     teacher.addEventListener(`click` ,catchTeacher)
    
     game_container.appendChild(teacher)
}

function getRandomLocation(){
    const width = window.innerWidth
    const height = window.innerHeight
    const x = Math.random() * (width - 200) + 100
    const y = Math.random() * (height - 200) + 100
    return { x, y}
}

function catchTeacher()
{
    increaseScore()
    this.classList.add('caught')
    setTimeout(() => this.remove(),2000)
    addTeacher()
}
function addTeacher (){
    setTimeout(createTeacher, 1000)
    setTimeout(createTeacher, 1500)
}

function increaseScore(){
    score++
    if(score > 100){
        message.classList.add('visible')
    }
    scoreEl.innerHTML = `Score: ${score}`
}