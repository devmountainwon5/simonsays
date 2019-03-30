//TODO list:
//display and handle logic for current score and high score
//display and handle logic for quit button
//bring in .mp3 sounds and assign to each button
//bug: player can interupt cycle by clicking on buttons

var buttons = document.getElementsByClassName('button')
var simonsArray = []
var counter = 0
var whosTurnIsIt = 'computers'

var yelSound = document.createElement('audio')
    yelSound.setAttribute('src', './assets/sounds/yellow.wav')
var redSound = document.createElement('audio')
    redSound.setAttribute('src', './assets/sounds/red.wav')
var bluSound = document.createElement('audio')
    bluSound.setAttribute('src', './assets/sounds/blue.wav')
var greSound = document.createElement('audio')
    greSound.setAttribute('src', './assets/sounds/green.wav')

// var scoreKeeper
// var quitButton

//initial setup
for(let i = 0; i<buttons.length; i++) {
    buttons[i].addEventListener('click', handleButton(buttons[i].id))
    
}

//game logic
document.onload = startGame()

function startGame() {
    console.log('Game is Starting! Picking a New Color')
    setTimeout(()=> {
        pickNewColor()
        setTimeout(()=> {
            handlePlayerTurns()
        }, 1000)
    }, 2000)
}
function pickNewColor() {
    var randomButton = buttons[Math.trunc(Math.random()*4)]
    simonsArray.push(randomButton)
    console.log('[pickNewcolor] simonsArray:', simonsArray)
    blink(randomButton)
}
function cycle(cb) {
    let i = 0
    var cycleInterval = setInterval(() => {
        blink(simonsArray[i])
        i++
        if(i === counter ){
            counter = 0

            setTimeout(() => {
                clearInterval(cycleInterval) 
                cb()
                i=0
                setTimeout(()=> {
                    handlePlayerTurns()
                }, 500)
            }, 500)
        }
    }, 500)
}
function handleButton(id) {
    //everything in here happens when our 'click' event triggers
    return function() {
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
        
        document.getElementById(id).style.background = 'white'
            
        setTimeout(() => {
            document.getElementById(id).style.background = id
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
                startGame()
            }, 100)

        }
    }
}

function blink(DOMele){
    //sounds
    if (DOMele){
        switch(DOMele.id){
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
        
    var blinking = setInterval(()=> {
            if(DOMele) {
                DOMele.classList.toggle('border')
            }
        }, 100)
    setTimeout(()=>{
            if(DOMele) {
                DOMele.classList.remove('border')
            }
        clearInterval(blinking)
        }, 400)
}

function handlePlayerTurns() {
    if(whosTurnIsIt === 'computers') {
        console.log('[playersTurn]')
        whosTurnIsIt = 'player'
        
    } else if(whosTurnIsIt === 'player' && counter === simonsArray.length) {
        console.log('[compTurn]')
        whosTurnIsIt = 'computers'
        setTimeout(()=> {
            cycle(pickNewColor)
        }, 1000)
    }
}

function cloneAndPlay(sound){
    var clonedSound = sound.cloneNode()
    clonedSound.play()
}