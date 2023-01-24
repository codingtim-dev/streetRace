const playground = [];
const moveableFields = []
let rows;
let elements = 10

// get access to the dom
const container = document.getElementById("view");



// dynamic creation of the field

function createPlayground(form){

    // get the value from the form to establish the lanes
    rows = form.rows.value

    // handle error input
    if(rows == 0 || rows == 1){
        return
    }
    // for better coordination across the moveable fields for the player
    rows ++;

    // switches the screen view
    document.getElementById("setup").style.display = "none"
    document.getElementById("information").style.display = "block"

    // instantiate playground
    for(let i = 0; i <= rows; i++){
        playground.push([])

        // create a 2dim array / matrix
        playground[i].push(new Array(elements))
        let row = document.createElement("ul");

        

        for(let j = 0; j <= elements; j++){
            let rowElement = document.createElement("li")
            row.append(rowElement)


            if(i == 0 || i == rows ){
                //playground[i][j] = "#"    
                playground[i][j] = rowElement
                rowElement.innerHTML = "####"
                row.classList.add("border")

            }else if(i > 0 && i < rows && j == 10){
                rowElement.style.color = "red"
                playground[i][j] = rowElement;
                rowElement.innerHTML = ""
                

            }
            else{
                //playground[i][j] = "1"
                playground[i][j] = rowElement
                rowElement.innerHTML = ""
                row.classList.add("lane")
            }
            
        }

        
        container.append(row)
        
    }

    // push all moveable fields into an array for better control later
    for(let k = 1; k < rows ; k++){
        moveableFields.push(playground[k][10])
    }

    //console.log(moveableFields)
}

