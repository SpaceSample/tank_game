import * as PIXI from 'pixi.js';
import Game from './game';

const game = Game.getInstance();

class Bullet {
    constructor(owner, direction, speed){
        this.sp = new PIXI.Sprite(PIXI.utils.TextureCache['assets/bullet.png']);
        this.sp.anchor.set(0.5);
        game.getStage().addChild(this.sp);
        game.getTicker().add(() => this.onTick());
        this.reset(owner, direction, speed);
    }

    reset(owner, direction, speed){
        this.sp.x = owner.sp.x;
        this.sp.y = owner.sp.y;
        this.sp.rotation = direction;
        this.speed = speed;
        this.sp.visible = true;
    }

    onTick(){
        if (!this.sp.visible){return;}
        const flyDirection = this.sp.rotation - Math.PI/2;
        this.sp.x += this.speed * Math.cos(flyDirection);
        this.sp.y += this.speed * Math.sin(flyDirection);
        if(this.sp.x > game.getWidth() || this.sp.x < 0) {
            this.hide();
        }
        if(this.sp.y > game.getHeight() || this.sp.y < 0) {
            this.hide();
        }
    }

    hide(){
        this.sp.visible = false;
        pool.push(this);
    }
}

const pool = [];

Bullet.getOne = function(owner, direction, speed){
    if (pool.length) {
        const one = pool.pop();
        one.reset(owner, direction, speed);
        return one;
    } else {
        return new Bullet(owner, direction, speed);
    }
}

game.addToLoader('assets/bullet.png');

export default Bullet;