// by making this global I can access it on gameEnd === win and stop timer
// haven't figured out a way to kill it otherwise
let interval = "";

function startTimer(duration, displayLevel, displayTimer) {
    let timer = duration, minutes, seconds;
    // assigning setInterval to a variable means I can use the variable as the intervalID
    // clearInterval cancels intervals by ID
    interval = setInterval(function () {
                    minutes = parseInt(timer / 60, 10)
                    seconds = parseInt(timer % 60, 10);

                    minutes = minutes < 10 ? "0" + minutes : minutes;
                    seconds = seconds < 10 ? "0" + seconds : seconds;

                    displayLevel.textContent = " Level " + level;
                    displayTimer.textContent = "Time Remaining: " + minutes + ":" + seconds;
                    // at timer end, game ends
                    if (--timer < 0 ){ 
                    // stop interval from repeating
                    clearInterval(interval);
                    // gameEnd
                    let loss = 'loss';
                    gameEnd(loss);
                    }

                }, 1000);
  }
  

function timer () {
    // //shorter for testing only
    // switch(level){
    //     case 1:
    //         time = .4;
    //         break;
    //     case 2:
    //         time = .5;
    //         break;
    //     case 3:
    //         time = 1;
    //         break;
    //     case 4:
    //         time = 3;
    //         break;
    //     case 5:
    //         time = 3;
    //         break;
    //     default:
    //         console.error("level was not valid");
    //         break;
    // }
    switch(level){
        case 1:
            time = 1;
            break;
        case 2:
            time = 1.25;
            break;
        case 3:
            time = 1.5;
            break;
        case 4:
            time = 1.75;
            break;
        case 5:
            time = 2;
            break;
        default:
            console.error("level was not valid");
            break;
    }

    let minutes = 60 * time,
    displayLevel = document.querySelector('.level');
    displayTimer = document.querySelector('.timer');
    startTimer(minutes, displayLevel, displayTimer);
};