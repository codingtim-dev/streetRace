/*
    main script with the logic behind this game
    creates a game class where all the input is handled and converted
*/
let newGame

// is triggered by clicking the button after getting game over
function createGame(){
    
    // switches screen view

    run= true
    // instantiate new player and new game with the default settings
    let newPlayer = new Player()
   
    newGame = new Game(newPlayer, moveableFields)

    // awaits key input of the player

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


// game object
class Game {

    // setting the score 
    score = 0

    constructor(player, moveableFields) {

        // get all the lanes of the html site 
        // later generate a specific amount of lanes and store them into this variable
        // the obstacles should run async to avoid any other runtime errors
        this.timer = ms => new Promise(res => setTimeout(res, ms));
        this.shootTimer = ms => new Promise(res => setTimeout(res, ms))
        //set the fps 
        this.fps = 20
        this.interval = 1000
        this.player = player
        this.possibleFieldsToMove = moveableFields
        // to control the user input and avoid multiple actions handlers
        this.isFired = false
        this.shootFired = false
        this.field = playground
        this.tempo = 200
        this.tilesAmount = 0;

        this.obstacleChar = "*"
        this.shootParticleItem = "+"
        //save the fields, where the player can move
        //this.savePossibleFields()
    }

    // start this method to run all things
    start() {
        run = true
        this.score = 0
        this.tilesAmount = 0
        document.getElementById("view").style.display = "flex";
        document.getElementById("gameover").style.display = "none"
        
        this.score = 0
        
        this.tilesAmount = 0
        this.player.instantiatePlayer()
      
        // set the default state of the player
        this.createPlayer(this.player.playerPosition)

        // run gameloop in intervals
        document.getElementById("score").innerHTML = "Your score is: " + this.score
        setInterval(this.gameLoop.bind(this), this.interval/this.fps)
        
        
        
    }

    // draw the player character
    drawPlayer() {
        //console.log(this.possibleFieldsToMove[this.player.playerPosition])

        this.possibleFieldsToMove[this.player.playerPosition].innerHTML = this.player.playerCharacter
        let field = this.possibleFieldsToMove[this.player-playerPosition]
        

    }

    // creates the player at the beginning
    createPlayer(position) {


        // store all possible fields in an arra
        this.playerPos = this.possibleFieldsToMove[this.player.playerPosition];
        this.playerPos.innerHTML = this.player.playerCharacter

    }

    // update the player after every frame and handle events
    updatePlayer() {

        
        document.addEventListener("keydown", function (event) {

            // secures only one input at the time when the user presses the arrow keys
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
                    
                        // shoots
                        
                }

                if(this.isFired){
                    return
                }
            }

        }.bind(this));

        this.isFired = false

    }

     async shootParticlesTo(){

        

        
        let currLane = playground[this.player.playerPosition + 1] 

        // should create a particle following upwardss
        for( let i = currLane.length - 2; i > 0; i--){

            // check if there is any collision with obstacle
            
            // move the particle 
            currLane[i].innerHTML = this.shootParticleItem

            if((i +1 ) != currLane.length - 1 ){
                currLane[i +1].innerHTML = ""
            }

            if(i == 1){
                currLane[i].innerHTML = ""
            }
            
            await this.timer(this.tempo)
            // check if particle reaches top
        }
    }


    // move obstacle down to the player
    async moveObstacle() {
         // We need to wrap the loop into an async function for this to work
        let randNum = Math.floor(Math.random() * ( moveableFields.length )) + 1
        let currLane = playground[randNum];
        let isDestroyed = false
        //let tiles = currLane.getElementsByTagName("li");
       

        if(this.tilesAmount < moveableFields.length / 2){
            this.tilesAmount++
            this.tileOnScreen = true
            for (let i = 0; i < currLane.length; i++) {
                if(isDestroyed == false){
                    

                    if(playground[randNum][i].innerHTML === this.shootParticleItem ){
                        isDestroyed = true
                        console.log("hit")

                        // add score
                        this.score ++
                        document.getElementById("score").innerHTML = "Your score is: " + this.score
                        // destroy 
                        break
                    }

                    if (i != 0 ) {
                        playground[randNum][i - 1].innerHTML = ""
                    }


                    if (i == playground[randNum].length -1 ) {
                        if(playground[randNum][i].innerHTML ===  this.player.playerCharacter){
                            console.log("game over")
                            this.gameOver()
                        }
    
                        
                        //playground[randNum][i].innerHTML = ""
                        this.tileOnScreen = false
                    }
                    // draw the obstacle after all checking
                    playground[randNum][i].innerHTML = "*"
                    
                    if(playground[randNum][playground[randNum].length - 1].innerHTML == "*"){
                        playground[randNum][playground[randNum].length - 1].innerHTML = ""
                    }
                    
                    await this.timer(this.tempo); // then the created Promise can be awaited
                }else{
                    
                }
                

                
            }
            this.tilesAmount--;
            
            

        }
            
        

        

    }

    

    gameOver(){
        const gameOverDiv = document.getElementById("gameover");
        gameOverDiv.style.display = "flex"

        const gameTable = document.getElementById("view");
        gameTable.style.display = "none"
        run = false
        
       
        
        
    }

    gameLoop() {

        if(run){
            this.moveObstacle();
    
            this.updatePlayer()
            
            
            
            
            
            document.addEventListener("keydown", async (event) => {

                // secures only one input at the time when the user presses the arrow keys
                if (!this.shootFired) {
                    this.shootFired= true
                    switch (event.code) {
                        case "ArrowUp":
                            // handle left arrow press
                            this.shootParticlesTo()
                            break;
    
                        
                        
                            // shoots
                            
                    }
    
                    if(this.shootFired){
                        return
                    }
                }
                this.shootFired= false
            })
    
            
        

        // create Player on the start pos
        //this.playerPos = this.createPlayer();

        // listen to spacebar press
        
    }
}}


//let game = new Game()

//let playerPos = game.createPlayer()
//game.savePossibleFields()
//game.createPlayer()