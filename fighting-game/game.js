const gameState = {
    isAttack: false
};

const config = {
    type: Phaser.AUTO,
    width: 1280,
    height: 720,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 1500 },
            enableBody: true,
            debug: true
        }
    },
    scene: [StartScene, GameScene, EndScene]
}

const game = new Phaser.Game(config);