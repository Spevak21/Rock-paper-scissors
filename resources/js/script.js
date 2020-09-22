var dataController = (() => {

    // Object for players data
    var data = {
        scores : [0, 0],
        finalScore: 10,
        controls: [true, true],
        player1Choise: '',
        player2Choise: ''
    };

    // Function for removing focus from 'final score' input in case players press key for 'rock', 'paper' or 'scissors'
    var removeInputFocus = () => {
        if (document.activeElement) {
            document.activeElement.blur();
        }
    };

    return {
        // Function for reseting score values on game start or 'reset' button is being pressed
        resetValues: () => {
            data.scores = [0, 0];
            finalScore = 10;
        },

        // Function to forward data object from 'data controller' to 'controller' 
        getData: () => {
            return data;
        },

        // Function for detecting which key is pressed for Player 1
        detectPlayer1: (event, data) => {
            if(data.controls[0]) {
                if(event.keyCode === 90 || event.which === 90) {
                    data.controls[0] = false;
                    data.player1Choise = 'rock';
                    removeInputFocus();
                }else if(event.keyCode === 88 || event.which === 88) {
                    data.controls[0] = false;
                    data.player1Choise = 'paper';
                    removeInputFocus();
                }else if(event.keyCode === 67 || event.which === 67) {
                    data.controls[0] = false;
                    data.player1Choise = 'scissors';
                    removeInputFocus();
                }
            }
        },

        // Function for detecting which key is pressed for Player 2
        detectPlayer2: (event, data) => {
            if(data.controls[1]) {
                if(event.keyCode === 37 || event.which === 37) {
                    data.controls[1] = false;
                    data.player2Choise = 'rock';
                    removeInputFocus();
                }else if(event.keyCode === 40 || event.which === 40) {
                    data.controls[1] = false;
                    data.player2Choise = 'paper';
                    removeInputFocus();
                }else if(event.keyCode === 39 || event.which === 39) {
                    data.controls[1] = false;
                    data.player2Choise = 'scissors';
                    removeInputFocus();
                }
            }
        },

        // Preventing value change for 'final score' input on keyboard arrows keypress since player 2 commands are on those
        preventArrowChange: (event) => {
            if (event.keyCode === 38 || event.which === 38 || event.keyCode === 40 || event.which === 40) {
                event.preventDefault();
            }
        },

        // Function preventing mid game 'final score' changes to be less then player current score (higher one)
        midGameGoalChange: () => {
            if(data.scores[0] > 0 || data.scores[1] > 0) {
                var input = document.getElementById('goal');
                var max = Math.max(...data.scores);
                if(parseInt(input.value) <= max) {
                    input.value = max + 1; 
                }
            }
        },

        // Function preventing 'final score' input value to be higher then 1000 and demanding correct form with regular expression
        inputCheck: () => {
            var input = document.getElementById('goal');
            var matched = input.value.match(/^\d+$/);
            if(matched && parseInt(input.value) > 1000) {
                input.value = 1000;
            }
            if(!matched) {
                input.value = 10;
            }
            
        },

        // Function for resetting both players choices after game turn
        resetPlayers: () => {
            data.player1Choise = '';
            data.player2Choise = '';
            data.controls = [true, true];
        },

        // Function for updating score after comparison of their turn choices
        updateScore: (winner) => {
            if(winner === 1) {
                data.scores[0]++;
            }else if(winner === 2) {
                data.scores[1]++;
            }
        },

        // Function for comparing both players 'scores' with 'final score'
        trackScore: () => {
            var finalScore = parseInt(document.getElementById('goal').value);
            if(data.scores[0] === finalScore) {
                return 1;
            }else if(data.scores[1] === finalScore) {
                return 2
            }
        },

        // Function for UI update for end screen in case one of the players have reached final score
        winnerAnnouncement: (winner) => {
            if(winner === 1) {
                if(document.querySelector('.name-1').value === '') {
                    document.querySelector('.winner-name').innerText = document.querySelector('.name-1').placeholder;
                }else {
                    document.querySelector('.winner-name').innerText = document.querySelector('.name-1').value;
                }
                document.querySelector('.section-end-screen').style.display = 'flex';
            }else if(winner === 2) {
                if(document.querySelector('.name-2').value === '') {
                    document.querySelector('.winner-name').innerText = document.querySelector('.name-2').placeholder;
                }else {
                    document.querySelector('.winner-name').innerText = document.querySelector('.name-2').value;
                }
                document.querySelector('.section-end-screen').style.display = 'flex';
            }
        }
    };
})();

var uiController = (() => {

    return {
        // Function for displaying game rules when the button 'RULES' is being pressed
        showRules: () => {
            document.querySelector('.section-rules').style.display = 'flex';
            setTimeout(() => {
                document.querySelector('.section-rules').classList.add('show-rules');
            }, 3);
        },

        // Function for hiding rules when user click outside of the image
        hideRules: () => {
            var targetElement = event.target;

            if(targetElement === document.querySelector('.section-rules') && targetElement !== document.querySelector('.pop-up')) {
                
                setTimeout(() => {
                    document.querySelector('.section-rules').style.display = 'none';
                }, 500);
                document.querySelector('.section-rules').classList.remove('show-rules');
            }
        },

        // Function for updating scores on UI
        updateUI: (data) => {
            document.querySelectorAll('.score')[0].innerText = data.scores[0];
            document.querySelectorAll('.score')[1].innerText = data.scores[1];
        },

        // Function for resetting all UI elements
        resetUI: () => {
            document.querySelectorAll('.score')[0].innerText = '0';
            document.querySelectorAll('.score')[1].innerText = '0';
            document.getElementById('goal').value = 10;

            document.querySelector('.hand-1').src = 'resources/img/hand-rock-1.png';
            document.querySelector('.hand-2').src = 'resources/img/hand-rock-2.png';
            document.querySelector('.name-1').value = '';
            document.querySelector('.name-2').value = '';
        },

        // Function for changing hand images depending on player choice and manipulating with hand animations
        animateHands: (choise1, choise2) => {

            setTimeout(() => {
                if(choise1 === 'rock') {
                    document.querySelector('.hand-1').src = 'resources/img/hand-rock-1.png';
                }else if(choise1 === 'paper') {
                    document.querySelector('.hand-1').src = 'resources/img/hand-paper-1.png';
                }else if(choise1 === 'scissors') {
                    document.querySelector('.hand-1').src = 'resources/img/hand-scissors-1.png';
                }

                if(choise2 === 'rock') {
                    document.querySelector('.hand-2').src = 'resources/img/hand-rock-2.png';
                }else if(choise2 === 'paper') {
                    document.querySelector('.hand-2').src = 'resources/img/hand-paper-2.png';
                }else if(choise2 === 'scissors') {
                    document.querySelector('.hand-2').src = 'resources/img/hand-scissors-2.png';
                }
            }, 1850);

            document.querySelector('.hand-1').classList.add('shake-left');
            document.querySelector('.hand-2').classList.add('shake-right');
            setTimeout(() => {
                document.querySelector('.hand-1').classList.remove('shake-left');
                document.querySelector('.hand-2').classList.remove('shake-right'); 
            }, 2000);

            setTimeout(() => {
                document.querySelector('.hand-1').src = 'resources/img/hand-rock-1.png';
                document.querySelector('.hand-2').src = 'resources/img/hand-rock-2.png';
            }, 3000);
        },

        // Function for comparing players choices and to determine turn winner
        determineRoundWinner: (player1, player2) => {
            if((player1 === 'rock' && player2 === 'scissors') || (player1 === 'paper' && player2 === 'rock') || (player1 === 'scissors' && player2 === 'paper')) {
                return 1;
            }else if((player1 === 'rock' && player2 === 'paper') || (player1 === 'paper' && player2 === 'scissors') || (player1 === 'scissors' && player2 === 'rock')) {
                return 2;
            }else {
                return 3;
            }
        }
    };
})();

var controller = ((dataCtrl, uiCtrl) => {

    // Setting up all event listeners
    var setupEventListeners = () => {
        document.querySelector('.btn-rules').addEventListener('click', uiCtrl.showRules);
        document.querySelector('.section-rules').addEventListener('click', uiCtrl.hideRules);
        document.querySelector('.btn-reload').addEventListener('click', () => {
            dataCtrl.resetValues();
            uiCtrl.resetUI();
        });
        document.getElementById('goal').addEventListener('keydown', dataCtrl.preventArrowChange);
        document.addEventListener('keydown', keyListener);
        document.getElementById('goal').addEventListener('change', () => {
            dataCtrl.inputCheck();
            dataCtrl.midGameGoalChange();
        });
        document.querySelector('.play-again').addEventListener('click', () => {
            dataCtrl.resetValues();
            uiCtrl.resetUI();
            document.querySelector('.section-end-screen').style.display = 'none';
        });
    };

    // Function for event listener that prevents user input after both players have made their choice until all animations and calculations have been finished
    var keyListener = (event) => {
        let data = dataCtrl.getData();

        if (document.activeElement !== document.querySelector('.name-1') && document.activeElement !== document.querySelector('.name-2')) {
            dataCtrl.detectPlayer1(event, data);
            dataCtrl.detectPlayer2(event, data);
        }
        
        if(data.player1Choise !== '' && data.player2Choise !== '') {
            document.removeEventListener('keydown', keyListener);
            uiCtrl.animateHands(data.player1Choise, data.player2Choise);

            setTimeout(() => {
                var winner = uiCtrl.determineRoundWinner(data.player1Choise, data.player2Choise);
                dataCtrl.updateScore(winner);
                data = dataCtrl.getData();
                uiCtrl.updateUI(data);
                dataCtrl.resetPlayers();
            }, 2000);
            setTimeout(() => {
                document.addEventListener('keydown', keyListener);
                var isWinner = dataCtrl.trackScore();
                dataCtrl.winnerAnnouncement(isWinner);
            }, 3000);
        }
    }

    return {
        // Function for game initialising
        init: () => {
            uiCtrl.resetUI();
            setupEventListeners();
        }
    };
})(dataController, uiController);

controller.init();