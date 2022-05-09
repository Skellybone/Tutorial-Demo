class baseScene extends Phaser.Scene {
    static Path
    constructor(id) {
        super(id)
    }
    preload() {
        //Load assets
        this.load.image('dungeon-tileset', 'assets/dungeon-tileset.png')
        this.load.image('props-tileset', 'assets/props-tileset.png')
        this.load.image('respawn', 'assets/respawn.png')
        this.respawnButton = this.add.image(100, 100, 'respawn').setVisible(false)
        this.load.spritesheet('mimic', 'assets/chest-mimic.png', {
            frameWidth: 16,
            frameHeight: 16
        })
        this.load.spritesheet('chest', 'assets/chest-something.png', {
            frameWidth: 16,
            frameHeight: 16
        })
        this.load.spritesheet('player', 'assets/player.png', {
            frameWidth: 16,
            frameHeight: 21
        })
        this.load.spritesheet('sludge', 'assets/sludge.png', {
            frameWidth: 16,
            frameHeight: 15
        })
        this.load.spritesheet('greensludge', 'assets/greensludge.png', {
            frameWidth: 16,
            frameHeight: 15
        })
        this.load.tilemapTiledJSON('Spawn', 'assets/Spawn.json')
        this.load.tilemapTiledJSON('Scene1', 'assets/Room1.json')
        this.load.tilemapTiledJSON('Scene2', 'assets/Room2.json')
        this.load.tilemapTiledJSON('Scene3', 'assets/Room3.json')
        this.load.tilemapTiledJSON('Scene4', 'assets/Room4.json')
        this.load.tilemapTiledJSON('Scene5', 'assets/Room5.json')
        this.load.tilemapTiledJSON('End', 'assets/EndRoom.json')
    }
    create() {
        //Enabling Cursors
        this.cursors = this.input.keyboard.createCursorKeys()
        this.keys = this.input.keyboard.addKeys("W,A,S,D");
        //Setting Speed
        this.speed = 160
        this.speedDiagonal = this.speed * 1.4 / 2
        //Player Anims
        this.anims.create({
            key: 'idle',
            frames: this.anims.generateFrameNumbers('player', { frames: [0, 4] }),
            frameRate: 3,
            repeate: -1
        })
        this.anims.create({
            key: 'walk',
            frames: this.anims.generateFrameNumbers('player', { start: 4, end: 6 }),
            frameRate: 15,
            repeate: -1
        })
        //Mimic Chest Anims
        this.anims.create({
            key: 'idle',
            frames: this.anims.generateFrameNumbers('mimic', { start: 0, end: 0 }),
            frameRate: 15,
            repeate: -1,
        })
        this.anims.create({
            key: 'awake',
            frames: this.anims.generateFrameNumbers('mimic', { start: 1, end: 1 }),
            frameRate: 15,
            repeate: -1
        })
        this.anims.create({
            key: 'attack',
            frames: this.anims.generateFrameNumbers('mimic', { start: 1, end: 2 }),
            frameRate: 15,
            repeate: -1
        })
        //Good Chest Anims
        this.anims.create({
            key: 'idle',
            frames: this.anims.generateFrameNumbers('chest', { start: 0, end: 0 }),
            frameRate: 15,
            repeate: -1
        })
        this.anims.create({
            key: 'open',
            frames: this.anims.generateFrameNumbers('chest', { start: 1, end: 2 }),
            frameRate: 15,
            repeate: -1
        })
    }
    update() {
        //Controls and idle update checks
        if (!this.gameOver) {
            if (this.cursors.left.isDown || this.keys.A.isDown) {
                this.player.setVelocityX(-this.speed)
                this.player.anims.play('walk', true)
                this.player.flipX = true
            } else if (this.cursors.right.isDown || this.keys.D.isDown) {
                this.player.setVelocityX(this.speed)
                this.player.anims.play('walk', true)
                this.player.flipX = false
            } else if (this.cursors.down.isDown || this.keys.S.isDown) {
                this.player.setVelocityY(this.speed)
                this.player.anims.play('walk', true)
            } else if (this.cursors.up.isDown || this.keys.W.isDown) {
                this.player.setVelocityY(-this.speed)
                this.player.anims.play('walk', true)
            } else if (this.cursors.left.isDown || this.keys.A.isDown && this.cursors.up.isDown || this.keys.W.isDown) {
                //Left and up
                this.player.setVelocityX(-this.speedDiagonal)
                this.player.setVelocityY(-this.speedDiagonal)
                this.player.anims.play('walk', true)
            } else if (this.cursors.right.isDown || this.keys.D.isDown && this.cursors.up.isDown || this.keys.W.isDown) {
                //Right and up
                this.player.setVelocityX(this.speedDiagonal)
                this.player.setVelocityY(-this.speedDiagonal)
                this.player.anims.play('walk', true)
            } else if (this.cursors.left.isDown || this.keys.A.isDown && this.cursors.down.isDown || this.keys.S.isDown) {
                //Left and down
                this.player.setVelocityX(this.speedDiagonal)
                this.player.setVelocityY(this.speedDiagonal)
                this.player.anims.play('walk', true)
            } else if (this.cursors.right.isDown || this.keys.D.isDown && this.cursors.down.isDown || this.keys.S.isDown) {
                //Right and down
                this.player.setVelocityX(-this.speedDiagonal)
                this.player.setVelocityY(this.speedDiagonal)
                this.player.anims.play('walk', true)
            } else {
                //If doing nothing do not move
                this.player.setVelocityX(0)
                this.player.setVelocityY(0)
                this.player.anims.play('idle', true)
            }
        }
    }
}