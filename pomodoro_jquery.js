const starStopButton = $(".start");
const ring = $('.ring');
const ringtone = new Audio('ringtone.wav');
const settingsIcon = $('.settings');
const minInput = $(".minutes input");
const secInput = $(".seconds input");
let min;
let sec;
let interval;
let isCountingDown = false;


function zeroPad(num, places) {
    return String(num).padStart(places, '0')
}

function countdown() {
    if(sec == 0){
        min -= 1;
        sec = 60;
    }
    sec -= 1;
    min = zeroPad(min, 2);
    sec = zeroPad(sec, 2);
    $(minInput).val(min);
    $(secInput).val(sec);
    if(sec == 0 && min == 0){
        stopTimer();
        $(ring)
            .addClass('ending');
        ringtone.play();
    }
}

function startTimer() {
    isCountingDown = true;
    minInput.prop('disabled', true);
    secInput.prop('disabled', true);
    min = $(minInput).val();
    sec = $(secInput).val();
    $(starStopButton)
        .addClass('stop')
        .html('stop');
    if(min < 0){
        min = 0
    }
    if(sec > 60){
        sec = 60
    }
    if(sec < 0){
        sec = 0
    }
    interval = setInterval(countdown, 1000);
}
function stopTimer(){
    isCountingDown = false;
    clearInterval(interval);
    $(starStopButton)
        .removeClass('stop')
        .html('start');
}

function letSettings(){
    if(!isCountingDown){
        minInput.prop('disabled', false);
        secInput.prop('disabled', false);
    }
}


   $(starStopButton).on('click', () => {
       if($(starStopButton).hasClass('stop')){
           stopTimer();
       } else {
           startTimer();
       }
   });
   $(settingsIcon).on('click', letSettings);
