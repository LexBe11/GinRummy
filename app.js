const suits = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'W', 'G'];
const numCards = 10; // Number of cards per player and bot
let playerHand = [];
let botHand = [];
let discardPile = [];
let points = 0;

const playerHandElement = document.getElementById('player-hand');
const botHandElement = document.getElementById('bot-hand');
const discardPileElement = document.getElementById('discard-pile');
const pointsDisplay = document.getElementById('points-display');
const shuffleButton = document.getElementById('shuffle-button');

function getRandomCard() {
    return suits[Math.floor(Math.random() * suits.length)];
}

function shuffleAndDeal() {
    // Clear previous hands
    playerHand = [];
    botHand = [];
    discardPile = [];
    playerHandElement.innerHTML = '';
    botHandElement.innerHTML = '';
    discardPileElement.innerHTML = '';

    // Deal cards to player and bot
    for (let i = 0; i < numCards; i++) {
        playerHand.push(getRandomCard());
        botHand.push(getRandomCard());
    }

    // Render cards
    renderCards();
    
    // Calculate random points for the player based on the hand quality
    calculatePoints();
}

function renderCards() {
    // Player's cards
    playerHand.forEach(card => {
        const cardElement = document.createElement('div');
        cardElement.className = 'card';
        cardElement.textContent = card;
        cardElement.onclick = () => moveToDiscardPile(card, 'player');
        playerHandElement.appendChild(cardElement);
    });

    // Bot's cards (hidden initially)
    botHand.forEach(() => {
        const cardElement = document.createElement('div');
        cardElement.className = 'card';
        cardElement.textContent = '?'; // Hidden card
        botHandElement.appendChild(cardElement);
    });
}

function calculatePoints() {
    // Points calculation logic
    const handValue = playerHand.length; // Example: just based on the number of cards
    const randomPoints = Math.floor(Math.random() * (handValue * 10)); // Random points based on hand size
    points = randomPoints;
    pointsDisplay.textContent = points;
}

function moveToDiscardPile(card, player) {
    // Move card to discard pile and update points
    discardPile.push(card);
    
    // Remove card from player's hand
    if (player === 'player') {
        playerHand = playerHand.filter(c => c !== card);
        renderCards();
    }

    // Recalculate points
    calculatePoints();
}

shuffleButton.addEventListener('click', shuffleAndDeal);
