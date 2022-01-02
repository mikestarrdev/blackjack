'use strict';

const btnNewGame = document.querySelector('.new-game');
const btnHit = document.querySelector('.hit');
const btnStand = document.querySelector('.stand');

const playerCards = document.querySelectorAll('.players-card');
const dealerCards = document.querySelectorAll('.dealers-card');

const playerTotalScore = document.querySelector('#score--player');
const dealerTotalScore = document.querySelector('#score--dealer');

// cards arrays hold cards for each game
const cardsPlayer = [];
const cardsDealer = [];
// total score arrays hold scores until page is reloaded
let totalScorePlayer = 0;
let totalScoreDealer = 0;
let scoreCounterPlayer = 0;
let scoreCounterDealer = 0;
let winner;
let acesInput;
let isAce;

// cardDeck contains data of cards
const cardDeck = {
  1: [10, 'cards/10_of_clubs.png'],
  2: [10, 'cards/10_of_diamonds.png'],
  3: [10, 'cards/10_of_hearts.png'],
  4: [10, 'cards/10_of_spades.png'],
  5: [2, 'cards/2_of_clubs.png'],
  6: [2, 'cards/2_of_diamonds.png'],
  7: [2, 'cards/2_of_hearts.png'],
  8: [2, 'cards/2_of_spades.png'],
  9: [3, 'cards/3_of_clubs.png'],
  10: [3, 'cards/3_of_diamonds.png'],
  11: [3, 'cards/3_of_hearts.png'],
  12: [3, 'cards/3_of_spades.png'],
  13: [4, 'cards/4_of_clubs.png'],
  14: [4, 'cards/4_of_diamonds.png'],
  15: [4, 'cards/4_of_hearts.png'],
  16: [4, 'cards/4_of_spades.png'],
  17: [5, 'cards/5_of_clubs.png'],
  18: [5, 'cards/5_of_diamonds.png'],
  19: [5, 'cards/5_of_hearts.png'],
  20: [5, 'cards/5_of_spades.png'],
  21: [6, 'cards/6_of_clubs.png'],
  22: [6, 'cards/6_of_diamonds.png'],
  23: [6, 'cards/6_of_hearts.png'],
  24: [6, 'cards/6_of_spades.png'],
  25: [7, 'cards/7_of_clubs.png'],
  26: [7, 'cards/7_of_diamonds.png'],
  27: [7, 'cards/7_of_hearts.png'],
  28: [7, 'cards/7_of_spades.png'],
  29: [8, 'cards/8_of_clubs.png'],
  30: [8, 'cards/8_of_diamonds.png'],
  31: [8, 'cards/8_of_hearts.png'],
  32: [8, 'cards/8_of_spades.png'],
  33: [9, 'cards/9_of_clubs.png'],
  34: [9, 'cards/9_of_diamonds.png'],
  35: [9, 'cards/9_of_hearts.png'],
  36: [9, 'cards/9_of_spades.png'],
  37: ['ace', 'cards/ace_of_clubs.png'],
  38: ['ace', 'cards/ace_of_diamonds.png'],
  39: ['ace', 'cards/ace_of_hearts.png'],
  40: ['ace', 'cards/ace_of_spades.png'],
  41: [10, 'cards/jack_of_clubs.png'],
  42: [10, 'cards/jack_of_diamonds.png'],
  43: [10, 'cards/jack_of_hearts.png'],
  44: [10, 'cards/jack_of_spades.png'],
  45: [10, 'cards/king_of_clubs.png'],
  46: [10, 'cards/king_of_diamonds.png'],
  47: [10, 'cards/king_of_hearts.png'],
  48: [10, 'cards/king_of_spades.png'],
  49: [10, 'cards/queen_of_clubs.png'],
  50: [10, 'cards/queen_of_diamonds.png'],
  51: [10, 'cards/queen_of_hearts.png'],
  52: [10, 'cards/queen_of_spades.png'],
};

let cardUniqueID;
// cardValue is 1 - 11;
let cardValue;
// cardPng is file name
let cardPng;

// generate new card
const generateNewCard = () => {
  cardValue = 0;
  // random number between 1 - 52
  const cardNum = Math.trunc(Math.random() * (52 - 0) + 1);
  cardUniqueID = cardDeck[cardNum];
  cardValue = cardDeck[cardNum][0];
  cardPng = cardDeck[cardNum][1];
  return cardUniqueID;
};

// function initiates new game
const newGame = () => {
  winner = '';
  cardsPlayer.length = 0;
  cardsDealer.length = 0;

  btnHit.classList.remove('hidden');

  // 1. Make first 2 cards display back, hide other 4
  for (let i = 0; i < playerCards.length; i++) {
    if (i === 0 || i === 1) playerCards[i].src = 'cards/back.png';
    else playerCards[i].classList.add('hidden');
  }

  for (let i = 0; i < dealerCards.length; i++) {
    if (i === 0 || i === 1) dealerCards[i].src = 'cards/back.png';
    else dealerCards[i].classList.add('hidden');
  }

  // Deal 2 cards to player and dealer
  pushCardToPlayer();
  pushCardToPlayer();
  pushCardToDealer();
  pushCardToDealer();

  /*
  // reveal hit button
  hitBtn.classList.remove('hidden');
  // reveal stand button
  standBtn.classList.remove('hidden');
  */
};

btnNewGame.addEventListener('click', newGame);

const pushCardToPlayer = () => {
  generateNewCard();
  if (cardsPlayer.includes(cardPng) || cardsDealer.includes(cardPng))
    // push card to array
    pushCardToPlayer();
  else cardsPlayer.push(cardValue);

  playerCards[cardsPlayer.length - 1].src = cardPng;
  playerCards[cardsPlayer.length - 1].classList.remove('hidden');
};

// calculates the sum of an arrays
const sumHand = arr => {
  return arr.reduce((acc, i) => acc + i, 0);
};

const pushCardToDealer = () => {
  // un-hide cards in object
  const revealDealerCard = () => {
    // let length = cardsDealer.length - 1;
    if (cardsDealer.length - 1 === 0) {
      dealerCards[cardsDealer.length - 1].src = cardPng;
      dealerCards[cardsDealer.length - 1].classList.remove('.hidden');
    } else {
      dealerCards[cardsDealer.length - 1].src = 'cards/back.png';
      dealerCards[cardsDealer.length - 1].classList.remove('hidden');
    }
  };

  generateNewCard();
  // evaluates if card has been dealt already
  if (cardsPlayer.includes(cardPng) || cardsDealer.includes(cardPng)) {
    // if card has been dealt, run function again
    pushCardToDealer();
  } else if (cardValue === 'ace') {
    if (sumHand(cardsDealer) <= 10) {
      cardValue = 11;
      cardsDealer.push(cardValue);
      revealDealerCard();
    } else if (sumHand(cardsDealer) >= 11) {
      cardValue = 1;
      cardsDealer.push(cardValue);
      revealDealerCard();
    }
  } else {
    cardsDealer.push(cardValue);
    revealDealerCard();
    // console.log(`dealer cardValue: [${cardValue}]`);
  }
};

btnHit.addEventListener('click', pushCardToPlayer);

const stand = () => {
  btnHit.classList.add('hidden');
  // user assigns value to aces
  /*
  changeAce();
    */
  // if dealer's hand < 17, new card dealt
  if (sumHand(cardsDealer) < 17) pushCardToDealer();
  //   stand();
  // winnerLogic();

  // dealers hand > 16, run winnerLogic()
  if (sumHand(cardsDealer) >= 17) null; // winnerLogic();
};

btnStand.addEventListener('click', stand);

// let user select value of ace
const changeAce = () => {
  // loop over cardsPlayer array
  for (let isAce = 0; isAce < cardsPlayer.length; isAce++) {
    // change if card is 1 or 11
    if (
      cardsPlayer[isAce] === 11 ||
      cardsPlayer[isAce] === 1 ||
      cardsPlayer[isAce] === 'ace'
    ) {
      let usrInput = () => {
        acesInput = prompt(
          "You've been dealt an Ace! Select it's value as 1 or 11"
        );
        if (acesInput == '1' || acesInput == '11') {
          // next line takes user input
          // console.log(`acesInput = ${acesInput}. Replacing`);
          // console.log(`isAce = ${isAce}`);
          cardsPlayer[isAce] = Number(acesInput);
          // console.log(cardsPlayer);
        } else {
          console.log(
            `You must enter 1 or 11 to continue. (re-running changeAce())`
          );
          // re-run function until user enters 1 or 11
          usrInput();
        }
      };
      usrInput();
    }
  }
};
