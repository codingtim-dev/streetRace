const playground = [];
const moveableFields = []
let rows;
let elements = 10

// get access to the dom
const container = document.getElementById("view");





function createPlayground(form){
    rows = form.rows.value

    if(rows == 0 || rows == 1){
        return
    }
    rows ++;

    document.getElementById("setup").style.display = "none"
    document.getElementById("information").style.display = "block"

        // instantiate playground
    for(let i = 0; i <= rows; i++){
        playground.push([])

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

    for(let k = 1; k < rows ; k++){
        moveableFields.push(playground[k][10])
    }

    console.log(moveableFields)
}

