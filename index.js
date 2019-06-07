var buttons = document.getElementsByClassName('button')
var simonsArray = []
var counter = 0
var clonedSound = {}
var gameOver = false

var yelSound = document.createElement('audio'); yelSound.setAttribute('src', './assets/sounds/yellow.wav')
var redSound = document.createElement('audio'); redSound.setAttribute('src', './assets/sounds/red.wav')
var bluSound = document.createElement('audio'); bluSound.setAttribute('src', './assets/sounds/blue.wav')
var greSound = document.createElement('audio'); greSound.setAttribute('src', './assets/sounds/green.wav')

//initial setup
onload = function() {
    document.getElementById('start').addEventListener('click', () => {
        startNewGame()
    })
    for(let i = 0; i<buttons.length; i++) {
        buttons[i].addEventListener('click', () => playerClicks(buttons[i].id))
    }
}

//game logic
function pickNewColor() {
    var randomButton = buttons[Math.trunc(Math.random()*4)]
    simonsArray.push(randomButton)
    cycleSimonsArray()
}

function cycleSimonsArray() {
    let i = 0
    const cycleInterval = setInterval(() => {
        if (i >= simonsArray.length || gameOver ){
            clearInterval(cycleInterval)
            return
        }
        blinkAndPlay(simonsArray[i].id)
        i++
    }, 300)
}

function playerClicks(id) {
    if(!gameOver){
        counter++
        if(counter === simonsArray.length && id === simonsArray[counter-1].id) {
            handleScore(counter)
            setTimeout(()=>pickNewColor(), 1000)
            counter = 0
        } else if(id === simonsArray[counter-1].id) {
            handleScore(counter)
            console.log('guess the next one')
        } else {
            gameOver = true
            alert('GAME OVER! \nTry again.')
            return
        }
        blinkAndPlay(id)
    
    } else {
        alert('Click \'new game\' to play.')
    }
}

//utility functions:
function handleScore(tally){
    let highscore = document.getElementById('highscore')
    let score = document.getElementById('score')
    if (tally >= score.innerHTML){
        score.innerHTML = tally
    }
    if (Number(score.innerHTML) >= Number(highscore.innerHTML)){
        highscore.innerHTML = score.innerHTML
    }
}
function startNewGame(){
    counter = 0
    simonsArray = []
    gameOver = false
    document.getElementById('score').innerHTML = 0
    pickNewColor()
}

function playClone(sound){
    clonedSound = sound.cloneNode()
    clonedSound.play().catch(e=> console.log(e.message))
}

function blinkAndPlay(id){
    let i = 0
    let blinking = setInterval(() => {
        if(i===3) {
            clearInterval(blinking)
        }
        if (i % 2 === 0){
            document.getElementById(id).style.background = 'white'
        } else {
            document.getElementById(id).style.background = id
        }
        i++
    }, 40)

    if (id){
        switch(id){
            case 'yellow':
                playClone(yelSound)
                break;
            case 'blue':
                playClone(bluSound)
                break;
            case 'green':
                playClone(greSound)
                break;
            case 'red':
                playClone(redSound)
                break;
            default:
                return;
        }
    }
}