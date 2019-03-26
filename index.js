var buttons = document.getElementsByClassName('button')
var scoreKeeper 
var quitButton
var simonsArray = []
var playersArray = []
var counter = 0
var whosTurnIsIt = 'computers'

for(let i = 0; i<buttons.length; i++){
    buttons[i].addEventListener('click', handleButton(buttons[i].id))
}

randomColorGenerator()

function handleButton(id) {
    return function (){
        console.log(simonsArray[counter].id)
        if (id === simonsArray[counter].id) {
            playersArray.push(id)
            console.log(playersArray)
            counter++
            handlePlayerTurns()
            randomColorGenerator()
        } else {
            counter = 0
            console.log('game over')
        }
    }
}

function randomColorGenerator () {
    if (whosTurnIsIt === 'computers') {
        var randomButton = buttons[Math.trunc(Math.random()*4)]
        simonsArray.push(randomButton)
        simonsArray.forEach(DOMbutton => {

            document.getElementById(DOMbutton.id).classList.toggle('border')
            console.log('randomButton', randomButton)
            setTimeout(()=> {
                randomButton.classList.toggle('border')
            }, 1000)
            handlePlayerTurns()
        })
    }
}

function handlePlayerTurns(){
    if(whosTurnIsIt === 'computers'){
        whosTurnIsIt = 'player'
        console.log('players turn')
    } else {
        whosTurnIsIt = 'computers'
        console.log('computers turn')
    }
}
// after color its players turn





