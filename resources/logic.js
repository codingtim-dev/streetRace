//import Player from "./player"
function createGame(){
    
    document.getElementById("gameover").style.display = "none"

    run= true
    let newPlayer = new Player()
    newPlayer.instantiatePlayer()
    let possibleFieldsToMove = []
   
    let newGame = new Game(newPlayer, possibleFieldsToMove)

    document.addEventListener("keydown", function(event){
        if(event.keyCode ==32){
            const startFont = document.getElementById("information");
            startFont.style.display = "none"
            // start the game
            newGame.start(newPlayer);
    
            // hide the start font
            
        }
    })
    
    

    document.getElementById("view").style.display = "flex";
}


// starts the game when the window is loaded
window.onload = function(){
    createGame()
}



class Game {

    isRunning = true;
    tileOnScreen = false
    score = 0

    //possibleFieldsToMove = [];



    constructor(player) {

        // get all the lanes of the html site 
        // later generate a specific amount of lanes and store them into this variable
        this.streetView = document.getElementsByClassName("lane");

        // the obstacles should run async to avoid any other runtime errors
        this.timer = ms => new Promise(res => setTimeout(res, ms));

        //set the fps 
        this.fps = 20
        this.interval = 1000
        this.player = player
        this.possibleFieldsToMove = moveableFields
        // to control the user input and avoid multiple actions handlers
        this.isFired = false
        this.field = playground
        
        //save the fields, where the player can move
        //this.savePossibleFields()
    }

    // start this method to run all things
    start() {
        
        // safe possible spots to walk in array
        
        this.player.instantiatePlayer()
        // set the default state of the player
        this.createPlayer(this.player.playerPosition)

        // run gameloop in intervals
      
        setInterval(this.gameLoop.bind(this), this.interval)
        
        
    }

    // draw the player character
    drawPlayer() {
        console.log(this.possibleFieldsToMove[this.player.playerPosition])

        this.possibleFieldsToMove[this.player.playerPosition].innerHTML = "+"


    }

    savePossibleFields() {
        let posLanes = Array.from(this.streetView);

        let possibleLanes = []

        for(let i = 1; i < playground[i][playground.length]; i++){
            possibleLanes.push(playground[i][playground.length])
            
            
        }
        

        console.log(possibleLanes)

        posLanes.forEach(lane => {
            let laneMore = Array.from(lane.getElementsByTagName("li"))
            this.possibleFieldsToMove.push(laneMore[4])
        })

        //console.log(this.possibleFieldsToMove)

       
    }

    createPlayer(position) {


        // store all possible fields in an arra
        this.playerPos = this.possibleFieldsToMove[position];
        this.playerPos.innerHTML = "+"

    }

    updateScore(){
        document.getElementById("score").innerHTML = this.score
    }


    updatePlayer() {

        
        document.addEventListener("keydown", function (event) {
            if (!this.isFired) {
                this.isFired = true
                switch (event.code) {
                    case "ArrowLeft":
                        // handle left arrow press
                        this.possibleFieldsToMove[this.player.playerPosition].innerHTML = " "
                        this.player.movePlayerLeft()
                        this.drawPlayer()


                        //this.playerPos.innerHTML = " "
                        //this.position --;

                        //this.playerPos = this.possibleFieldsToMove[this.position]


                        //this.playerPos.innerHTML = "+"
                        break;

                    case "ArrowRight":
                        this.possibleFieldsToMove[this.player.playerPosition].innerHTML = " "
                        this.player.movePlayerRight()
                        this.drawPlayer()
                        // handle right arrow press
                        //this.playerPos.innerHTML = " "
                        //this.position++

                        //this.playerPos = this.possibleFieldsToMove[this.position]


                        //this.playerPos.innerHTML = "+"

                        break;
                }

                if(this.isFired){
                    return
                }
            }

        }.bind(this));

        this.isFired = false

    }



    async moveObstacle() {
         // We need to wrap the loop into an async function for this to work
        let randNum = Math.floor(Math.random() * ( moveableFields.length + 1))
        let currLane = playground[randNum];
       
        //let tiles = currLane.getElementsByTagName("li");
       

        if (this.tileOnScreen == false) {
            this.tileOnScreen = true
            for (let i = 0; i < currLane.length; i++) {
                if (i == playground[randNum].length - 1) {
                    if(playground[randNum][i].innerHTML ==  "+"){
                        console.log("game over")
                        this.gameOver()
                    }
                    playground[randNum][i].innerHTML = " "
                    this.tileOnScreen = false
                }
                playground[randNum][i].innerHTML = "*"

                if (i != 0 ) {
                    playground[randNum][i - 1].innerHTML = " "
                }

                await this.timer(500); // then the created Promise can be awaited

                
            }
            this.score++;
            console.log(this.score)
            playground[randNum][playground[randNum].length - 1].innerHTML = ""
        }

    }

    gameOver(){
        const gameOverDiv = document.getElementById("gameover");
        gameOverDiv.style.display = "block"

        const gameTable = document.getElementById("view");
        gameTable.style.display = "none"
        run = false
        delGame(this)
    }

    gameLoop() {

        if(run){
            this.moveObstacle(this.streetView);
    
            this.updatePlayer()
        }

        // create Player on the start pos
        //this.playerPos = this.createPlayer();

        // listen to spacebar press
        
    }
}
const game = new Game()




function delGame(game){
    delete game;
    delete player;
}
//let playerPos = game.createPlayer()
//game.savePossibleFields()
//game.createPlayer()








