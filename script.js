'use strict';

const btnNewGame = document.querySelector('.new-game');
const btnHit = document.querySelector('.hit');
const btnStand = document.querySelector('.stand');
const btnReset = document.querySelector('.reset');

const playerCards = document.querySelectorAll('.players-card');
const dealerCards = document.querySelectorAll('.dealers-card');

const aceField = document.querySelector('.ace-field');
const aceBtn1 = document.querySelector('.ace-btn-1');
const aceBtn11 = document.querySelector('.ace-btn-11');

const headline = document.querySelector('h1');
const header = document.querySelector('#header');

const playerScoreTotal = document.querySelector('#player-score');
const dealerScoreTotal = document.querySelector('#dealer-score');

// cards arrays hold cards for each game
const cardsPlayer = [];
const cardsDealer = [];

let totalScorePlayer = 0;
let totalScoreDealer = 0;

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
  cardsPlayer.length = 0;
  cardsDealer.length = 0;

  headline.textContent = '♠️ ♥️ Winners Only Blackjack ♣️ ♦️';
  header.style.backgroundColor = 'rebeccapurple';

  btnHit.classList.remove('hidden');
  btnStand.classList.remove('hidden');
  btnReset.classList.remove('hidden');

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
  //   pushCardToDealer();
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
    if (cardsDealer.length - 1 === 0) {
      dealerCards[cardsDealer.length - 1].src = cardPng;
      dealerCards[cardsDealer.length - 1].classList.remove('.hidden');
    } else {
      dealerCards[cardsDealer.length - 1].src = cardPng;
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

// Only called when user clicks standBtn
const isAce = () => {
  // Loop over array looking for ace
  for (let card = 0; card < cardsPlayer.length; card++) {
    if (cardsPlayer[card] === 'ace') {
      // reveal ace field
      aceField.classList.remove('hidden');
      aceField.style.display = 'flex';
      playerCards[card].style.border = '2px solid purple';

      // call hideAce() after user clicks
      const hideAce = function () {
        aceField.style.display = '';
        playerCards[card].style.border = '';
        aceField.classList.add('hidden');
      };

      // ace buttons
      aceBtn1.addEventListener('click', () => {
        cardsPlayer[card] = 1;
        hideAce();
        if (cardsPlayer.includes('ace')) {
          isAce();
        }
        while (sumHand(cardsDealer) < 17) pushCardToDealer();
        winnerLogic();
      });
      aceBtn11.addEventListener('click', () => {
        cardsPlayer[card] = 11;
        hideAce();
        if (cardsPlayer.includes('ace')) {
          isAce();
        }
        while (sumHand(cardsDealer) < 17) pushCardToDealer();
        winnerLogic();
      });
    }
  }
};

// hit button
btnHit.addEventListener('click', function () {
  if (cardsPlayer.length < 6) pushCardToPlayer();
});

// stand button
btnStand.addEventListener('click', () => {
  btnHit.classList.add('hidden');
  btnStand.classList.add('hidden');
  // user assigns value to aces
  if (cardsPlayer.includes('ace')) {
    isAce();
  }
  // if dealer's hand < 17, new card dealt
  else {
    while (sumHand(cardsDealer) < 17) {
      pushCardToDealer();
    }
    winnerLogic();
  }

  // run winner logic function
});

// Reset button
btnReset.addEventListener('click', () => {
  // reset scores
  playerScoreTotal.textContent = '0';
  dealerScoreTotal.textContent = '0';
  headline.textContent = '♠️ ♥️ Winners Only Blackjack ♣️ ♦️';
  header.style.backgroundColor = 'rebeccapurple';
  totalScoreDealer = 0;
  totalScorePlayer = 0;

  // reset/hide cards
  for (let i = 0; i < playerCards.length; i++) {
    if (i === 0 || i === 1) playerCards[i].src = 'cards/back.png';
    else playerCards[i].classList.add('hidden');
  }
  for (let i = 0; i < dealerCards.length; i++) {
    if (i === 0 || i === 1) dealerCards[i].src = 'cards/back.png';
    else dealerCards[i].classList.add('hidden');
  }

  // hide hit and stand btns
  btnHit.classList.add('hidden');
  btnStand.classList.add('hidden');
  btnReset.classList.add('hidden');
});

// winner logic
const winnerLogic = () => {
  console.log('starting winnerLogic');
  const playerScore = sumHand(cardsPlayer);
  const dealerScore = sumHand(cardsDealer);
  let outcome = null;

  const winnerDeclared = () => {
    if (outcome === 'player') {
      headline.textContent = 'You Win This Round! 🎉';
      header.style.backgroundColor = 'darkgreen';
      totalScorePlayer++;
      playerScoreTotal.textContent = totalScorePlayer;
    }
    // if user dealt blackjack, increase score by 2
    if (outcome === 'blackjackPlayer') {
      headline.textContent = '🎉 🎉 Blackjack! You win this round 🎉 🎉';
      header.style.backgroundColor = 'darkgreen';
      totalScorePlayer += 2;
      playerScoreTotal.textContent = 'totalScorePlayer';
    }
    if (outcome === 'blackjackDealer') {
      headline.textContent = 'Dealer wins by blackjack!';
      header.style.backgroundColor = 'gray';
      totalScoreDealer += 2;
      dealerScoreTotal.textContent = totalScoreDealer;
    }
    if (outcome === 'dealer') {
      headline.textContent = 'Dealer wins this round!';
      header.style.backgroundColor = 'gray';
      totalScoreDealer++;
      dealerScoreTotal.textContent = totalScoreDealer;
    }
    if (outcome === 'draw') {
      headline.textContent = `It's a draw!`;
    }
  };

  // player win logic
  if (cardsPlayer.length === 2 && playerScore === 21) {
    outcome = 'blackjackPlayer';
    setTimeout(winnerDeclared, 500);
  } else if (
    playerScore === 21 &&
    cardsPlayer.length !== 21 &&
    dealerScore !== 21
  ) {
    outcome = 'player';
    setTimeout(winnerDeclared, 500);
  } else if (dealerScore > 21 && playerScore <= 21) {
    outcome = 'player';
    setTimeout(winnerDeclared, 500);
  } else if (playerScore > dealerScore && playerScore <= 21) {
    outcome = 'player';
    setTimeout(winnerDeclared, 500);
  }
  // dealer win logic
  else if (
    cardsDealer.length === 2 &&
    dealerScore === 21 &&
    playerScore !== 21
  ) {
    outcome = 'blackjackDealer';
    setTimeout(winnerDeclared, 500);
  } else if (
    cardsDealer.length === 2 &&
    dealerScore === 21 &&
    playerScore === 21 &&
    cardsPlayer.length !== 2
  ) {
    outcome = 'dealer';
    setTimeout(winnerDeclared, 500);
  } else if (dealerScore === 21 && playerScore !== 21) {
    outcome = 'dealer';
    setTimeout(winnerDeclared, 500);
  } else if (playerScore > 21 && dealerScore <= 21) {
    outcome = 'dealer';
    setTimeout(winnerDeclared, 500);
  } else if (dealerScore > playerScore && dealerScore <= 21) {
    outcome = 'dealer';
    setTimeout(winnerDeclared, 500);
  }
  // draw logic
  else if (dealerScore === playerScore && playerScore != 21) {
    outcome = 'draw';
    setTimeout(winnerDeclared, 500);
  } else if (dealerScore > 21 && playerScore > 21) {
    outcome = 'draw';
    setTimeout(winnerDeclared, 500);
  }
};
