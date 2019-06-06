//TODO list:
//display and handle logic for current score and high score
//display and handle logic for quit button
//bring in .mp3 sounds and assign to each button
//bug: player can interupt cycle by clicking on buttons


var buttons = document.getElementsByClassName('button')
var simonsArray = []
var counter = 0
var whosTurnIsIt = 'computers'
var clonedSound = {}
var countDownTimer = 3

var yelSound = document.createElement('audio'); yelSound.setAttribute('src', './assets/sounds/yellow.wav')
var redSound = document.createElement('audio'); redSound.setAttribute('src', './assets/sounds/red.wav')
var bluSound = document.createElement('audio'); bluSound.setAttribute('src', './assets/sounds/blue.wav')
var greSound = document.createElement('audio'); greSound.setAttribute('src', './assets/sounds/green.wav')

// 1. computer picks a random color and adds to simons array, that button will blink. 
// 2. simons array will cycle and play.
// 3. player will immitate the cycle.
//      after each click 
//          perform check 
//              see if my array.length == simons array.length
//              no? 
//                  see if my array == simons array
//                  yes? allow next click
//                  no? game over
//              yes?
//              start over at 1.

//initial setup
window.onload = function() {
    const start = document.getElementById('start')
    start.addEventListener('click', () => {
        // startCountdown()
        handlePlayerTurns()
    })
    for(let i = 0; i<buttons.length; i++) {
        buttons[i].addEventListener('click', () => handleButton(buttons[i].id))
    }
}

async function pickNewColor () {
    console.log('[1. pickNewcolor add to array it will blink] simonsArray:', simonsArray)
    var randomButton = buttons[Math.trunc(Math.random()*4)]
    simonsArray.push(randomButton)
    await blink(randomButton)
}
//game logic
function handlePlayerTurns() {
    if(whosTurnIsIt === 'computers') {
        if (simonsArray.length === 0){
            console.log('Game is Starting! Picking a New Color')
            pickNewColor()
        } else {
            console.log('[playersTurn]')
            whosTurnIsIt = 'player'
        }
        
    } else if(whosTurnIsIt === 'player' && counter === simonsArray.length) {
        console.log('[compTurn]')
        whosTurnIsIt = 'computers'
        setTimeout(()=>cycleSimonsArray(), 1500)
    }
}


function cycleSimonsArray() {
    console.log('[cycling simons array]')
    let i = 0
    var cycleInterval = setInterval(() => {
        blink(simonsArray[i])
        i++
        if (i === counter ){
            counter = 0
            setTimeout(() => {
                i=0
                clearInterval(cycleInterval, handlePlayerTurns)
            }, 500)
        }
    }, 500)
}
function handleButton(id) {
    let backgroundColor = document.getElementById(id).style.background
    switch(id){
        case 'yellow':
            cloneAndPlay(yelSound)
            break;
        case 'blue':
            cloneAndPlay(bluSound)
            break;
        case 'green':
            cloneAndPlay(greSound)
            break;
        case 'red':
            cloneAndPlay(redSound)
            break;
        default:
            return;
    } 
    backgroundColor = 'white'
        
    setTimeout(() => {
        backgroundColor = id
    }, 80)

    counter++
    if(counter === simonsArray.length && id === simonsArray[counter-1].id) {
        handlePlayerTurns() 
    } else if(id === simonsArray[counter-1].id) {
        console.log('guess the next one')
    } else {
        setTimeout(()=> {
            alert('GAME OVER! \nTry again.')
            counter = 0
            simonsArray = []
            whosTurnIsIt = 'computers'
            handlePlayerTurns()
        }, 100)

    }
}






//utility functions:

function cloneAndPlay(sound){
    clonedSound = sound.cloneNode()
    clonedSound.play().catch(e=> console.log(e.message))
}

function blink(myButton){
    //sounds
    var blinking = setInterval(()=> {
        if(myButton) {
            myButton.classList.toggle('border')
        }
    }, 100)
    setTimeout(()=>{
        if(myButton) {
            myButton.classList.remove('border')
        }
        clearInterval(blinking)
    }, 400)

    if (myButton){
        switch(myButton.id){
            case 'yellow':
                cloneAndPlay(yelSound)
                break;
            case 'blue':
                cloneAndPlay(bluSound)
                break;
            case 'green':
                cloneAndPlay(greSound)
                break;
            case 'red':
                cloneAndPlay(redSound)
                break;
            default:
                return;
        }
    }
}

//production ready:

function startCountdown() {
    const countDown = document.getElementById('countDown')
    countDown.style.background = 'white';
    countDown.innerHTML = countDownTimer
    if(!countDownTimer < 1){
        countDownTimer--
        setTimeout(() => {
            startCountdown()
        }, 1000)
    } else {
        countDown.innerHTML = ""
        countDown.style.background = 'none';
        handlePlayerTurns()
    }
}
