class Player{
   constructor(){
    this.playerPosition = 1
   }

   instantiatePlayer(){

    return this.playerPosition;
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
        if(this.playerPosition < 2){
            this.playerPosition++;
            return this.playerPosition;
        }
        console.log("right")
        return this.playerPosition
   }

   
}