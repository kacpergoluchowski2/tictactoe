let size = document.querySelector("#size-board")
const SIGN = ["X", "O"];
let currentPlayer = 0;
let startApp = () => {
    document.querySelector("#board").innerHTML = "";
    createBoard();
    reset();
    fillTables();
    move();
}

document.querySelector("#start-game").addEventListener(`click`, startApp);

function reset() {
    round = horizontalMarks = verticalMarks = rightSlant = leftSlant = 0;
}

function fillTables() {
    fields = [];
    for(let i = 0; i < size.value; i++) {
        fields[i] = [];
    }

    let currentField = 0;
    for(let i = 0; i < size.value; i++) {
        for(let j = 0; j < size.value; j++) {
            fields[i][j] = document.querySelectorAll("td")[currentField]
            currentField++;
        }
    }
}

function createBoard() {
    let board = document.createElement("table");
    document.querySelector("#board").appendChild(board);
    createRows();
}

function createRows() {
    for(let i = 0; i < size.value; i++) {
        let row = document.createElement("tr");
        document.querySelector("table").appendChild(row);
        createColumns(document.querySelectorAll("tr").length);
    }
}

function createColumns(length) {
    for(let i = 0; i < size.value; i++) {
        let column = document.createElement("td");
        document.querySelectorAll("tr")[length-1].appendChild(column)
    }
}

async function move() {
    for(let i = 0; i < size.value; i++) {
        for(let j = 0; j < size.value; j++) {
            fields[i][j].addEventListener('click', () => {
                if(fields[i][j].innerHTML!=="") {
                    window.alert("Pole zajęte!");
                }
                else {
                    fields[i][j].innerHTML = SIGN[currentPlayer];
                    currentPlayer++;
                }
                if(currentPlayer == 2) 
                    currentPlayer = 0;
                round++;
                checkWin();
                checkDraw();
            })
        }
    }
}

function checkWin() {
    for(let i = 0; i < SIGN.length; i++)
    {
        for(let rows = 0; rows < size.value; rows++) {
            if(fields[rows][0].innerHTML == SIGN[i]) {
                for(let columns = 0; columns < size.value; columns++) {
                    if(fields[rows][columns].innerHTML == SIGN[i]) {
                        horizontalMarks++;
                    }
                    else {
                        horizontalMarks = 0;
                        break;
                    }
                }
            }
        }
        if(horizontalMarks==size.value) {
            window.alert(`${SIGN[i]} WYGRYWA!`);
            return 0;
        }
    }

    for(let i = 0; i < 2; i++) {
        for(let columns = 0; columns < size.value; columns++) {
            if(fields[0][columns].innerHTML == SIGN[i]) {
                for(let rows = 0; rows < size.value; rows++) {
                    if(fields[rows][columns].innerHTML == SIGN[i]) {
                        verticalMarks++;
                        if(verticalMarks==size.value) {
                            window.alert(`${SIGN[i]} WYGRYWA!`);
                            return 0;
                        }    
                    }
                    else {
                        verticalMarks = 0;
                        break;
                    }
                }
            }
        }
    }

    for(let i = 0; i < SIGN.length; i++) {
        for(let slant = size.value-1; slant >= 0; slant--) {
            if(fields[slant][slant].innerHTML == SIGN[i]) {
                rightSlant++;
                if(rightSlant==size.value) {
                    window.alert(`${SIGN[i]} WYGRYWA!`);
                    return 0;
                } 
            }
            else {
                rightSlant = 0;
                break;
            }
        }
    }

    let x = 0;
    for(let sign = 0; sign < 2; sign++) {
        for(let i = size.value-1; i >= 0; i--) {
            if(fields[x][i].innerHTML == SIGN[sign]) {
                x++;
                leftSlant++;
                if(leftSlant==size.value) {
                    window.alert(`${SIGN[sign]} WYGRYWA!`);
                    return true;
                } 
            }
            else {
                leftSlant = 0;
                x=0;
                break;
            }
        }
    }
}

function checkDraw() {
    if(round == Math.pow(size.value, 2)) 
        window.alert("Remis! Wszystkie pola zostały zajęte!")
}

