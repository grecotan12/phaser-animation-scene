class GameScene extends Phaser.Scene {
    constructor() {
        super({key: 'GameScene'})
    }

    preload() {
        this.load.image("bgGame", "assets/game.png");
        this.load.image("titleOne", "assets/Tile_01.png");
        this.load.spritesheet("pinkIdle1", "assets/Idle.png", {
            frameWidth: 42,
            frameHeight: 42
        });
        this.load.spritesheet("pinkIdle", "assets/Idle.png", {
            frameWidth: 42,
            frameHeight: 42
        });
        this.load.spritesheet("run", "assets/Run.png", {
            frameWidth: 42,
            frameHeight: 42
        });
        this.load.spritesheet("attack", "assets/Attack2.png", {
            frameWidth: 42,
            frameHeight: 42
        });
    }

    create() {
        this.add.image(this.scale.width/2, this.scale.height/2, "bgGame");
        const platforms = this.physics.add.staticGroup();
        platforms.create(1, this.scale.height-32, "titleOne").setOrigin(0, 0).refreshBody();
        for (let i = 1; i <= 40; i++) {
            platforms.create(i * 32, this.scale.height-32, "titleOne").setOrigin(0, 0).refreshBody();
        }
        
        gameState.player = this.physics.add.sprite(50, this.scale.height-100, "pinkIdle").setScale(2).refreshBody();
        gameState.player.setCollideWorldBounds(true);
        gameState.enemy = this.physics.add.sprite(500, this.scale.height-100, "pinkIdle1").setScale(2).refreshBody();
        gameState.enemy.flipX = true;

        this.physics.add.collider(gameState.player, platforms);
        this.physics.add.collider(gameState.enemy, platforms);

        this.physics.add.collider(gameState.player, gameState.enemy, () => {
            if (gameState.isAttack) {
                gameState.enemy.destroy();
            }
        })
        
        this.anims.create({
            key: "idle",
            frames: this.anims.generateFrameNames("pinkIdle", {start: 0, end: 3}),
            delay: 0,
            frameRate: 10,
            repeat: -1,
        });
        this.anims.create({
            key: "run",
            frames: this.anims.generateFrameNames("run", {start: 0, end: 5}),
            delay: 0,
            frameRate: 10,
            repeat: -1,
        });
        this.anims.create({
            key: "attack",
            frames: this.anims.generateFrameNames("attack", {start: 0, end: 5}),
            delay: 0,
            frameRate: 50,
            repeat: -1,
        });

        gameState.player.anims.play("idle", true);

        gameState.cursors = this.input.keyboard.createCursorKeys();
    }

    update() {
        if (gameState.cursors.right.isDown) {
            gameState.player.setVelocityX(100);
            if (gameState.cursors.space.isDown) {
                gameState.player.anims.play("attack", true);
                gameState.isAttack = true;
            } else {
                gameState.isAttack = false;
                gameState.player.anims.play("run", true);
            }
            gameState.player.flipX = false;
        } else if (gameState.cursors.left.isDown) {
            gameState.player.setVelocityX(-100);
            if (gameState.cursors.space.isDown) {
                gameState.isAttack = true;
                gameState.player.anims.play("attack", true);
            } else {
                gameState.isAttack = false;
                gameState.player.anims.play("run", true);
            }
            gameState.player.flipX = true;
        } 
        else if (gameState.cursors.space.isDown) {
            gameState.isAttack = true;
            gameState.player.anims.play("attack", true);
        } 
        else {
            gameState.player.setVelocity(0);
            gameState.isAttack = false;
            gameState.player.anims.play("idle", true);
        }
        
    }
}