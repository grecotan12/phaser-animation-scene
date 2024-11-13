class GameScene extends Phaser.Scene {
    constructor() {
        super({key: 'GameScene'});
    }

    preload() {
        this.load.image("bgGame", "assets/game.png");
        this.load.image("titleOne", "assets/Tile_01.png");
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
        this.load.spritesheet("jump", "assets/Jump.png", {
            frameWidth: 42,
            frameHeight: 42
        });
        this.load.spritesheet("squat", "assets/Squat.png", {
            frameWidth: 42,
            frameHeight: 42
        });
        this.load.spritesheet("squat", "assets/Squat.png", {
            frameWidth: 42,
            frameHeight: 42
        });
        this.load.spritesheet("hurt", "assets/Hurt.png", {
            frameWidth: 42,
            frameHeight: 42
        });
        this.load.spritesheet("enemyIdle", "assets/EnemyIdle.png", {
            frameWidth: 48,
            frameHeight: 48
        });
    }

    create() {
        this.add.image(this.scale.width/2, this.scale.height/2, "bgGame");
        const platforms = this.physics.add.staticGroup();
        platforms.create(1, this.scale.height-32, "titleOne").setOrigin(0, 0).refreshBody();
        for (let i = 1; i <= 40; i++) {
            platforms.create(i * 32, this.scale.height-32, "titleOne").setOrigin(0, 0).refreshBody();
        }

        platforms.create(1, this.scale.height-200, "titleOne").setOrigin(0, 0).refreshBody();
        for (let i = 1; i <= 10; i++) {
            platforms.create(i * 32, this.scale.height-200, "titleOne").setOrigin(0, 0).refreshBody();
        }

        for (let i = 1; i <= 5; i++) {
            platforms.create((this.scale.width/2-150) + (i * 32), this.scale.height-200, "titleOne").setOrigin(0, 0).refreshBody();
        }

        for (let i = 1; i <= 8; i++) {
            platforms.create((this.scale.width/2+150) + (i * 32), this.scale.height-200, "titleOne").setOrigin(0, 0).refreshBody();
        }


        for (let i = 1; i <= 8; i++) {
            platforms.create((this.scale.width/2-400) + (i * 32), this.scale.height-400, "titleOne").setOrigin(0, 0).refreshBody();
        }

        for (let i = 1; i <= 5; i++) {
            platforms.create((this.scale.width/2+100) + (i * 32), this.scale.height-400, "titleOne").setOrigin(0, 0).refreshBody();
        }

        for (let i = 1; i <= 8; i++) {
            platforms.create((this.scale.width/-400) + (i * 32), this.scale.height-600, "titleOne").setOrigin(0, 0).refreshBody();
        }

        for (let i = 1; i <= 5; i++) {
            platforms.create((this.scale.width/2-100) + (i * 32), this.scale.height-600, "titleOne").setOrigin(0, 0).refreshBody();
        }

        for (let i = 1; i <= 8; i++) {
            platforms.create((this.scale.width/2+300) + (i * 32), this.scale.height-600, "titleOne").setOrigin(0, 0).refreshBody();
        }
        gameState.scoreText = this.add.text(this.scale.width/2-50, 10, gameState.score, {
            fill: "black",
            fontSize: 36
        });

        gameState.player = this.physics.add.sprite(50, this.scale.height-100, "pinkIdle").setScale(2);
        gameState.player.setCollideWorldBounds(true);
        gameState.hpText = this.add.text(10, 10, `HP: ${gameState.hp}`,  {
            fill: "red",
            fontSize: 24
        });

        gameState.enemies = this.physics.add.group();
        for (let i = 0;  i < 5; i++) {
            const x = Math.floor(Math.random() * (this.scale.width - 100 + 1) ) + 100;
            const y = (Math.random() * this.scale.height-100);
            gameState.enemies.create(x, y , "enemyIdle").setScale(2);
        }
        
        this.physics.add.collider(gameState.player, platforms);
        this.physics.add.collider(gameState.enemies, platforms);

        
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
        this.anims.create({
            key: "jump",
            frames: this.anims.generateFrameNames("jump", {start: 0, end: 7}),
            delay: 0,
            frameRate: 10,
            repeat: -1,
        });
        this.anims.create({
            key: "squat",
            frames: this.anims.generateFrameNames("squat", {start: 0, end: 3}),
            delay: 0,
            frameRate: 10,
            repeat: -1,
        });
        this.anims.create({
            key: "enemyIdle",
            frames: this.anims.generateFrameNames("enemyIdle", {start: 0, end: 3}),
            delay: 0,
            frameRate: 10,
            repeat: -1,
        });
        this.anims.create({
            key: "hurt",
            frames: this.anims.generateFrameNames("hurt", {start: 0, end: 3}),
            delay: 0,
            frameRate: 5,
            repeat: -1,
        });
        
        
        Phaser.Actions.Call(gameState.enemies.getChildren(), child => {
            child.anims.play('enemyIdle');
            child.setCollideWorldBounds(true);
            this.tweens.add({
                targets: child,
                x: child.x - 150,
                ease: 'Linear',
                duration: 1800, 
                repeat: -1,
                yoyo: true,
            });
        });
        
        gameState.cursors = this.input.keyboard.createCursorKeys();
        gameState.qKey = this.input.keyboard.addKey('Q');

        this.physics.add.collider(gameState.player, gameState.enemies, (player, enemy) => {
            if (gameState.isAttack) {
                enemy.destroy();
                gameState.enemiesCount -= 1;
                gameState.score+=10;
                gameState.scoreText.setText(gameState.score);
                if (gameState.enemiesCount === 0) {
                    if (gameState.score >= 30) {
                        if (gameState.score >= 100) {
                            if (gameState.score >= 200) {
                                gameState.enemiesCount = 20;
                            }
                            else {
                                gameState.enemiesCount = 15;
                            }
                        } 
                        else {
                            gameState.enemiesCount = 10;
                        }
                    } 
                    
                    for (let i = 0;  i < gameState.enemiesCount; i++) {
                        const x = Math.floor(Math.random() * (this.scale.width - 100 + 1) ) + 100;
                        const y = (Math.random() * this.scale.height-100);
                        gameState.enemies.create(x, y , "enemyIdle").setScale(2);
                    }
                    Phaser.Actions.Call(gameState.enemies.getChildren(), child => {
                        child.anims.play('enemyIdle');
                        child.setCollideWorldBounds(true);
                        this.tweens.add({
                            targets: child,
                            x: child.x - 150,
                            ease: 'Linear',
                            duration: 1800, 
                            repeat: -1,
                            yoyo: true,
                        });
                    });
                }
            } else {
                enemy.destroy();
                gameState.hp -= 1;
                gameState.enemiesCount -= 1;
                gameState.hpText.setText(`HP: ${gameState.hp}`);
                gameState.isHurt = true;
                if (gameState.hp === 0) {
                    this.scene.stop("GameScene");
                    this.scene.start("EndScene");
                }
                setTimeout(() => {
                    gameState.isHurt = false;
                }, 500);
                if (gameState.enemiesCount === 0) {
                    if (gameState.score >= 30) {
                        if (gameState.score >= 100) {
                            if (gameState.score >= 200) {
                                gameState.enemiesCount = 20;
                            }
                            else {
                                gameState.enemiesCount = 15;
                            }
                        } 
                        else {
                            gameState.enemiesCount = 10;
                        }
                    } 
                    for (let i = 0;  i < 10; i++) {
                        const x = Math.floor(Math.random() * (this.scale.width - 100 + 1) ) + 100;
                        const y = (Math.random() * this.scale.height-100);
                        gameState.enemies.create(x, y , "enemyIdle").setScale(2);
                    }
                    Phaser.Actions.Call(gameState.enemies.getChildren(), child => {
                        child.anims.play('enemyIdle');
                        child.setCollideWorldBounds(true);
                        this.tweens.add({
                            targets: child,
                            x: child.x - 150,
                            ease: 'Linear',
                            duration: 1800, 
                            repeat: -1,
                            yoyo: true,
                        });
                    });
                }
            }
        });

        
    }

    update() {
        gameState.hpText.x = gameState.player.body.position.x;
        gameState.hpText.y = gameState.player.body.position.y;
        if (gameState.cursors.right.isDown) {
            gameState.player.setVelocityX(150);
            if (gameState.qKey.isDown) {
                gameState.player.anims.play("attack", true);
                gameState.isAttack = true;
            } else {
                gameState.isAttack = false;
                if (gameState.isHurt) {
                    gameState.player.anims.play("hurt", true);
                } else {
                    gameState.player.anims.play("run", true);
                }
            }
            gameState.player.flipX = false;
        } else if (gameState.cursors.left.isDown) {
            gameState.player.setVelocityX(-150);
            if (gameState.qKey.isDown) {
                gameState.isAttack = true;
                gameState.player.anims.play("attack", true);
            } else {
                gameState.isAttack = false;
                if (gameState.isHurt) {
                    gameState.player.anims.play("hurt", true);
                } else {
                    gameState.player.anims.play("run", true);
                }
            }
            gameState.player.flipX = true;
        } 
        else if (gameState.qKey.isDown) {
            gameState.isAttack = true;
            gameState.player.anims.play("attack", true);
        } else if (gameState.cursors.down.isDown) {
            gameState.player.anims.play("squat", true);
        }
        else if (gameState.isHurt) {
            gameState.player.anims.play("hurt", true);
        }
        else {
            gameState.player.setVelocityX(0);
            gameState.isAttack = false;
            gameState.player.anims.play("idle", true);
        }
        if ((gameState.cursors.space.isDown || gameState.cursors.up.isDown) && gameState.player.body.touching.down) {
            gameState.player.setVelocityY(-800);
            gameState.isAttack = false;
            if (gameState.isHurt) {
                gameState.player.anims.play("hurt", true);
            } else {
                gameState.player.anims.play('jump', true);
            }
        }
    }
}