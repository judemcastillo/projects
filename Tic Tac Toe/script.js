window.addEventListener('DOMContentLoaded', () => {
    let PlayerX = '';
    let PlayerO = '';
    const tiles = Array.from(document.querySelectorAll('.tile'));
    const resetButton = document.querySelector(".reset");
    const playerDisplay = document.querySelector('.display-player');
    const announcer = document.querySelector('.announcer');
    const submitButton = document.querySelector("#submit");
    

    submitButton.addEventListener("click",(e)=>{
        e.preventDefault(); // ⛔ Prevents page reload!
        PlayerX = document.querySelector("#playerXName").value.trim();
        PlayerO = document.querySelector("#playerOName").value.trim();
        const playerForm = document.querySelector('#player-overlay');

        if(!PlayerO || !PlayerX){
            alert("Please fill in all fields.");
            return;
        }
        playerForm.style.display = "none";
        playerDisplay.innerText = PlayerX; // show first player's name

    });


    let board =['','','','','','','','',''];
    let currentPlayer = `X`;
    let isGameActive = true;

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
            isGameActive = false;
            return;
        }

    if (!board.includes(''))
        announce(TIE);
    };

    const announce = (type) => {
        switch(type){
            case PLAYERO_WON:
                announcer.innerHTML = `${PlayerO}<span class="playerO">O</span> Won`;
                break;
            case PLAYERX_WON:
                announcer.innerHTML = `${PlayerX}<span class="playerX">X</span> Won`;
                break;
            case TIE:
                announcer.innerText = 'Tie';
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

    tiles.forEach( (tile, index) => {
        tile.addEventListener('click', () => userAction(tile, index));
    });

    resetButton.addEventListener('click', resetBoard);
});


