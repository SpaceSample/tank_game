import * as PIXI from 'pixi.js';
import Game from './game';

const game = Game.getInstance();

class Bullet {
  constructor(owner){
    this.owner = owner;
    if(owner.camp === Game.CAMP.ENEMY) {
      this.sp = new PIXI.Sprite(PIXI.utils.TextureCache['assets/bullet2.png']);
    } else {
      this.sp = new PIXI.Sprite(PIXI.utils.TextureCache['assets/bullet.png']);
    }
    
    this.sp.anchor.set(0.5);
    game.getPlayContainer().addChild(this.sp);
    game.getTicker().add(() => this.onTick());
  }

  reactive(owner, direction, speed){
    
    this.sp.x = owner.sp.x;
    this.sp.y = owner.sp.y;
    this.sp.rotation = direction;
    this.speed = speed;
    this.sp.visible = true;
    if(owner.camp === Game.CAMP.ENEMY) {
      enemyActiveBulletSet.add(this);
    } else {
      myActiveBulletSet.add(this);
    }
    if(owner.camp !== this.owner.camp) {
      throw new Error('bullet can not change camp!');
    }
    this.owner = owner;

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
    if (this.owner.camp === Game.CAMP.ENEMY){
      enemyBulletPool.push(this);
      enemyActiveBulletSet.delete(this);
    } else {
      myBulletPool.push(this);
      myActiveBulletSet.delete(this);
    }
  }
}

const myBulletPool = [];
const myActiveBulletSet = new Set();

Bullet.getMineOne = function(owner, direction, speed){
  let one;
  if (myBulletPool.length) {
    one = myBulletPool.pop();
  } else {
    one = new Bullet(owner);
  }
  one.reactive(owner, direction, speed);
  return one;
}

const enemyBulletPool = [];
const enemyActiveBulletSet = new Set();

Bullet.getEnemyOne = function(owner, direction, speed){
  let one;
  if (enemyBulletPool.length) {
    one = enemyBulletPool.pop();
  } else {
    one = new Bullet(owner);
  }
  one.reactive(owner, direction, speed);
  return one;
}

Bullet.getAllMine = () => {
  return [...myActiveBulletSet.values()];
}

Bullet.getAllEnemy = () => {
  return [...enemyActiveBulletSet.values()];
}

game.addToLoader('assets/bullet.png');
game.addToLoader('assets/bullet2.png');

export default Bullet;