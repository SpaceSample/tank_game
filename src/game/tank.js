import msgBus from './util/message_bus';
import * as PIXI from 'pixi.js';
import Game from './game';

const game = Game.getInstance();

class Tank {
    constructor(){
        msgBus.listen('user.key_left', () => this.onLeft());
        msgBus.listen('user.key_up', () => this.onUp());
        msgBus.listen('user.key_down', () => this.onDown());
        msgBus.listen('user.key_right', () => this.onRight());
    }

    onGameStart(){
        if (!this.sp) {
            this.sp = new PIXI.Sprite(PIXI.utils.TextureCache['assets/tank1.png']);
            console.log(PIXI.utils.TextureCache);
            console.log(PIXI.utils.TextureCache['assets/tank1.png']);
            this.sp.anchor.set(0.5);
            game.getStage().addChild(this.sp);
        }
        this.sp.x = Math.floor(game.getWidth()/2);
        this.sp.y = Math.floor(game.getHeight() - 100);
        this.sp.visible = true;
    }

    onTick(){
        // nothing to do
    }

    onLeft(){
        this.sp.x -= Tank.speed;
        this.sp.rotation = - Math.PI/2;
        if (this.sp.x < 0){
            this.sp.x = 0;
        }
    }

    onRight() {
        this.sp.x += Tank.speed;
        this.sp.rotation = Math.PI/2;
        const limit = game.getWidth();
        if (this.sp.x > limit){
            this.sp.x = limit;
        }
    }

    onUp(){
        this.sp.y -= Tank.speed;
        this.sp.rotation = 0;
        if (this.sp.y < 0){
            this.sp.y = 0;
        }
    }

    onDown() {
        this.sp.y += Tank.speed;
        this.sp.rotation = Math.PI;
        const limit = game.getHeight();
        if (this.sp.y > limit){
            this.sp.y = limit;
        }
    }
}

Tank.speed = 10;

let tank = null;
Tank.getInstance = () => {
    if (!tank){
        tank = new Tank();
    }
    return tank;
};

msgBus.listen('game.statusChange', content => {
    if (content.new === Game.STATUS.PLAYING) {
        Tank.getInstance().onGameStart();
    }
});

game.addToLoader('assets/tank1.png');
game.addToLoader('assets/bullet.png');

export default Tank;