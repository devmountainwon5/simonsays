var buttons = document.getElementsByClassName('button')
var scoreKeeper 
var quitButton
var simonsArray = []
var playersArray = []
var counter = 0
var gameStarted = false
var whosTurnIsIt = 'computers'

//computers turn:
// turn 1? pick a color && now players turn 
//if not {
//cycle through existing array and blink exisiting pattern
//beep with each blink
//after cycle add one more to the array}

//players turn:
//starting with an empty array duplicate the computers array by clicking colored squares
//if your next click doesnt match the matching color.id of the (simonsarray) then game over. 

//1st: computers turn
//2nd: players turn
//-back to 1st
//
//score === simonsArray.length
//highschore === highest simonsarray.length for this session


//initial setup
for(let i = 0; i<buttons.length; i++){
    buttons[i].addEventListener('click', handleButton(buttons[i].id))
}

computersTurn()

function computersTurn (){
    var seconds = 0
    if (gameStarted) {
        cycle(pickNewColor)
    } else {
        console.log('Game is Starting! Picking New Color')
        gameStarted = true
        pickNewColor(),
        handlePlayerTurns()
    }
}

function cycle (cb) {
    console.log('[cycle]') 
    // var beat = setInterval(()=> {
    //     seconds += 1
    //     console.log('[beatSeconds:]', seconds)
    // }, 1000)
    // setTimeout(()=>{
    //     clearInterval(beat)
    //     cbEndTurn()
    // }, 4000)
    return function(){
        simonsArray.forEach( ele => {
            console.log('executingForEach')
            setTimeout(()=>{
                console.log('cycling through ele.s. Current:', ele)
            },
            2000)
            })
        cb()
    }
}
        

function pickNewColor() {
    var randomButton = buttons[Math.trunc(Math.random()*4)]
    simonsArray.push(randomButton)
    console.log('executing picknewcolor', simonsArray)
    //grabs a randomColorTile DOM element 
    //pushes that randomcolorTile to the simsonArray
    blink(randomButton)
}

function blink(DOMele){
    //toggle class border ever 100ms

    var blinking = setInterval(()=> {
        DOMele.classList.toggle('border')
        }, 100)
    
    //after 400 ms stop blinking
    setTimeout(()=>{
        clearInterval(blinking)
        },400)
}

function handleButton(id) {
    return function (){
        console.log('[handleButton], player picked:', simonsArray[counter].id)
        if (id === simonsArray[counter].id) {
            playersArray.push(id)
            counter++
            handlePlayerTurns()
        } else {
            counter = 0
            console.log('game over')
        }
    }
}



function handlePlayerTurns(){
    if(whosTurnIsIt === 'computers'){
        whosTurnIsIt = 'player'
        console.log('[playerTurn]')

    } else {
        whosTurnIsIt = 'computers'
        console.log('[compTurn]')
        computersTurn()
    }
}
// after color its players turn





