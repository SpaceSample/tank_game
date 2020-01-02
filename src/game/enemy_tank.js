import msgBus from './util/message_bus';
import * as PIXI from 'pixi.js';
import Game from './game';
import Bullet from './bullet';

const game = Game.getInstance();

class EnemyTank {
    constructor(){
        this.sp = new PIXI.Sprite(PIXI.utils.TextureCache['assets/tank2.png']);
        this.sp.anchor.set(0.5);
        this.sp.rotation = Math.PI;
        game.getPlayContainer().addChild(this.sp);
        game.getTicker().add(() => this.onTick());
    }

    reset(){
        this.sp.x = Math.floor(Math.random() * game.getWidth());
        this.sp.y = 0;
        this.sp.visible = true;
    }

    moveToPool(){
        this.sp.visible = false;
        tankPool.push(this);
    }

    onTick(){
        if(this.sp.visible) {
            this.sp.y += EnemyTank.speed;
            if(this.sp.y > game.getHeight()){
                this.moveToPool();
            }
        }
    }

    fire(){
        if (game.status === Game.STATUS.PLAYING){
            Bullet.getOne(this, this.sp.rotation, EnemyTank.bulletSpeed);
        }
    }

    crash() {
        // TODO
    }
}

EnemyTank.speed = 1;
EnemyTank.bulletSpeed = 3;

const tankPool = [];

function sendANewTank(){
    const tank = tankPool.length ? tankPool.pop() : new EnemyTank();
    tank.reset();
    waitRandomTime(sendANewTank);
}

function waitRandomTime(callBack) {
    const dt = Math.floor(Math.random() * 1500) + 2500;
    if (game.status === Game.STATUS.PLAYING) {
        setTimeout(callBack, dt);
    }
}

function onGameStart(){
    waitRandomTime(sendANewTank);
}

msgBus.listen('game.statusChange', content => {
    if (content.new === Game.STATUS.PLAYING) {
        onGameStart();
    }
});

game.addToLoader('assets/tank2.png');

export default EnemyTank;