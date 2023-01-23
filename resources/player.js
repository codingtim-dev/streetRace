class Player{
   constructor(){
    this.playerPosition = Math.floor( playground.length / 2);
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
        if(this.playerPosition < playground.length - 1){
            this.playerPosition++;
            return this.playerPosition;
        }
        console.log("right")
        return this.playerPosition
   }

   
}