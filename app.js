let card = document.getElementsByClassName("card");
let cardArray = [...card]
console.log(cardArray);

function shuffle(array) {
    var currentIndex = array.length,
        temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
};
const table = document.getElementById("table")
document.body.onload = newGame();

function newGame() {
    cardArray = shuffle(cardArray);
    for (var i = 0; i < cardArray.length; i++) {
        table.innerHTML = "";
        [].forEach.call(cardArray, function(item) {
            table.appendChild(item);
        });
        cardArray[i].classList.remove("show", "open", "match", "disabled");
    }
}



let modal = document.getElementById("resultPanel")
const resetbtn = document.getElementById("reset")
const reloadbtn = document.getElementById("reload")

let rating = document.querySelectorAll(".stars li");


let sameCard = document.getElementsByClassName("match");

var flipped = [];
flipCard = function() {
    this.classList.toggle("open");
    this.classList.toggle("show");
    this.classList.toggle("freeze");
};

function checker() {
    flipped.push(this);
    if (flipped.length === 2) {
        isSame(), countSteps();
    }
};

function same() {
    flipped[0].classList.add("match", "freeze");
    flipped[1].classList.add("match", "freeze");
    flipped[0].classList.remove("show", "open", "no-event");
    flipped[1].classList.remove("show", "open", "no-event");
    flipped = [];

}

function notSame() {
    flipped[0].classList.add("unmatched");
    flipped[1].classList.add("unmatched");
    freezeIt();
    setTimeout(function() {
        flipped[0].classList.remove("show", "open", "no-event", "unmatched");
        flipped[1].classList.remove("show", "open", "no-event", "unmatched");
        deFrostIt();
        flipped = [];
    }, 1100);
}

function deFrostIt() {
    Array.prototype.filter.call(cardArray, function(card) {
        card.classList.remove("freeze");
        for (var i = 0; i < sameCard.length; i++) {
            sameCard[i].classList.add("freeze");
        }
    });
}

function freezeIt() {
    Array.prototype.filter.call(cardArray, function(card) {
        card.classList.add("freeze");
    });
}

function isSame() {
    if (flipped[0].innerHTML === flipped[1].innerHTML) {
        same();
    } else {
        notSame();
    }
}

// Timer, Step Counter


let moves = document.querySelector(".moves");
let steps = 0;
const stars = document.querySelectorAll(".fa-star");

function countSteps() {
    steps++;
    moves.innerHTML = steps;
    if (steps == 1) {
        second = 0;
        minute = 0;
        hour = 0;
        startTimer();
    }

    if (steps > 10 && steps < 18) {
        for (i = 0; i < 3; i++) {
            if (i > 1) {
                stars[i].style.visibility = "collapse";
            }
        }
    } else if (steps > 19) {
        for (i = 0; i < 3; i++) {
            if (i > 0) {
                stars[i].style.visibility = "collapse";
            }
        }
    }
}

var second = 0,
    minute = 0;
hour = 0;
var timer = document.querySelector(".timer");
var interval;

function startTimer() {
    interval = setInterval(function() {
        timer.innerHTML = minute + "mins " + second + "secs";
        second++;
        if (second == 60) {
            minute++;
            second = 0;
        }
        if (minute == 60) {
            hour++;
            minute = 0;
        }
    }, 1000);
}

function theEnd() {
    if (sameCard.length == 16) {
        clearInterval(interval);
        yourTime = timer.innerHTML;

        // show congratulations modal
        modal.classList.add("show");

        // declare star rating variable
        var rating = document.querySelector(".stars").innerHTML;

        //showing move, rating, time on modal
        document.getElementById("numberOfSteps").innerHTML = steps;
        document.getElementById("rating").innerHTML = rating;
        document.getElementById("time").innerHTML = yourTime;



    };
}


function closer() {
    modal.classList.remove("show")
};



resetbtn.addEventListener("click", function() {
    closer()
});
reloadbtn.addEventListener("click", function refreshPage() {
    window.location.reload();
});

for (var i = 0; i < cardArray.length; i++) {
    card = cardArray[i];
    card.addEventListener("click", flipCard);
    card.addEventListener("click", checker);
    card.addEventListener("click", theEnd);
}