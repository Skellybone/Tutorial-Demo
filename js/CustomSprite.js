class CustomSprite extends Phaser.Physics.Arcade.Sprite {
    /**
      * @param {Phaser.Scene} scene
      * @param {number} x
      * @param {number} y
      * @param {string} texture
    */
    constructor(scene, x, y, texture){
        super(scene, x, y, texture)
        scene.add.existing(this)
        scene.physics.add.existing(this)
    }
}