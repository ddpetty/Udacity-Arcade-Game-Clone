// Enemies our player must avoid
class Enemy {
    constructor(sprite, x, y, movement) {
        // Variables applied to each of our instances go here,
        // we've provided one for you to get started

        // The image/sprite for our enemies, this uses
        // a helper we've provided to easily load images
        this.sprite = 'images/enemy-bug.png';
        this.x = 3;
				this.y = 3;
				this.movement = movement;
    }

    // Update the enemy's position, required method for game
    // Parameter: dt, a time delta between ticks
    update(dt) {
				// You should multiply any movement by the dt parameter
				this.x += this.movment * dt;
        // which will ensure the game runs at the same speed for
        // all computers.
    };

    // Draw the enemy on the screen, required method for game
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    };
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
class Player {
    constructor(sprite, x, y, movement) {
        this.sprite = 'images/char-boy.png';
        this.x = 0;
				this.y = 0;
				this.movement = movement;
    }

    //Update the player's position
    update(dt) {
				// You should multiply any movement by the dt parameter
				this.x += this.movment * dt;
        // which will ensure the game runs at the same speed for
        // all computers.
    };


    // Draw the player on the screen
    render() {
				ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    };
}

//Instantiate all objects.
const allEnemies = [];
let player = new Player();
console.log(player);
let enemy = new Enemy();
console.log(enemy);




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