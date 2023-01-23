//import Player from "./player"

run= true
let player = new Player()
let possibleFieldsToMove = []

class Game {

    isRunning = true;
    tileOnScreen = false
    //possibleFieldsToMove = [];



    constructor() {

        // get all the lanes of the html site 
        // later generate a specific amount of lanes and store them into this variable
        this.streetView = document.getElementsByClassName("lane");

        // the obstacles should run async to avoid any other runtime errors
        this.timer = ms => new Promise(res => setTimeout(res, ms));

        //set the fps 
        this.fps = 20
        this.interval = 1000

        // to control the user input and avoid multiple actions handlers
        this.isFired = false

        //save the fields, where the player can move
        this.savePossibleFields()
    }

    // start this method to run all things
    start() {
        
        // safe possible spots to walk in array
        
        player.instantiatePlayer()
        // set the default state of the player
        this.createPlayer(player.playerPosition)

        // run gameloop in intervals
      
        setInterval(this.gameLoop.bind(this), this.interval)
        
        
    }

    // draw the player character
    drawPlayer() {
        console.log(possibleFieldsToMove[player.playerPosition])

        possibleFieldsToMove[player.playerPosition].innerHTML = "+"


    }

    savePossibleFields() {
        let posLanes = Array.from(this.streetView);

        posLanes.forEach(lane => {
            let laneMore = Array.from(lane.getElementsByTagName("li"))
            possibleFieldsToMove.push(laneMore[4])
        })

        console.log(possibleFieldsToMove)

       
    }

    createPlayer(position) {


        // store all possible fields in an arra
        this.playerPos = possibleFieldsToMove[position];
        this.playerPos.innerHTML = "+"

    }


    updatePlayer() {

        
        document.addEventListener("keydown", function (event) {
            if (!this.isFired) {
                this.isFired = true
                switch (event.code) {
                    case "ArrowLeft":
                        // handle left arrow press
                        possibleFieldsToMove[player.playerPosition].innerHTML = " "
                        player.movePlayerLeft()
                        this.drawPlayer()


                        //this.playerPos.innerHTML = " "
                        //this.position --;

                        //this.playerPos = this.possibleFieldsToMove[this.position]


                        //this.playerPos.innerHTML = "+"
                        break;

                    case "ArrowRight":
                        possibleFieldsToMove[player.playerPosition].innerHTML = " "
                        player.movePlayerRight()
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



    async moveObstacle() { // We need to wrap the loop into an async function for this to work
        let randNum = Math.floor(Math.random() * this.streetView.length)
        let currLane = this.streetView[randNum];

        let tiles = currLane.getElementsByTagName("li");


        if (this.tileOnScreen == false) {
            this.tileOnScreen = true
            for (let i = 0; i < tiles.length; i++) {

                if (i == tiles.length - 1) {
                    if(tiles[i].innerHTML ==  "+"){
                        console.log("game over")
                        this.gameOver()
                    }
                    tiles[i].innerHTML = " "
                    this.tileOnScreen = false
                }
                tiles[i].innerHTML = "*"

                if (i != 0 ) {
                    tiles[i - 1].innerHTML = " "
                }

                await this.timer(500); // then the created Promise can be awaited

                
            }
            tiles[4].innerHTML = ""
        }

    }

    gameOver(){
        const gameOverDiv = document.getElementById("gameover");
        gameOverDiv.style.display = "block"

        const gameTable = document.getElementById("view");
        gameTable.style.display = "none"
        run = false
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

document.addEventListener("keydown", function(event){
    if(event.keyCode ==32){
        const startFont = document.getElementById("information");
        startFont.style.display = "none"
        // start the game
        game.start()

        // hide the start font
        
    }
})



//let playerPos = game.createPlayer()
//game.savePossibleFields()
//game.createPlayer()




//game.gameLoop()






