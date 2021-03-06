
// Setting up the buttons
const buttons = document.querySelectorAll('.tile');
const resetBtn = document.querySelector('#reset');

buttons.forEach((btn) => {
    btn.addEventListener('click', function (e){
        let target = e.target.id;
        target = target.slice(1, 2);
        game.event(target - 1);
    })
});

resetBtn.addEventListener('click', () => {
    game.restart();
});

// End of buttons





//Factory function to create the players
const playerFactory = (name, piece) =>{
    return {name, piece};
};

//module pattern for gameboard
const gameboard = (() => {
    let array = ['', '', 'x', '', '', '', 'o', '', ''];
    const getBoard = () => array;
    const updateBoard = (index, piece) => {
        array[index] = piece;
    };
    const reset = () => {array = ['', '', '', '', '', '', '', '', ''];};
    return {getBoard, updateBoard, reset};
})();



// modules for playing the game
const game = (() => {

    let turn = 1;           //This holds the players turn and is updated each time someone plays
    let player1;
    let player2;

    const _displayWinner = (str) => {
        if (str == player1.piece){
            alert("Player 1 Wins!");
        }
        else if (str == player2.piece){
            alert("Player 2 Wins!");
        }
        
    };

    const _winner = () =>{
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
        else if ((arr[2] == arr[5]) && (arr[5] == arr[7])){
            _displayWinner(arr[2]);
        }

        //Checks diagonally
        else if ((arr[0] == arr[4]) && (arr[4] == arr[7])){
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
        player1 = playerFactory('player1', 'x');
        player2 = playerFactory('player2', 'o');
        _display();

    };

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
            _display();
            _winner();
        }
        else{
            console.log('already played there. turn = ' + turn);
        }
        //Triggered by an event handler to add X or O to a board (depending on current player)
        //Also needs to call gameboard.updateBoard(btnPressed, currentPiece)
        //Then runs the winner function to see if there's a winner
    };

    const restart = () => {
        gameboard.reset();
        _display();
        //Resets the board. Add a button to trigger this 
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

    return {play, event, restart};
})();

game.play();                                           











// Keeping these as notes - This was an experiment on using the modules. 
// const gameboard = (() => {
//     array = [-1, -1, -1, -1, -1, -1, -1, -1, -1];
//     const getBoard = () => array;
//     const updateBoard = (index, piece) => {array[index] = piece;};
//     const attempt = () => 'hello';
//     return {getBoard, updateBoard, attempt};

// })();

// console.table(gameboard.getBoard());
// console.log(gameboard.attempt());
