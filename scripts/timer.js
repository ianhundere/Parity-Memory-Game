// by making this global I can access it on gameEnd === win and stop timer
// haven't figured out a way to kill it otherwise
let interval = '';

function startTimer(duration, displayLevel, displayTimer) {
    let timer = duration,
        minutes,
        seconds;
    // assigning setInterval to a variable means I can use the variable as the intervalID
    // clearInterval cancels intervals by ID
    interval = setInterval(function() {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? '0' + minutes : minutes;
        seconds = seconds < 10 ? '0' + seconds : seconds;

        displayLevel.textContent = ' Level ' + level;
        displayTimer.textContent = 'Time Remaining: ' + minutes + ':' + seconds;
        // at timer end, game ends
        if (--timer < 0) {
            // stop interval from repeating
            clearInterval(interval);
            // gameEnd
            let loss = 'loss';
            gameEnd(loss);
        }
    }, 1000);
}

function timer() {
    const time = {
        1: 1,
        2: 1.25,
        3: 1.5,
        4: 1.75,
        5: 2
    };

    let minutes = 60 * time[level],
        displayLevel = document.querySelector('.level');
    displayTimer = document.querySelector('.timer');
    startTimer(minutes, displayLevel, displayTimer);
}
