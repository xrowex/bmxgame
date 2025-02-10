const config = {
    type: Phaser.AUTO,
    width: 1280,
    height: 720,
    physics: {
        default: "arcade",
        arcade: { gravity: { y: 1000 }, debug: true }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

let bike;
let cursors;
let targetOriginX = 0.5;
let targetOriginY = 0.7;
let score = 0;
let trickInProgress = false;

const game = new Phaser.Game(config);

function preload() {
    this.load.image("background", "assets/background.png");
    this.load.image("bike", "assets/bmx.png");
}

function create() {
    // Add background
    this.add.image(640, 360, "background").setScale(2);

    // Create bike
    bike = this.physics.add.sprite(400, 500, "bike").setScale(0.2);
    bike.setCollideWorldBounds(true);
    bike.body.setGravityY(500);

    // Camera follows bike
    this.cameras.main.setBounds(0, 0, config.width, config.height);
    this.cameras.main.startFollow(bike, true, 0.05, 0.05);

    // Enable keyboard input
    cursors = this.input.keyboard.createCursorKeys();
}

function update() {
    let spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    let aKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    let dKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

    if (cursors.left.isDown) {
        bike.setVelocityX(-200);
        bike.setFlipX(true);
    } else if (cursors.right.isDown) {
        bike.setVelocityX(200);
        bike.setFlipX(false);
    } else {
        bike.setVelocityX(0);
    }

    if (spaceKey.isDown && bike.body.blocked.down) {
        bike.setVelocityY(-500);
    }

    if (aKey.isDown) {
        targetOriginX = 0.3;
        targetOriginY = 0.2;
        bike.rotation = Phaser.Math.Linear(bike.rotation, Phaser.Math.DegToRad(-30), 0.02);
    } else if (dKey.isDown) {
        targetOriginX = 0.7;
        targetOriginY = 0.2;
        bike.rotation = Phaser.Math.Linear(bike.rotation, Phaser.Math.DegToRad(30), 0.02);
    } else {
        targetOriginX = 0.5;
        targetOriginY = 0.2;
        bike.rotation = Phaser.Math.Linear(bike.rotation, 0, 0.1);
    }

    bike.setOrigin(
        Phaser.Math.Linear(bike.originX, targetOriginX, 0.1),
        Phaser.Math.Linear(bike.originY, targetOriginY, 0.1)
    );

    if (this.input.keyboard.checkDown(this.input.keyboard.addKey('Z'), 250)) {
        bike.setAngularVelocity(500);
    }
    if (this.input.keyboard.checkDown(this.input.keyboard.addKey('X'), 250)) {
        bike.setAngularVelocity(-500);
    }

    if (bike.body.blocked.down) {
        bike.setAngularVelocity(0);
    }
}
