class EndRoom extends baseScene {
    /** @type {Phaser.Tilemaps.Tilemap} */
    map
    /** @type {CustomSprite} */
    player
    /** @type  {Phaser.Types.Input.Keyboard.CursorKeys} */
    cursors
    /** @type {Phaser.GameObjects.RenderTexture} */
    image
    /** @type  {Phaser.Cameras.Scene2D.Camera} */
    camera
    /** @type {number} */
    score
    /** @type {number} */
    health
    constructor() {
        super('EndRoom')
    }
    /** @param {object} */
    data
    init(data) {
        this.health = data.health
        this.score = data.score
        this.exitDone = data.exitDone
    }
    preload() {
        super.preload()
    }
    create() {
        super.create()
        //Health
        this.completed = false
        this.gameScene = 'End'
        baseScene.Path.push('End')
        console.log(baseScene.Path)
        this.health
        this.score
        this.exitDone
        //Tilemap creation
        this.map = this.make.tilemap({ key: 'End' })
        //World bounds
        this.physics.world.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels)
        //Creating the map
        const background = this.map.addTilesetImage('dungeon-tileset', 'dungeon-tileset')
        this.map.createLayer('floorLayer', background, 0, 0)
        this.doorLayer = this.map.createLayer('doorLayer', background, 0, 0)
        this.map.createLayer('chestLayer', background, 0, 0)
        this.map.createLayer('miscLayer', background, 0, 0)
        this.map.createLayer('wallLayer', background, 0, 0)
        const collisionLayer = this.map.getLayer('wallLayer').tilemapLayer
        //Player creation
        if (typeof exitDone == 'undefined' || false) {
            this.playerSpawn = SpawnRoom.FindPoint(this.map, 'objectLayer', 'spawn', 'playerSpawn')
            this.player = new CustomSprite(this, this.playerSpawn.x, this.playerSpawn.y, 'player')
        }
        //Collisions
        this.player.setCollideWorldBounds(true)
        this.doorLayer.setCollisionBetween(0, 1000)
        collisionLayer.setCollisionBetween(0, 1000)
        this.physics.add.collider(this.player, collisionLayer)
        this.physics.add.overlap(this.player, this.doorLayer, this.getOverlapTileIndex, null, this)
        //Camera
        this.camera = this.cameras.getCamera("")
        this.camera.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels)
        //UI
        this.healthText = this.add.text(5, 14, "Health: " + this.health, {
            fontSize: '15px',
            color: '#FFF'
        }).setScrollFactor(0)
        this.scoreText = this.add.text(5, 25, 'Score: ' + this.score, {
            fontSize: '15px',
            color: '#FFF'
        }).setScrollFactor(0)
    }
    update() {
        super.update()
    }
    static FindPoint(map, layer, type, name) {
        var loc = map.findObject(layer, function (object) {
            if (object.type === type && object.name === name) {
                return object
            }
        })
        return loc
    }
    static FindPoints(map, layer, type) {
        var locs = map.filterObjects(layer, function (object) {
            if (object.type === type) {
                return object
            }
        })
        return locs
    }
}