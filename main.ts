controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    projectile = sprites.createProjectileFromSprite(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . c . . . . . . . . 
        . . . . c a a a c . . . . . . . 
        . . . c c f a b b c . . . . . . 
        . . . b f f b f a a . . . . . . 
        . . . b b a b f f a . . . . . . 
        . . . c b f b b a c . . . . . . 
        . . . . b a f c c . . . . . . . 
        . . . . . b b c . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, mySprite, 0, -100)
})
statusbars.onZero(StatusBarKind.EnemyHealth, function (status) {
    sprites.destroy(status.spriteAttachedTo(), effects.disintegrate, 500)
    info.changeScoreBy(1)
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function (sprite, otherSprite) {
    sprites.destroy(sprite)
    statusbars.getStatusBarAttachedTo(StatusBarKind.EnemyHealth, otherSprite).value += -15
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    info.changeLifeBy(-1)
    sprites.destroy(otherSprite, effects.fire, 500)
    scene.cameraShake(4, 500)
})
let statusbar: StatusBarSprite = null
let EnemyShip: Sprite = null
let projectile: Sprite = null
let mySprite: Sprite = null
effects.starField.startScreenEffect()
mySprite = sprites.create(img`
    . . . . . . . c d . . . . . . . 
    . . . . . . . c d . . . . . . . 
    . . . . . . . c d . . . . . . . 
    . . . . . . . c b . . . . . . . 
    . . . . . . . f f . . . . . . . 
    . . . . . . . c 4 . . . . . . . 
    . . . . . . . f f . . . . . . . 
    . . . . . . . e 4 . . . . . . . 
    . . . . . . e e 5 2 . . . . . . 
    . . . . . . e 4 5 2 . . . . . . 
    . . . . . c c c 2 2 2 . . . . . 
    . . . . e e 4 4 4 5 2 2 . . . . 
    . . e f f f c c 2 2 f f 2 2 . . 
    . e e e e 2 2 4 4 4 4 5 4 2 2 . 
    e e e e e e 2 2 4 4 4 5 4 4 2 2 
    e e e e e e 2 2 4 4 4 4 5 4 2 2 
    `, SpriteKind.Player)
controller.moveSprite(mySprite, 70, 70)
mySprite.setStayInScreen(true)
info.setLife(3)
game.onUpdateInterval(2000, function () {
    EnemyShip = sprites.create(img`
        8 8 6 9 6 6 6 6 8 8 8 8 8 8 8 8 
        8 8 6 6 9 6 6 6 8 8 8 8 8 8 8 8 
        . 8 8 6 9 6 6 6 6 8 8 8 8 8 8 . 
        . . 8 8 f f e e c c f f f 8 . . 
        . . . . 8 8 9 6 6 6 8 8 . . . . 
        . . . . . 8 8 8 c c c . . . . . 
        . . . . . . 8 9 6 8 . . . . . . 
        . . . . . . 8 9 8 8 . . . . . . 
        . . . . . . . 8 8 . . . . . . . 
        . . . . . . . 2 8 . . . . . . . 
        . . . . . . . 2 2 . . . . . . . 
        . . . . . . . 2 2 . . . . . . . 
        . . . . . . . 2 2 . . . . . . . 
        . . . . . . . 2 2 . . . . . . . 
        . . . . . . . 2 2 . . . . . . . 
        . . . . . . . 2 2 . . . . . . . 
        `, SpriteKind.Enemy)
    EnemyShip.y = 0
    EnemyShip.vy = 20
    EnemyShip.x = randint(10, scene.screenHeight() - 10)
    statusbar = statusbars.create(15, 4, StatusBarKind.EnemyHealth)
    statusbar.attachToSprite(EnemyShip)
})
