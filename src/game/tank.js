import msgBus from './util/message_bus';
import * as PIXI from 'pixi.js';
import Game from './game';
import Bullet from './bullet';
import {check4PointWithManyPoints, check4PointWithMany } from './util/collision_detection';
import EnemyTank from './enemy_tank';
import {explode} from './explode';

const game = Game.getInstance();

// Tank loading status, cold down time.
const LOAD_STATUS = {
  LOADING: 0,
  READY: 1
}

class Tank {
  constructor() {
    this.camp = Game.CAMP.WE;
    msgBus.listen('user.key_left', () => this.onLeft());
    msgBus.listen('user.key_up', () => this.onUp());
    msgBus.listen('user.key_down', () => this.onDown());
    msgBus.listen('user.key_right', () => this.onRight());
    msgBus.listen('user.key_space', () => this.fire());
    this.loadStatus = LOAD_STATUS.READY;
    const This = this;
    this.loadReady = () => { This.loadStatus = LOAD_STATUS.READY };
  }

  onGameStart() {
    if (!this.sp) {
      this.sp = new PIXI.Sprite(PIXI.utils.TextureCache['assets/tank1.png']);
      this.sp.anchor.set(0.5);
      game.getPlayContainer().addChild(this.sp);
      game.getTicker().add(() => this.onTick());
    }
    this.sp.x = Math.floor(game.getWidth() / 2);
    this.sp.y = Math.floor(game.getHeight() - 100);
    this.sp.rotation = 0;
    this.hp = 3;
    this.sp.visible = true;
    msgBus.send('tank.hpChange', this.hp);
  }

  // return this tank dead or not
  changeHp(dhp) {
    this.hp -= dhp;
    msgBus.send('tank.hpChange', this.hp);
    if (this.hp <= 0) {
      explode(this.sp);
      msgBus.send('tank.gameover');
      return true;
    }
    return false;
  }

  onTick() {
    if (game.status === Game.STATUS.PLAYING) {
      const enemyTanks = EnemyTank.getActiveTanks();
      const enemyTankSps = enemyTanks.map(et => et.sp);
      const hitTank = check4PointWithMany(this.sp, enemyTankSps);
      if (hitTank>=0) {
        explode(enemyTankSps[hitTank]);
        enemyTanks[hitTank].crash();
        if(this.changeHp(3)) {
          return;
        }
      }

      const enemyBullets = Bullet.getAllEnemy();
      const enemyBulletSps = enemyBullets.map(eb => eb.sp);
      const hitBullet = check4PointWithManyPoints(this.sp, enemyBulletSps);
      if (hitBullet>=0) {
        enemyBullets[hitBullet].hide();
        if(this.changeHp(1)) {
          return;
        }
      }

      // let enemyTanksMap = null;
      const myBullets = Bullet.getAllMine();
      const myBulletsSps = myBullets.map(eb => eb.sp);
      enemyTanks.forEach(et => {
        const hitIndex = check4PointWithManyPoints(et.sp, myBulletsSps);
        if (hitIndex>=0) {
          myBullets[hitIndex].hide();
          explode(et.sp);
          et.crash();
          msgBus.send('score.add', 1);
        }
      });

    }
  }

  onLeft() {
    this.sp.x -= Tank.speed;
    this.sp.rotation = - Math.PI / 2;
    if (this.sp.x < 0) {
      this.sp.x = 0;
    }
  }

  onRight() {
    this.sp.x += Tank.speed;
    this.sp.rotation = Math.PI / 2;
    const limit = game.getWidth();
    if (this.sp.x > limit) {
      this.sp.x = limit;
    }
  }

  onUp() {
    this.sp.y -= Tank.speed;
    this.sp.rotation = 0;
    if (this.sp.y < 0) {
      this.sp.y = 0;
    }
  }

  onDown() {
    this.sp.y += Tank.speed;
    this.sp.rotation = Math.PI;
    const limit = game.getHeight();
    if (this.sp.y > limit) {
      this.sp.y = limit;
    }
  }

  fire() {
    if (game.status === Game.STATUS.PLAYING && this.loadStatus === LOAD_STATUS.READY) {
      Bullet.getMineOne(this, this.sp.rotation, Tank.bulletSpeed);
      this.loadStatus = LOAD_STATUS.LOADING;
      setTimeout(this.loadReady, Tank.loadColdDown);
    }
  }
}

Tank.speed = 10;
Tank.bulletSpeed = 20;
Tank.loadColdDown = 500;//milliseconds

let tank = null;
Tank.getInstance = () => {
  if (!tank) {
    tank = new Tank();
    if (window.__DEBUG) {
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