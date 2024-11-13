const gameState = {
    score: 0,
    hp: 10,
    enemiesCount: 5,
    
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
        }
    },
    scene: [StartScene, GameScene, EndScene]
}

const game = new Phaser.Game(config);