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
  console.log('flip');
}

/** Flip a card face-down. */

function unFlipCard(card) {
  console.log('unflip');
  card1 = null;
  if(!match){ //if matchCards() hasn't made match true then cards will flip over.
    card.target.style.backgroundColor='black';
  }
}

/** Handle clicking on a card: this could be first-card or second-card. */
let match = false;

function handleCardClick(evt) {
  match = false
  // console.log("cardCount click "+cardCount);
  // console.log(evt.target.className);
  console.log(cardCount)
  // debugger
  if(cardCount == 0){
    console.log("count0");
    card1 = evt;
  }
  // debugger
  if(cardCount == 1){
    matchCards(card1, evt)
  }
  if(cardCount < 2){
    flipCard(evt);
    cardCount++;
    setTimeout(function(){
      unFlipCard(evt)
      cardCount--;
      console.log("cardCount unFlip "+cardCount);
      }, 2000);
  }
}

function matchCards(existingCard, newCard){
  if(existingCard.target.className === newCard.target.className && existingCard.id != newCard.target.id){
    console.log('match')
    match = true;
  }
}

// const resetBtn = document.querySelector('#reset');
// // resetBtn.addEventListener('click', function(e){
// //   const gameBoard = document.querySelector("#game");
// //   const div = gameBoard.children;
// //   for(let i=0; i<10; i++){
// //     gameBoard.remove(div);
// //   }
// //   createCards(shuffle(COLORS));
// // })