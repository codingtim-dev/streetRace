//import Player from "./player"
function createGame(){
    
    document.getElementById("gameover").style.display = "none"

    run= true
    let newPlayer = new Player()
    
  
   
    let newGame = new Game(newPlayer, moveableFields)

    document.addEventListener("keydown", function(event){
        if(event.keyCode ==32){
            const startFont = document.getElementById("information");
            startFont.style.display = "none"
            // start the game
            newGame.start(newPlayer, moveableFields);
    
            // hide the start font
            
        }
    })
    
    

    
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



    constructor(player, moveableFields) {

        // get all the lanes of the html site 
        // later generate a specific amount of lanes and store them into this variable
  

        // the obstacles should run async to avoid any other runtime errors
        this.timer = ms => new Promise(res => setTimeout(res, ms));

        //set the fps 
        this.fps = 20
        this.interval = 800
        this.player = player
        this.possibleFieldsToMove = moveableFields
        // to control the user input and avoid multiple actions handlers
        this.isFired = false
        this.field = playground
        this.tempo = 200
        this.tilesAmount = 0;
        //save the fields, where the player can move
        //this.savePossibleFields()
    }

    // start this method to run all things
    start() {
        document.getElementById("view").style.display = "flex";
        // safe possible spots to walk in array
        this.score =0
        this.player.instantiatePlayer()
        // set the default state of the player
        this.createPlayer(this.player.playerPosition)

        // run gameloop in intervals
      
        setInterval(this.gameLoop.bind(this), this.interval/this.fps)
        
        
    }

    // draw the player character
    drawPlayer() {
        console.log(this.possibleFieldsToMove[this.player.playerPosition])

        this.possibleFieldsToMove[this.player.playerPosition].innerHTML = "+"
        let field = this.possibleFieldsToMove[this.player-playerPosition]
        

    }

 


    createPlayer(position) {


        // store all possible fields in an arra
        this.playerPos = this.possibleFieldsToMove[this.player.playerPosition];
        this.playerPos.innerHTML = "+"

    }




    updatePlayer() {

        
        document.addEventListener("keydown", function (event) {
            if (!this.isFired) {
                this.isFired = true
                switch (event.code) {
                    case "ArrowLeft":
                        // handle left arrow press
                        this.possibleFieldsToMove[this.player.playerPosition].innerHTML = ""
                        try{
                            this.player.movePlayerLeft()
                            this.drawPlayer()
                        }catch{
                            return
                        }
                        break;

                    case "ArrowRight":
                        this.possibleFieldsToMove[this.player.playerPosition].innerHTML = ""

                        try{
                            this.player.movePlayerRight()
                            this.drawPlayer()
                        }catch{
                            return
                        }

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
        let randNum = Math.floor(Math.random() * ( moveableFields.length )) + 1
        let currLane = playground[randNum];
       
        //let tiles = currLane.getElementsByTagName("li");
       

        if(this.tilesAmount < moveableFields.length / 2){
            this.tilesAmount++
            this.tileOnScreen = true
            for (let i = 0; i < currLane.length; i++) {
                if (i == playground[randNum].length -1) {
                    if(playground[randNum][i].innerHTML ===  "+" ){
                        console.log("game over")
                        this.gameOver()
                    }
                    playground[randNum][i].innerHTML = ""
                    this.tileOnScreen = false
                }

                this.score ++;
                document.getElementById("score").innerHTML = this.score
                playground[randNum][i].innerHTML = "*"

                if (i != 0 ) {
                    playground[randNum][i - 1].innerHTML = ""
                }

                await this.timer(this.tempo); // then the created Promise can be awaited

                
            }
            
            
            playground[randNum][playground[randNum].length - 1].innerHTML = ""
            this.tilesAmount--;

        }
            
        

        

    }

    gameOver(){
        const gameOverDiv = document.getElementById("gameover");
        gameOverDiv.style.display = "flex"

        const gameTable = document.getElementById("view");
        gameTable.style.display = "none"
        run = false
        

        delete this
        
    }

    gameLoop() {

        if(run){
            this.moveObstacle();
    
            this.updatePlayer()

            
        }

        // create Player on the start pos
        //this.playerPos = this.createPlayer();

        // listen to spacebar press
        
    }
}
const game = new Game()

//let playerPos = game.createPlayer()
//game.savePossibleFields()
//game.createPlayer()