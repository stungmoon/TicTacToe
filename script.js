const playerFactory = (name, move, score) => {
    return {name, move, score}
  };

// sample players

const playerX = playerFactory("Player X", "X", 0);
const playerO = playerFactory("Player O", "O", 0);

// display module
const displayController = (() => {

    const closeForm = document.getElementById("cancel").addEventListener("click", (e) => {
        document.getElementById("getPlayerInfo").style.display = "none";
    })

    const displayWinner = (winnerText) => {
        return document.getElementById("footerText").innerText = winnerText;
    }

    const startBtn = document.getElementById("start").addEventListener("click", (e) => {
            window.location.reload();
        })
    
    return {closeForm, startBtn, displayWinner}
})();

// gameboard setup and game flow
// first loop for array, second for event listeners
const gameBoardSetup = (() => {
    let gameBoard = [];
    let playerSelection = "";
    let playerMove = "";
    let gameTurn = 0;

    // generates array from gameboard grid    
    // adds click listeners and contains game moves
    const gameFlow = function () {
        for (let i = 0; i < 9; i++) {
            gameBoard.push(document.getElementById(i + 1));
            gameBoard[i].addEventListener("click", function getLocation() {
                // if already filled out stop and remove event
                if (playerMove === "") {
                    playerMove = playerX.move;
                    document.getElementById(i + 1).innerText = playerMove;
                    gameBoard.splice(i, 1, playerMove);
                    checkWinner("X");
                    gameTurn++;
                    if (gameTurn == 9) {
                        checkDraw();
                    }
                } else if (playerMove === playerX.move) {
                    playerMove = playerO.move;
                    document.getElementById(i + 1).innerText = playerMove;
                    gameBoard.splice(i, 1, playerMove);
                    checkWinner("O");
                    gameTurn++;
                    if (gameTurn == 9) {
                        checkDraw();
                    }
                } else if (playerMove === playerO.move) {
                    playerMove = playerX.move;
                    document.getElementById(i + 1).innerText = playerMove;
                    gameBoard.splice(i, 1, playerMove);
                    checkWinner("X");
                    gameTurn++;
                    if (gameTurn == 9) {
                        checkDraw();
                    }
                }
                console.log(gameBoard);
                
                console.log("you clicked region number " + i);
            }, {once:true})
        }
    };

    const checkWinner = (playerSelection) => {
        for (let i = 0; i < gameBoard.length; i++) {
            if (gameBoard[0] == playerSelection && gameBoard[1] == playerSelection && gameBoard[2] == playerSelection ||
                gameBoard[3] == playerSelection && gameBoard[4] == playerSelection && gameBoard[5] == playerSelection ||
                gameBoard[6] == playerSelection && gameBoard[7] == playerSelection && gameBoard[8] == playerSelection ||
                gameBoard[0] == playerSelection && gameBoard[3] == playerSelection && gameBoard[6] == playerSelection ||
                gameBoard[1] == playerSelection && gameBoard[4] == playerSelection && gameBoard[7] == playerSelection ||
                gameBoard[2] == playerSelection && gameBoard[5] == playerSelection && gameBoard[8] == playerSelection ||
                gameBoard[0] == playerSelection && gameBoard[4] == playerSelection && gameBoard[8] == playerSelection ||
                gameBoard[2] == playerSelection && gameBoard[4] == playerSelection && gameBoard[6] == playerSelection) {
                    if (playerSelection = "X") {
                        playerX.score++;
                        let winnerText = playerX.name + " wins!"
                        displayController.displayWinner(winnerText);
                        playerMove = "";
                        break;
                    } else if (playerSelection = "O") {
                        playerO.score++;
                        let winnerText = playerO.name + " wins!"
                        displayController.displayWinner(winnerText);
                        playerMove = "";
                        gameTurn = 0;
                        break;
                    }
                }
            }
        };

    const checkDraw = () => {
        if (gameBoard[0] !== "" && gameBoard[1] !== "" && gameBoard[2] !== "" && gameBoard[3] !== "" && gameBoard[4] !== "" && gameBoard[5] !== "" && gameBoard[6] !== "" && gameBoard[7] !== "" && gameBoard[8] !== "") {
            let winnerText = "Alas, it's a draw..."
            displayController.displayWinner(winnerText); 
            playerMove = "";
            gameTurn = 0;
        }
    }

    const reset = () => {
        for (let i = 1; i < 10; i++) {
            let temp = document.getElementById(i);
            temp.innerHTML = "";  
            gameBoard.forEach(el => {
                gameBoard[i - 1] = "";
            });
        }
    }
    gameFlow();
    checkWinner(playerSelection);
    
    return {gameBoard, gameFlow, checkWinner, checkDraw, reset}
    
})();

