import msgBus from './util/message_bus';
import * as PIXI from 'pixi.js';
import Game from './game';
import Bullet from './bullet';
import {/*checkPoint,  */check4PointWithMany} from './util/collision_detection';
import EnemyTank from './enemy_tank';

const game = Game.getInstance();

class Tank {
    constructor(){
        msgBus.listen('user.key_left', () => this.onLeft());
        msgBus.listen('user.key_up', () => this.onUp());
        msgBus.listen('user.key_down', () => this.onDown());
        msgBus.listen('user.key_right', () => this.onRight());
        msgBus.listen('user.key_space', () => this.fire());
    }

    onGameStart(){
        if (!this.sp) {
            this.sp = new PIXI.Sprite(PIXI.utils.TextureCache['assets/tank1.png']);
            this.sp.anchor.set(0.5);
            game.getPlayContainer().addChild(this.sp);
            game.getTicker().add(() => this.onTick());
        }
        this.sp.x = Math.floor(game.getWidth()/2);
        this.sp.y = Math.floor(game.getHeight() - 100);
        this.sp.rotation = 0;
        this.sp.visible = true;
    }

    onTick(){
      if (game.status === Game.STATUS.PLAYING){
        const enemyTanks = EnemyTank.getActiveTanks();
        const enemyTankSps = enemyTanks.map(et => et.sp);

        const hitTank = check4PointWithMany(this.sp, enemyTankSps);
        if (hitTank) {
          msgBus.send('tank.gameover');
          return;
        }
        let enemyTanksMap = null;
        const myBullets = Bullet.getAllMine();
        myBullets.forEach(mb => {
            const mbHitTank = check4PointWithMany(mb.sp, enemyTankSps);
            if (mbHitTank){
                if(!enemyTanksMap) {
                    enemyTanksMap = new Map();
                    enemyTanks.forEach(et => enemyTanksMap.set(et.sp, et));
                }
                mb.hide();
                const t = enemyTanksMap.get(mbHitTank);
                t.crash();
            }
        });
      }
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

    fire(){
        if (game.status === Game.STATUS.PLAYING){
            Bullet.getMineOne(this, this.sp.rotation, Tank.bulletSpeed);
        }
    }
}

Tank.speed = 10;
Tank.bulletSpeed = 20;

let tank = null;
Tank.getInstance = () => {
    if (!tank){
        tank = new Tank();
        if(window.__DEBUG){
          window.mt = tank;
      }
    }
    return tank;
};

msgBus.listen('game.statusChange', content => {
    if (content.new === Game.STATUS.PLAYING) {
        Tank.getInstance().onGameStart();
    }
});

game.addToLoader('assets/tank1.png');

export default Tank;