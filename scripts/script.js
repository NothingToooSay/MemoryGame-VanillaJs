// Getting game elements from DOM
const gameBoardElement = document.querySelector('#game-board')
const victoryMessage = document.querySelector('#victory-message')
const newGameBtn = document.querySelector('#new-game-btn')

// Classes and constants
const visibleCardClassName = 'visible'
const cardFlipTimeout = 500

// Symbols array for cards
const cardElements = ['🍇', '🍒', '🍏', '🍉', '🍌', '🍍']

// Card amount
const cardAmount = 12

// Array for tracking visible cards
let visibleCards = []

// Listener for click event on new game button
newGameBtn.addEventListener('click', startGame)

// Game start function
function startGame() {
	// Clearing all board contents
	;[gameBoardElement, victoryMessage].forEach(el => (el.innerHTML = ''))

	// Generation and display of cards
	const cardValues = generateArray(cardElements, cardAmount)
	// console.log(cardValues)

	cardValues.forEach(renderCard)

	showCards()
}

// Cards display function at the beginning of the game
function showCards() {
	const renderedCards = document.querySelectorAll('.card')

	renderedCards.forEach(card => card.classList.add(visibleCardClassName))

	setTimeout(() => {
		renderedCards.forEach(card => card.classList.remove(visibleCardClassName))
	}, cardFlipTimeout * 2)
}

// Function for generating an array of random symbols for cards
function generateArray(emojis, cardAmount) {
	const randomArray = []
	const elementCounts = {}

	// Generating a character array
	for (const emoji of emojis) {
		elementCounts[emoji] = 0
	}

	while (randomArray.length < cardAmount) {
		const randomIndex = Math.floor(Math.random() * emojis.length)
		const randomElement = emojis[randomIndex]

		if (elementCounts[randomElement] < 2) {
			randomArray.push(randomElement)
			elementCounts[randomElement]++
		}
	}

	return randomArray
}

// Display function card
function renderCard(emoji) {
	const card = document.createElement('div')
	card.classList.add('card')

	const cardInner = document.createElement('div')
	cardInner.classList.add('card-inner')

	const cardFront = document.createElement('div')
	cardFront.classList.add('card-front')
	cardInner.appendChild(cardFront)

	const cardBack = document.createElement('div')
	cardBack.classList.add('card-back')
	cardInner.appendChild(cardBack)

	// Set text for the front and back of the card
	cardFront.textContent = '?'
	cardBack.textContent = emoji

	card.appendChild(cardInner)

	// Adding a click event handler to the map
	card.addEventListener('click', () => {
		handleCardClick(card)
	})

	// Adding a card to the game board
	gameBoardElement.appendChild(card)
}

// Map click processing function
function handleCardClick(card) {
	if (card.classList.contains(visibleCardClassName)) return

	card
		.querySelector('.card-inner')
		.addEventListener('transitionend', checkVictory)
	// For the last card to finish flip and threw out a message about victory

	// checkVictory()

	card.classList.add(visibleCardClassName)

	visibleCards.push(card)
	// console.log(visibleCards)

	// The number of open cards will only be even
	if (visibleCards.length % 2 !== 0) {
		return
	}

	checkCards()
}

// Function for checking the last two open cards
function checkCards() {
	const [prelastCard, lastCard] = visibleCards.slice(-2)
	// Get the last 2 elements of the array

	// If the open cards do not match
	if (lastCard.textContent !== prelastCard.textContent) {
		// console.log('try next time')
		visibleCards = visibleCards.slice(0, visibleCards.length - 2)

		// Hiding unmatched cards after a specified time
		setTimeout(() => {
			lastCard.classList.remove(visibleCardClassName)
			prelastCard.classList.remove(visibleCardClassName)
		}, cardFlipTimeout)
	}
}

// Function for checking on game victory
function checkVictory() {
	const visibleCardNodes = document.querySelectorAll(`.${visibleCardClassName}`)

	const victoryText = 'Congratulations!'

	// Check for victory
	if (visibleCardNodes.length === cardAmount) {
		victoryMessage.textContent = victoryText
	}

	// console.log(visibleCardNodes)
}

startGame()
