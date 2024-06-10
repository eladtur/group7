// JavaScript for Timer and Button Functionality

// Countdown Timer
function startTimer(duration, display) {
    let timer = duration, hours, minutes, seconds;
    setInterval(function () {
        hours = parseInt(timer / 3600, 10);
        minutes = parseInt((timer % 3600) / 60, 10);
        seconds = parseInt(timer % 60, 10);

        hours = hours < 10 ? "0" + hours : hours;
        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = "Timer For Popup Sale " + hours + ":" + minutes + ":" + seconds;

        if (--timer < 0) {
            timer = duration;
        }
    }, 1000);
}

window.onload = function () {
    let saleTime = 16 * 3600 + 20 * 60 + 59; // 16:20:59 in seconds
    let display = document.querySelector('#timer');
    startTimer(saleTime, display);
};

// Button Functionality
function buyNow() {
    alert("Thank you for your purchase!");
}

function addToCart() {
    alert("Item added to your cart!");
}