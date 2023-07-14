function resetGameStatus() {
    activeplayer = 0;
    currentRound = 1;
    gameOverElement.firstElementChild.innerHTML=
    'You are won <span id="winner-name">PLAYER NAME</span>!';
    gameOverElement.style.display ='none';
    let gameBordIndex=0;
    for(let i = 0; i<3;i++){
        for(let j = 0;j<3;j++){
            gameData[i][j] = 0;
            const gameBordItemElement=gameBordElement.children[gameBordIndex];
            gameBordItemElement.textContent='';
            gameBordItemElement.classList.remove('disabled');
            gameBordIndex++;
        }
    }
}





function startNewGame() {
    if(players[0].name === '' || players[1].name === ''){
        alert('please costum a player name!');
        return;
    }
    
resetGameStatus();

    activePlayerNameElement.textContent = players[activeplayer].name;
    gameAreaElement.style.display = 'block';
}
function switchPlayer() {
    if(activeplayer === 0){
        activeplayer = 1;
    } else{
        activeplayer = 0;
    }
    activePlayerNameElement.textContent = players[activeplayer].name;
}


function selectGameField(event){
    if(event.target.tagName !=='LI'){
        return;


    }

     const selectedField = event.target;
     const selectedColumn = selectedField.dataset.col-1;
const selectedRow = selectedField.dataset.row-1;
if(gameData[selectedRow][selectedColumn]>0){
    alert('please enter in the empty field!')
    return;
}

      selectedField.textContent = players[activeplayer].symbol;
     selectedField.classList.add('disabled');

gameData[selectedRow] [selectedColumn]= activeplayer +1;

const winnerID = checkForGameOver();
if(winnerID !==0){
    endGame(winnerID);
}

currentRound++;
switchPlayer();
}

function checkForGameOver(){
    for(let i = 0;i<3;i++){
    if(
        gameData[i][0]>0 &&
          gameData[i][0] === gameData[i][1] &&
          gameData[i][0]  === gameData[i][2]
          ){
    return gameData[i][0];
}
}

for(let i = 0;i <3;i++){
    if(
        gameData[0][i] >0 &&
          gameData[0][i] === gameData[1][i] &&
          gameData[0][i]  === gameData[2][i]
          ){
    return gameData[0][i];
}
}
if(
    gameData[0][0]>0 && 
    gameData[0][0] === gameData[1][1] && 
     gameData[1][1] === gameData[2][2]
     ){
        return gameData[0][0]
     }

if(
    gameData[2][0]>0 && 
    gameData[2][0] === gameData[1][1] && 
     gameData[1][1] === gameData[0][2]
     ){
        return gameData[2][0];

}
if(currentRound === 9){
    return -1;
}

return 0;
  
}

function endGame(winnerID){
    gameOverElement.style.display='block';

if(winnerID > 0){
    const winnerName =players[winnerID - 1].name;
    gameOverElement.firstElementChild.firstElementChild.textContent =
    winnerName;
}else{
    gameOverElement.firstElementChild.textContent = 'It\'s a draw'
}

}
