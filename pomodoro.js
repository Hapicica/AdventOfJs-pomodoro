const starStopButton = document.getElementsByClassName('start')[0]
const ring = document.getElementsByClassName('ring')[0]
const ringtone = new Audio('ringtone.wav');
const settingsIcon = document.getElementsByClassName('settings')[0];
const minInput = document.querySelector('.minutes input');
const secInput = document.querySelector('.seconds input');
let min;
let sec;
let interval;
let isCountingDown = false;

const countdownObject = {
    countdown() {
        if (sec == 0) {
            min -= 1;
            sec = 60;
        }
        sec -= 1;
        min = this.zeroPad(min, 2);
        sec = this.zeroPad(sec, 2);
        if(min < 0){
            pomodoroObject.stopTimer();
            return false;
        }
        minInput.value = min;
        secInput.value = sec;
        if (sec == 0 && min == 0) {
            pomodoroObject.stopTimer();
            ring.classList.add('ending');
            ringtone.play();
        }

    },

    zeroPad(num, places) {
        return String(num).padStart(places, '0')
    }
}

const pomodoroObject = {
    startTimer() {
        isCountingDown = true;
        minInput.setAttribute('disabled', true);
        secInput.setAttribute('disabled', true);
        min = minInput.value;
        sec = secInput.value;
        starStopButton.classList.add('stop');
        starStopButton.innerHTML = 'stop';
        if(min < 0){
            min = 0
        }
        if(sec > 60){
            sec = 60
        }
        if(sec < 0){
            sec = 0
        }
        interval = setInterval(countdownObject.countdown.bind(countdownObject), 1000);
    },

    stopTimer(){
        isCountingDown = false;
        clearInterval(interval);
        starStopButton.classList.remove('stop');
        starStopButton.innerHTML = 'start';
    },

    letSettings(){
        if(!isCountingDown){
            minInput.removeAttribute('disabled');
            secInput.removeAttribute('disabled');
        }
    }
}


starStopButton.addEventListener('click', () => {
    if(starStopButton.classList.contains('stop')){
        pomodoroObject.stopTimer();
    } else {
        pomodoroObject.startTimer();
    }
})
settingsIcon.addEventListener('click', pomodoroObject.letSettings)
