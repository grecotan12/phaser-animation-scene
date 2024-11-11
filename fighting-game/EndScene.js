class EndScene extends Phaser.Scene {
    constructor() {
        super({key: 'EndScene'})
    }

    preload() {

    }

    create() {
        this.add.text(200, 200, "End Scene");

        this.input.on('pointerup', () => {
            this.scene.stop('EndScene');
            this.scene.start('GameScene');
        })
    }
}