//TODO list:
//bring in .mp3 sounds and assign to each button
//display and handle logic for current score and high score
//display and handle logic for quit button

var buttons = document.getElementsByClassName('button')
var simonsArray = []
var counter = 0
var whosTurnIsIt = 'computers'

// var scoreKeeper
// var quitButton

//initial setup
for(let i = 0; i<buttons.length; i++) {
    buttons[i].addEventListener('click', handleButton(buttons[i].id))
}

//game logic
startGame()

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
    function runCycle(){
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
                }, 1000)
            }
        }, 1000)
    }
    runCycle()
}
function handleButton(id) {
    //everything in here happens when our 'click' event triggers
    return function() {
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
        cycle(pickNewColor)
    }
}