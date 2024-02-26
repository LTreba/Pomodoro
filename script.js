const html = document.querySelector("html")

const button1 = document.querySelector(".app__card-button--foco")
const button2 = document.querySelector(".app__card-button--curto")
const button3 = document.querySelector(".app__card-button--longo")
const button4 = document.querySelector("#start-pause")
const buttons = document.querySelectorAll(".app__card-button")

const banner = document.querySelector(".app__image")

const bannert = document.querySelector(".app__title")

const startOrPauseButton = document.querySelector("#start-pause span")

const timeOnScreen = document.querySelector("#timer")

const imgStatus = document.querySelector(".app__card-primary-butto-icon")

const musicInput = document.querySelector("#alternar-musica")
const music = new Audio('./sons/luna-rise-part-one.mp3')
const startAudio = new Audio('./sons/play.wav')
const pauseAudio = new Audio('./sons/pause.mp3')
const finishAudio = new Audio('./sons/beep.mp3')

let runTime = 1500
let breakTimeId = null

music.loop = true

musicInput.addEventListener('change', () =>{
    if(music.paused){
        music.play();
    }else{
        music.pause();
    }
})

function changeAttributes(value1, value2){
    showTime()
    html.setAttribute("data-contexto",value1);
    banner.setAttribute("src", value2);
    switch(value1){
        case "foco":
            bannert.innerHTML= 'Para produzir <strong class="app__title-strong">mais</strong>';
            break;
        case "descanso-curto":
            bannert.innerHTML = 'Volte <strong class="app__title-strong">centrado</strong>';
            break;
        case "descanso-longo":
            bannert.innerHTML = 'Seja eficiente com seu <strong class="app__title-strong">tempo</strong>';
            break;
    }
    buttons.forEach((contexto)=>{
        contexto.classList.remove("active")
    })
}


button1.addEventListener('click', ()=>{
    runTime = 1500
    changeAttributes("foco", "./imagens/foco.png")
    button1.classList.add("active")
})


button2.addEventListener('click', ()=>{
    runTime = 300
    changeAttributes("descanso-curto", "./imagens/descanso-curto.png")
    button2.classList.add("active")
})

button3.addEventListener('click', ()=>{
    runTime = 900
    changeAttributes("descanso-longo", "./imagens/descanso-longo.png")
    button3.classList.add("active")
})


const countDown = ()=>{
    if(runTime<=0){
        finishAudio.play()
        zero()
        return
    }
    runTime-=1
    console.log(runTime)
    showTime()
}

button4.addEventListener("click", start)

function start(){
    if(breakTimeId){
        pauseAudio.play()
        zero()
        return
    }
    startAudio.play()
    breakTimeId = setInterval(countDown, 1000)
    startOrPauseButton.textContent = "Pausar"
    imgStatus.setAttribute('src','./imagens/pause.png')
}

function zero(){
    clearInterval(breakTimeId)
    breakTimeId = null
    startOrPauseButton.textContent = "Começar"
    imgStatus.setAttribute('src','./imagens/play_arrow.png')
}

function showTime(){
    const time = new Date(runTime * 1000)
    const timeFormat = time.toLocaleString('pt-br', {minute: '2-digit', second: '2-digit'})
    timeOnScreen.innerHTML = `${timeFormat}`
}

showTime()