/*
 * Create a list that holds all of your cards
 */


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

// Set card icon type
const iconType = [ "diamond", "paper-plane-o", "anchor", "bolt", "cube", "leaf", "bicycle", "bomb"]
const cardIcon = iconType.concat(iconType);

// Create new set of cards function
function createDeck() {
    const shuffledCardIcon = shuffle(cardIcon);
    for (let i = 0; i < shuffledCardIcon.length; i++){
        const thisCardIcon = shuffledCardIcon[i];
        const iconClass = "fa fa-" + thisCardIcon.toString()

        const icon = document.createElement("i");
        icon.className = iconClass;

        const card = document.createElement("li");
        card.className = "card";

        card.appendChild(icon);
        $(".deck").append(card);
    }
}

// Count moves function
let moves = 0
let stars = 3
function CountMove() {
    moves++
    $(".moves").text(moves);

    // Change star rating on moves count
    if (moves === 10) {
        stars--;
        $(".stars li i").slice(2).removeClass("fa-star").addClass("fa-star-o");
    } else if (moves === 15) {
        stars--;
        $(".stars li i").slice(1,2).removeClass("fa-star").addClass("fa-star-o");
    } 
}

// Create star rating function
function createStars() {
    $(".stars").empty();
    for (let i = 0; i < 3; i++) {
        const star = document.createElement("li");
        const starIcon = document.createElement("i");
        starIcon.className = "fa fa-star";

        star.appendChild(starIcon);

        $(".stars").append(star);
    }
}

// Create stopwatch function
let s = 0
let m = 0
function createTimer() {
    s++
    if (s === 60) {
        m++;
        s = 0;
    }
    let time = (m < 10 ? "0" + m.toString() : m.toString()) + ":" + (s < 10 ? "0" + s.toString() : s.toString());
    $(".timer").text(time);
}

let openedCard = [] // Use to store opened card when matching
function clickCard() {
    if (this.className === "card" && openedCard.length !== 2) {
        const icon = this.children[0].className;
        openedCard.push( icon );

        $(this).addClass("open show matching");
        
        if (openedCard.length === 2) {
            CountMove();
            setTimeout (function(){     
                if (openedCard[0] === openedCard [1]) {
                    $(".matching").addClass("match");
                } 
                $(".matching").removeClass("open show matching");
                openedCard.length = 0;
                if ($(".match").length === cardIcon.length) {
                    clearInterval(startTimer);
                    congratulation();
                }
            }, 500);
        }
    }
}

// Create congratulation modal when win
function congratulation() {
    $("#CongratModal").css("display","block");
    $("#Time").text($(".timer").text());
    $("#TotalMovesCount").text(moves);
    $("#TotalStarsCount").text(stars);
    $("#PlayAgain").click(function() {
        $("#CongratModal").css("display","none");
        restart();
    })
    $("#StopPlaying").click(function() {
        $("#CongratModal").css("display","none");
    })
}

let startTimer // Use to store IntervalID
function restart() {
    $(".deck").empty();
    $(".moves").text(0);
    $(".timer").text("00:00");
    moves = 0;
    stars = 3;
    s = 0;
    m = 0;

    createStars();
    createDeck();
    startTimer = setInterval(createTimer,1000);

    $(".card").click(clickCard);
}

$(".restart").click(function() {
    clearInterval(startTimer);
    restart();
})

$(document).ready(restart());

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */


