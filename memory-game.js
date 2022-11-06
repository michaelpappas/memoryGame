"use strict";

/** Memory game: find matching pairs of cards and flip both of them. */

const FOUND_MATCH_WAIT_MSECS = 1000;
const COLORS = [
  "red", "blue", "green", "orange", "purple",
  "red", "blue", "green", "orange", "purple",
];

const colors = shuffle(COLORS);

createCards(colors);


/** Shuffle array items in-place and return shuffled array. */

function shuffle(items) {
  // This algorithm does a "perfect shuffle", where there won't be any
  // statistical bias in the shuffle (many naive attempts to shuffle end up not
  // be a fair shuffle). This is called the Fisher-Yates shuffle algorithm; if
  // you're interested, you can learn about it, but it's not important.

  for (let i = items.length - 1; i > 0; i--) {
    // generate a random index between 0 and i
    let j = Math.floor(Math.random() * i);
    // swap item at i <-> item at j
    [items[i], items[j]] = [items[j], items[i]];
  }

  return items;
}

/** Create card for every color in colors (each will appear twice)
 *
 * Each div DOM element will have:
 * - a class with the value of the color
 * - a click event listener for each card to handleCardClick
 */

let cardCount = 0;
let card1 = null;
let score = 0;



function createCards(colors) {
  let count = 1;
  const gameBoard = document.getElementById("game");
  for (let color of colors) {
    let div = document.createElement('div')
    div.className = color;
    div.setAttribute('data-color', color);
    div.style.backgroundColor=('black');
    div.addEventListener('click', function(e){
      handleCardClick(e);
    })
    gameBoard.append(div);
  }
  let cards = gameBoard.children;
  for(let card of cards){
    card.id = 'card'+count
    count++
  }
}

/** Flip a card face-up. */

function flipCard(card) {
  card.target.style.removeProperty('background-color');
}

/** Flip a card face-down. */

function unFlipCard(card) {
  if(!match){ //if matchCards() hasn't made match true then cards will flip over.
    card.target.style.backgroundColor='black';
    console.log('unflip');
  }
}

/** Handle clicking on a card: this could be first-card or second-card. */
let match = false;

function handleCardClick(evt) {
  match = false
  if(cardCount == 0){
    card1 = evt;
    cardCount++;

  }
  if(cardCount == 2){
    matchCards(card1, evt)
    setTimeout(function(){
      unFlipCard(card1)
      unFlipCard(evt)
      cardCount = 0
      }, FOUND_MATCH_WAIT_MSECS);
  }
    flipCard(card1)
    flipCard(evt);
    cardCount++;

}

const scoreSpan = document.getElementById("score");
function matchCards(existingCard, newCard){

  if(existingCard.target.className === newCard.target.className && existingCard.id != newCard.target.id){
    console.log('match')
    match = true;
    score++;
    scoreSpan.innerText = '';
    scoreSpan.innerText = score;
  }
}

const time = document.getElementById('time')

const resetBtn = document.querySelector('#reset');
resetBtn.addEventListener('click', function(e){
  let board = document.querySelector("#game");
  const divs = board.children;
  while (board.hasChildNodes()){
    board.removeChild(board.firstChild);
  }
  let cards = shuffle(COLORS)
  createCards(cards);
  time.innerText = '0';
  scoreSpan.innerText = '0';
})

//** timer */


let timer = 0;
setInterval(increaseTimer, 1000)
function increaseTimer(){
  if(score < colors.length/2){
    timer++;
    time.innerText = timer;
  }
}



