class EndScene extends Phaser.Scene {
    constructor() {
        super({key: 'EndScene'})
    }

    preload() {
        this.load.image("bgEnd", "assets/end.png");
        this.load.spritesheet("pinkIdle", "assets/Idle.png", {
            frameWidth: 42,
            frameHeight: 42
        });
        this.load.spritesheet("walkAttack", "assets/WalkAttack1.png", {
            frameWidth: 42,
            frameHeight: 42
        });
        this.load.spritesheet("walkAttack2", "assets/WalkAttack2.png", {
            frameWidth: 42,
            frameHeight: 42
        });
        this.load.spritesheet("jumpAttack", "assets/JumpAttack.png", {
            frameWidth: 42,
            frameHeight: 42
        });

        this.load.spritesheet("squatAttack", "assets/SquatAttack.png", {
            frameWidth: 42,
            frameHeight: 42
        });
        
    }

    create() {
        this.add.image(this.scale.width/2, this.scale.height/2, "bgEnd");
        let str;
        if (gameState.isWon) {
            str = "You won!";
        } else {
            str = "You lost!";
        }
        this.add.text(this.scale.width/2-150, this.scale.height/2-100 , str , {
            fill: 'black',
            fontSize: 36
        });
        this.add.text(this.scale.width/2-275, this.scale.height/2-200 , "Click to Play Again", {
            fill: 'black',
            fontSize: 36
        });

        this.anims.create({
            key: "idle",
            frames: this.anims.generateFrameNames("pinkIdle", {start: 0, end: 3}),
            delay: 0,
            frameRate: 10,
            repeat: -1,
        });
        this.anims.create({
            key: "walkAttack",
            frames: this.anims.generateFrameNames("walkAttack", {start: 0, end: 5}),
            delay: 0,
            frameRate: 10,
        });
        this.anims.create({
            key: "walkAttack2",
            frames: this.anims.generateFrameNames("walkAttack2", {start: 0, end: 5}),
            delay: 0,
            frameRate: 10,
        });
        this.anims.create({
            key: "jumpAttack",
            frames: this.anims.generateFrameNames("jumpAttack", {start: 0, end: 5}),
            delay: 0,
            frameRate: 10,
        });
        this.anims.create({
            key: "squatAttack",
            frames: this.anims.generateFrameNames("squatAttack", {start: 0, end: 5}),
            delay: 0,
            frameRate: 10,
        });
        const lancelot = this.add.sprite(this.scale.width/2+50, this.scale.height/2+50);
        lancelot.setScale(5);
        lancelot.play("idle");
        setInterval(() => {
            if (lancelot.anims.getName() === 'idle')
            {
                lancelot.playAfterRepeat('walkAttack');
                lancelot.chain([ 'walkAttack2', 'squatAttack', 'jumpAttack', 'idle' ]);
            }
        }, 1000);
        
        this.input.on('pointerdown',() => {
            this.scene.stop("EndScene");
            gameState.hp = 10;
            gameState.score = 0;
            gameState.enemiesCount = 5;
            this.scene.start("GameScene");
        })
    }
}