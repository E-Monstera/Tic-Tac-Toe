
//Form selectors
const name1 = document.querySelector('#name1');
const name2 = document.querySelector('#name2');


// Setting up the buttons
const buttons = document.querySelectorAll('.tile');
const resetBtn = document.querySelector('#reset');
const setterBtn = document.querySelector('#setter');

// Event listener for each of the buttons. It removes the 'b' in the ID, leaving us with the number of the target button. This allows the value to be added directly to the corresponding array index.
buttons.forEach((btn) => {
    btn.addEventListener('click', function (e){
        let target = e.target.id;
        target = target.slice(1, 2);
        game.event(target - 1);
    })
});

// For clearing the game board
resetBtn.addEventListener('click', () => {
    game.restart();
});

// Even listener for the customization button
setterBtn.addEventListener('click', () => {
    let pieceValue;
    let radioButtons = document.getElementsByName('xo');
    radioButtons.forEach((radio) => {
        if (radio.checked){
            pieceValue=radio.value;
        }
    });
    game.setAttributes(name1.value, name2.value, pieceValue);

});
// End of buttons





//Factory function to create the players
const playerFactory = (name, piece) =>{
    return {name, piece};
};

//module pattern for gameboard
const gameboard = (() => {
    let array = ['', '', '', '', '', '', '', '', ''];
    const getBoard = () => array;                           //Returns the array to load the gameboard
    const updateBoard = (index, piece) => {                 //Updates the array when a player makes a move
        array[index] = piece;
    };
    const reset = () => {array = ['', '', '', '', '', '', '', '', ''];};    //Resets the array
    return {getBoard, updateBoard, reset};
})();



// modules for playing the game
const game = (() => {

    let turn = 1;           //This holds the players turn and is updated each time someone plays
    let player1;            //Variables to hold the player objects
    let player2;

    const setAttributes = (name1, name2, pieceOption) => {      //Sets the player name and chosen game piece when the 'set attributes' button is pressed
        player1 = playerFactory(name1, pieceOption);
        if (pieceOption == 'x'){
            player2 = playerFactory(name2, 'o');
        }
        else{
            player2 = playerFactory(name2, 'x');
        }
    };

    const _displayWinner = (str) => {               //Displays the appropriate winner
        if (str == player1.piece){
            alert(`${player1.name} wins!`);
        }
        else if (str == player2.piece){
            alert(`${player2.name} wins!`);
        }
        
    };

    const _winner = () =>{                      //Private function that checks the array to see if there's a winner
        let arr = gameboard.getBoard();
        // Checks across
        if ((arr[0] == arr[1]) && (arr[1] == arr[2])){
            _displayWinner(arr[0]);
        }
        else if ((arr[3] == arr[4]) && (arr[4] == arr[5])){
            _displayWinner(arr[3]);
        }
        else if ((arr[6] == arr[7]) && (arr[7] == arr[8])){
            _displayWinner(arr[8]);
        }

        // Checks vertically
        else if ((arr[0] == arr[3]) && (arr[3] == arr[6])){
            _displayWinner(arr[0]);
        }
        else if ((arr[1] == arr[4]) && (arr[4] == arr[7])){
            _displayWinner(arr[1]);
        }
        else if ((arr[2] == arr[5]) && (arr[5] == arr[8])){
            _displayWinner(arr[2]);
        }

        //Checks diagonally
        else if ((arr[0] == arr[4]) && (arr[4] == arr[8])){
            _displayWinner(arr[0]);
        }
        else if ((arr[2] == arr[4]) && (arr[4] == arr[6])){
            _displayWinner(arr[2]);
        }
        else{
            let count = 0;
            arr.forEach(element =>
            { 
                if (element == ''){
                    count ++
                }
            });
            if (count === 0){
                alert("It's a tie");
            }
        }
        console.log("not yet");
        console.log(arr);
        //Checks to see if there was a winner
    };

    //Initially loads the board and sets the player stats, will need to be adjusted later to include names and choices for x or o.
    const play = () => {
        player1 = playerFactory('Player 1', 'x');
        player2 = playerFactory('Player 2', 'o');
        _display();
    };

    //This function is used anytime a player clicks on the game board. It first checks to make sure there isn't already a 
    //'piece' on that tile, then updates the board and the array according to the player 
    const event = (index) => {              
        let array = gameboard.getBoard();
        if (array[index] === ''){
            if (turn === 1){        
                gameboard.updateBoard(index, player1.piece);
                turn ++;
            }
            else{
                gameboard.updateBoard(index, player2.piece);
                turn --;
            }
            _display();             //Displays the updated board
            _winner();              //Checks for a winner/end of game
        }
    };

    const restart = () => {         //Resets the board, triggered by the 'reset' button
        gameboard.reset();
        _display();
    };

    const _display = () => {
        //Displays the entire array to the board
        let counter = 0;
        let array = gameboard.getBoard();
        buttons.forEach((btn) =>  {
            if (array[counter] === 'o'){
                btn.classList.add('Oicon');
            }
            else if (array[counter] === 'x'){
                btn.classList.add('Xicon');
            }
            else{
                btn.classList.remove('Xicon');
                btn.classList.remove('Oicon');
            }
                counter ++;
            });
    };

    return {play, event, restart, setAttributes};
})();

//Loads the board with default values
game.play();                                           






