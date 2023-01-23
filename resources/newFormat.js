const playground = [];
const moveableFields = []
let rows;
let elements = 10

// get access to the dom
const container = document.getElementById("view");



console.log(playground)
console.log(moveableFields)

function createPlayground(form){
    rows = form.rows.value

    document.getElementById("setup").style.display = "none"

        // instantiate playground
    for(let i = 0; i <= rows; i++){
        playground.push([])

        playground[i].push(new Array(elements))
        let row = document.createElement("ul");

        

        for(let j = 0; j <= elements; j++){
            let rowElement = document.createElement("li")
            row.append(rowElement)


            if(i == 0 || i == rows){
                //playground[i][j] = "#"    
                playground[i][j] = rowElement
                rowElement.innerHTML = "####"
                row.classList.add("border")

            }else if(i > 0 && i < rows && j == 10){
                playground[i][j] = rowElement;
                rowElement.innerHTML = ""
                moveableFields.push(playground[i][j])

            }
            else{
                //playground[i][j] = "1"
                playground[i][j] = rowElement
                rowElement.innerHTML = " "
                row.classList.add("lane")
            }
            
        }

        container.append(row)

    }
}

