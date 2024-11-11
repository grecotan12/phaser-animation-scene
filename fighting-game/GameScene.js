class GameScene extends Phaser.Scene {
    constructor() {
        super({key: 'GameScene'})
    }

    preload() {

    }

    create() {
        this.add.text(200, 200, "Game Scene");
        this.input.on('pointerup', () => {
            this.scene.stop('GameScene');
            this.scene.start('EndScene');
        })
    }
}