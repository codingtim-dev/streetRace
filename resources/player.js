// create a player object to handle the positioning better 
class Player{
   constructor(){
    this.playerPosition = 1
    this.playerCharacter = "^"
   }

   instantiatePlayer(){

        this.playerPosition = 1
   }


   movePlayerLeft(){
        if(this.playerPosition > 0){
            this.playerPosition--;
            return this.playerPosition
        }
        console.log("left")
        return this.playerPosition
   }

   movePlayerRight(){
        if(this.playerPosition < moveableFields.length -1 ){
            this.playerPosition++;
            return this.playerPosition;
        }
        console.log("right")
        return this.playerPosition
   }

   

   
}