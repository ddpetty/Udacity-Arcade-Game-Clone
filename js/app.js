let gameScore = 0,
	lives = 3,
	livesLeft = document.querySelector('.lives > span'),
	score = document.querySelector('.score > span');

// Enemies our player must avoid
class Enemy {
	constructor(x, y, movement) {
		// Variables applied to each of our instances go here,
		// we've provided one for you to get started
		this.x = x;
		this.y = y;
		this.movement = movement;
		// The image/sprite for our enemies, this uses
		// a helper we've provided to easily load images
		this.sprite = 'images/enemy-bug.png';
	}

	// Update the enemy's position, required method for game
	// Parameter: dt, a time delta between ticks
	update(dt) {
		// You should multiply any movement by the dt parameter
		// which will ensure the game runs at the same speed for
		// all computers.
		this.x += this.movement * dt;
		livesLeft.innerText = lives;

		// Restarts enemy movement from the left when Player reaches the water
		if (this.x > 505) {
			this.x = -150;
			//Controls the enemy movement speed
			//New Feature (levels): *400-600 easy *700+ for hard
			this.movement = 150 + Math.floor(Math.random() * 800);

		}

		// Checks collisons and restarts player at the bottom
		if (player.x < this.x + 60 &&
			player.x + 37 > this.x &&
			player.y < this.y + 25 &&
			30 + player.y > this.y) {
			player.x = 200;
			player.y = 400;
			lives--;
			livesLeft.innerText = lives;
			if (lives === 0) {
				//Will replace with modal
				confirm(`Game Over! Do you want to play again?`);
				lives = 3;
				gameScore = 0;
				livesLeft.innerText = lives;
				score.innerText = '';
			}
		}
	};
	// Draw the enemy on the screen, required method for game
	render() {
		ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
	}
}
// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
class Player {
	constructor(x, y, movement) {
		this.x = x;
		this.y = y;
		this.movement = movement;
		this.sprite = 'images/char-boy.png';
	}
	update() {
		// Stops Player from moving off the left/right side of canvas
		if (this.y > 380) {
			this.y = 380;
		}
		if (this.x > 400) {
			this.x = 400;
		}
		if (this.x < 0) {
			this.x = 0;
		}
		// Once player reaches the water, 100 points will be added to their game score
		if (this.y < 0) {
			this.x = 200;
			this.y = 380;
			gameScore++;
			score.innerText = gameScore * 100;
			if (gameScore === 10 && lives > 0) {
				confirm('You won the game!');
				lives = 3;
				gameScore = 0;
				livesLeft.innerText = lives;
				score.innerText = '';
			}
		}
	}
	render() {
		ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
	}
	// Moves Player with keyboard arrow keys
	handleInput(arrowKeyPressed) {
		switch (arrowKeyPressed) {
			case 'left':
				this.x -= this.movement + 50;
				break;
			case 'up':
				this.y -= this.movement + 30;
				break;
			case 'right':
				this.x += this.movement + 50;
				break;
			case 'down':
				this.y += this.movement + 30;
				break;
		}
	}
}
// Now instantiate your objects.
let allEnemies = [];
// Canvas position of created enemies and player x, y, movement
let enemyPosition = [50, 135, 220];
let player = new Player(200, 400, 50);

//Creates array of enemy objects
enemyPosition.forEach((enemyPositionCoordinate) => {
	let enemy = new Enemy(0, enemyPositionCoordinate, 100 + Math.floor(Math.random() * 500));
	allEnemies.push(enemy);
	// console.log(allEnemies);
});

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function (e) {
	var allowedKeys = {
		37: 'left',
		38: 'up',
		39: 'right',
		40: 'down'
	};

	player.handleInput(allowedKeys[e.keyCode]);
});