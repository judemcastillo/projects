window.addEventListener('DOMContentLoaded', () => {
    let PlayerX = 'Player';
    let PlayerO = 'Player';
    let playerODisplay = document.querySelector('#playerODisplay');
    let playerXDisplay = document.querySelector('#playerXDisplay');
    const tiles = Array.from(document.querySelectorAll('.tile'));
    const resetButton = document.querySelector(".reset");
    const playerDisplay = document.querySelector('.display-player');
    const announcer = document.querySelector('.announcer');
    const submitButton = document.querySelector("#submit");
    const playButton = document.querySelector(".play");
    const playerForm = document.querySelector('#player-overlay');
    const playerNames = document.querySelector('.Player-Names');
    const newGameButton = document.querySelector(".newGame");
    
    playButton.addEventListener("click", (e) => {
        e.preventDefault();
        playButton.id = "hide";
        playerNames.removeAttribute('id');
    }
    );

    submitButton.addEventListener("click",(e)=>{
        e.preventDefault(); // ⛔ Prevents page reload!
        PlayerX = document.querySelector("#playerXName").value.trim();
        PlayerO = document.querySelector("#playerOName").value.trim();

        if(!PlayerO || !PlayerX){
            alert("Please fill in all fields.");
            return;
        }
        console.log(PlayerX, PlayerO);
        playerXDisplay.innerText = PlayerX+": ";
        playerODisplay.innerText = PlayerO+": ";
        playerForm.style.display = "none";
        playerDisplay.innerText = PlayerX; // show first player's name

    });


    let board =['','','','','','','','',''];
    let currentPlayer = `X`;
    let isGameActive = true;
    let PlayerXScore = 0;
    let PlayerOScore = 0;

    const PLAYERX_WON = 'PLAYERX_WON';
    const PLAYERO_WON = 'PLAYERO_WON';
    const TIE = 'TIE';

    /*
        Indexes in the board
        [0] [1] [2]
        [3] [4] [5]
        [6] [7] [8]
    */

    const winningConditions = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ];




    //checks if the tile has a value or not
    const isValidAction = (tile) => {
        if (tile.innerText === 'X' || tile.innerText === 'O'){
            return false;
        }

        return true;
    };

    const userAction = (tile, index) => {
        if(isValidAction(tile) && isGameActive) {
            tile.innerText = currentPlayer;
            tile.classList.add(`player${currentPlayer}`);
            updateBoard(index);
            handleResultValidation();
            changePlayer();
        }
    }

    const updateBoard =  (index) => {
        board[index] = currentPlayer;
    }

    function handleResultValidation() {
        let roundWon = false;
        for (let i = 0; i <= 7; i++) {
            const winCondition = winningConditions[i];
            const a = board[winCondition[0]];
            const b = board[winCondition[1]];
            const c = board[winCondition[2]];
            if (a === '' || b === '' || c === '') {
                continue;
            }
            if (a === b && b === c) {
                roundWon = true;
                break;
            }
        }

    if (roundWon) {
            announce(currentPlayer === 'X' ? PLAYERX_WON : PLAYERO_WON);
            if (currentPlayer === 'X') {
                PlayerXScore++;
                document.querySelector("#playerXScore").innerText = PlayerXScore;
            }
            else {
                PlayerOScore++;
                document.querySelector("#playerOScore").innerText = PlayerOScore;
            }
            isGameActive = false;
            return;
        }

    if (!board.includes(''))
        announce(TIE);
    };

    const announce = (type) => {
        switch(type){
            case PLAYERO_WON:
                announcer.innerHTML = `<span class="results"><span class="playerO">${PlayerO}</span> <span class="white">Won!</span></span>`;
                break;
            case PLAYERX_WON:
                announcer.innerHTML = `<span class="results"><span class="playerX">${PlayerX}</span> <span class="white">Won!</span></span>`;
                break;
            case TIE:
                announcer.innerHTML = '<span class="results"><span class="white">It\'s a Tie!</span></span>';

        }

        announcer.classList.remove('hide');
    };

    const changePlayer = () => {
        playerDisplay.classList.remove(`player${currentPlayer}`);
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        playerDisplay.innerText = currentPlayer === 'X' ? PlayerX : PlayerO;
        playerDisplay.classList.add(`player${currentPlayer}`);
    }

    const resetBoard = () => {
        board = ['', '', '', '', '', '', '', '', ''];
        isGameActive = true;
        announcer.classList.add('hide');

        if (currentPlayer === 'O') {
            changePlayer();
        }

        tiles.forEach(tile => {
            tile.innerText = '';
            tile.classList.remove('playerX');
            tile.classList.remove('playerO');
        });
    }
    const newGame = () => {
        // Reset everything
        board = ['', '', '', '', '', '', '', '', ''];
        isGameActive = true;
        currentPlayer = 'X';
    
        tiles.forEach(tile => {
            tile.innerText = '';
            tile.classList.remove('playerX');
            tile.classList.remove('playerO');
        });
    
        // Reset scores
        PlayerXScore = 0;
        PlayerOScore = 0;
        document.querySelector("#playerXScore").innerText = PlayerXScore;
        document.querySelector("#playerOScore").innerText = PlayerOScore;
    
        // Reset player names
        PlayerX = 'Player';
        PlayerO = 'Player';
        playerXDisplay.innerText = "Player X:";
        playerODisplay.innerText = "Player O:";
        playerDisplay.innerText = '';
    
        // Reset form
        document.querySelector("#playerXName").value = '';
        document.querySelector("#playerOName").value = '';
        document.querySelector(".play").classList.remove("hide");
        document.querySelector(".Player-Names").classList.remove("hide");
        playerForm.style.display = "flex";
    
        // Hide announcer
        announcer.classList.add('hide');
    };
    
    newGameButton.addEventListener('click', newGame);
    

    tiles.forEach( (tile, index) => {
        tile.addEventListener('click', () => userAction(tile, index));
    });

    resetButton.addEventListener('click', resetBoard);
});


