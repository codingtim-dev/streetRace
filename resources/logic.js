//import Player from "./player"


let player = new Player()

class Game {

    isRunning = true;
    tileOnScreen = false
    possibleFieldsToMove = [];




    constructor() {

        this.streetView = document.getElementsByClassName("lane");
        this.timer = ms => new Promise(res => setTimeout(res, ms));
        this.fps = 10
        this.interval = 1000
        this.isFired = false
        this.savePossibleFields = this.savePossibleFields()
    }


    start() {
        
        // safe possible spots to walk in array
        

        // set the default state of the player
        this.createPlayer(player.playerPosition)

        // run gameloop in intervals
      
        setInterval(this.gameLoop.bind(this), this.interval)
        
        
    }


    drawPlayer() {
        console.log(this.savePossibleFields[player.playerPosition])

        this.savePossibleFields[player.playerPosition].innerHTML = "+"


    }

    savePossibleFields() {
        let posLanes = Array.from(this.streetView);

        posLanes.forEach(lane => {
            let laneMore = Array.from(lane.getElementsByTagName("li"))
            this.possibleFieldsToMove.push(laneMore[4])
        })

        console.log(this.possibleFieldsToMove)

        return this.possibleFieldsToMove;
    }

    createPlayer(position) {


        // store all possible fields in an arra
        this.playerPos = this.possibleFieldsToMove[position];


        this.playerPos.innerHTML = "+"

    }


    updatePlayer() {

        
        document.addEventListener("keydown", function (event) {
            if (!this.isFired) {
                this.isFired = true
                switch (event.code) {
                    case "ArrowLeft":
                        // handle left arrow press
                        this.possibleFieldsToMove[player.playerPosition].innerHTML = " "
                        player.movePlayerLeft()
                        this.drawPlayer()


                        //this.playerPos.innerHTML = " "
                        //this.position --;

                        //this.playerPos = this.possibleFieldsToMove[this.position]


                        //this.playerPos.innerHTML = "+"
                        break;

                    case "ArrowRight":
                        this.possibleFieldsToMove[player.playerPosition].innerHTML = " "
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

                tiles[i].innerHTML = "*"

                if (i != 0) {
                    tiles[i - 1].innerHTML = " "
                }

                await this.timer(500); // then the created Promise can be awaited

                if (i == tiles.length - 1) {
                    if(tiles[i].innerHTML = "+"){
                        console.log("game over")
                        this.gameOver()
                    }
                    tiles[i].innerHTML = " "
                    this.tileOnScreen = false
                }
            }
        }

    }

    gameOver(){
        const gameOverDiv = document.getElementById("gameover");
        gameOverDiv.style.display = "block"

        const gameTable = document.getElementById("view");
        gameTable.style.display = "none"
        this.isRunning = false
    }

    gameLoop() {

        if(this.isRunning){
            document.addEventListener("keydown", function (event) {
                if (event.key == " " || event.code == "Space" || event.keyCode == 32) {
                    this.isRunning = true
                    console.log(this.isRunning)
    
    
                }
            })
    
    
            this.moveObstacle(this.streetView);
    
            this.updatePlayer()
        }

        // create Player on the start pos
        //this.playerPos = this.createPlayer();

        // listen to spacebar press
        
    }
}


const game = new Game()

game.start()
//let playerPos = game.createPlayer()
//game.savePossibleFields()
//game.createPlayer()




//game.gameLoop()






