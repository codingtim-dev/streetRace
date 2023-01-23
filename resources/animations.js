

// create a galaxy atmosphere with some fany animations
let starsAmount = 50;
let starsLength = "3px";
let stars = []

let contain = document.createElement("div")
contain.style.position = "absolute"
contain.style.width = "100%"
contain.style.height = "100vh"
contain.style.top = "0"
contain.style.zIndex = "9999"
contain.style.overflow = "hidden"

document.body.append(contain)


for(let i = 0; i < starsAmount; i++){
    const star = document.createElement("i");
    
    
    star.classList.add("star")
    
    star.style.height = Math.random() * 7 + "px"


    let top=Math.random();
    top=top*window.innerHeight;                
    let left=Math.random();
    left=left*window.innerWidth;                      
    star.style.top=top+"px";                   
    star.style.left=left+"px";    

    stars.push(star)
    contain.append(star)

}




console.log("Star created")

stars.forEach((el, i, ra) => {
    let to = {
      x: Math.random() * (11),
      y: Math.random() * 12
    };
  
    let anim = el.animate(
      [
        { transform: "translate(0, 0)" },
        { transform: `translate(0, ${to.y}rem)` }
      ],
      {
        duration: (Math.random() + 1) * 2000, // random duration
       
        fill: "both",
        iterations: Infinity,
        easing: "ease-in-out"
      }
    );
  });

