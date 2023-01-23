class Player{
   constructor(){
    this.playerPosition = 1
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