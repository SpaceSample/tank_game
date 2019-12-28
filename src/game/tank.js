import msgBus from './util/message_bus';
import gameVars from './util/game_vars';
import * as PIXI from 'pixi.js';

class Tank {
    constructor(){
        msgBus.listen('game.start', () => this.onGameStart());
        msgBus.listen('user.key_left', () => this.onLeft());
        msgBus.listen('user.key_right', () => this.onRight());
    }

    onGameStart(){
        if (!this.sp) {
            this.sp = new PIXI.Sprite(PIXI.utils.TextureCache['assets/tank1.png']);
            this.sp.anchor.set(0.5);
            gameVars.stage.addChild(this.sp);
        }
        this.sp.x = Math.floor(gameVars.getWidth()/2);
        this.sp.y = Math.floor(gameVars.getHeight() - 100);
        this.sp.visible = true;
    }

    onTick(){
        // nothing to do
    }

    onLeft(){
        this.sp.x -= Tank.speed;
        if (this.sp.x < 0){
            this.sp.x = 0;
        }
    }

    onRight() {
        this.sp.x += Tank.speed;
        const limit = gameVars.getWidth();
        if (this.sp.x > limit){
            this.sp.x = limit;
        }
    }
}

Tank.speed = 10;

const tank = new Tank();

export default tank;