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

    reactive(){
        this.sp.x = Math.floor(Math.random() * game.getWidth());
        this.sp.y = 0;
        this.sp.visible = true;
        aliveTankPool.push(this);
    }

    moveToIdleTankPool(){
        this.sp.visible = false;
        idleTankPool.add(this);
        const i = aliveTankPool.indexOf(this);
        aliveTankPool.splice(i, 1);
    }

    onTick(){
        if(this.sp.visible) {
            this.sp.y += EnemyTank.speed;
            if(this.sp.y > game.getHeight()){
                this.moveToIdleTankPool();
            }
        }
    }

    fire(){
        if (game.status === Game.STATUS.PLAYING){
            Bullet.getOne(this, this.sp.rotation, EnemyTank.bulletSpeed);
        }
    }

    crash() {
      this.moveToIdleTankPool();
      // TODO
    }
}

EnemyTank.speed = 1;
EnemyTank.bulletSpeed = 3;

const idleTankPool = new Set();
const aliveTankPool = [];

function sendANewTank(){
    let tank;
    if(idleTankPool.size){
      tank = idleTankPool.values().next().value;
      idleTankPool.delete(tank);
    } else {
      tank = new EnemyTank();
    }
    tank.reactive();
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

EnemyTank.getActiveTanks = () => {
  return aliveTankPool;
};

game.addToLoader('assets/tank2.png');

export default EnemyTank;