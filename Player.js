export default class Player {

    rightPressed = false;
    leftPressed = false;
    shootPressed = false;

    constructor(canvas, velocity, bulletController) {
        this.canvas = canvas;
        this.velocity = velocity;
        this.bulletController = bulletController;

        this.x = this.canvas.width / 2; //center our player on the screen
        this.y = this.canvas.height - 75;
        this.width = 50;
        this.height = 48;
        this.image = new Image();
        this.image.src = "images/player.png";

        document.addEventListener("keydown", this.keydown);
        document.addEventListener("keyup", this.keyup);

    }

    draw(ctx) {
        if (this.shootPressed) {
            this.bulletController.shoot(this.x + this.width/2, this.y, 4, 10) //shoot controller -directon, speed, and gap
        }
        this.move() //player movement
        this.collideWithWalls(); //meve left and right to the end of the wall and no more further
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }

    collideWithWalls() {
        //left
        if (this.x <0) {
            this.x = 0;
        }
        //right
        if (this.x > this.canvas.width - this.width) {
            this.x =this.canvas.width - this.width;
        }
    }

    move() {
        if (this.rightPressed) {
            this.x += this.velocity;
        } else if (this.leftPressed) {
            this.x += -this.velocity;
        }
    }

    keydown = (event) => {
        if (event.code == "ArrowRight") {
            this.rightPressed = true;
        }
        if (event.code == "ArrowLeft") {
            this.leftPressed = true;
        }
        if (event.code == "Space") {
            this.shootPressed = true;
        }
    }

    keyup = (event) => {
        if (event.code == "ArrowRight") {
            this.rightPressed = false;
        }
        if (event.code == "ArrowLeft") {
            this.leftPressed = false;
        }
        if (event.code == "Space") {
            this.shootPressed = false;
        }
    }
}