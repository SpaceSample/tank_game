import * as PIXI from 'pixi.js';
import msgBus from './util/message_bus';
import Game from './game';

const game = Game.getInstance();
const HP_STR = 'HP/装甲: ';
const hpText = new PIXI.Text(HP_STR, {
  fontFamily : 'Arial',
  fontSize: 28,
  fill : 0x008f00,
  align : 'left'}
);

const spContainer = new PIXI.Container();

const hpLabel = new PIXI.Container();
hpLabel.addChild(hpText);
hpLabel.addChild(spContainer);

let notAdded = true;

function onGameStatusChange(content) {
  if (content.new === Game.STATUS.GAME_OVER) {
    hpLabel.visible = false;
  } else if (content.new === Game.STATUS.PLAYING) {
    if (notAdded) {
      game.getStage().addChild(hpLabel);
      hpLabel.y = game.getHeight() - 80;
      spContainer.x = 120;
      notAdded = false;
    }
    hpLabel.visible = true;
  }
}

const hpSps = [];

function onHpChange(hp){
  if (hp>hpSps.length){
    for(let i=hpSps.length;i<hp;i++){
      const sp = new PIXI.Sprite(PIXI.utils.TextureCache['assets/tank1.png']);
      sp.scale.set(0.5);
      sp.alpha = 0.5;
      sp.x = i*30;
      hpSps.push(sp);
      spContainer.addChild(sp);
    }
  }
  for (let i=0; i<hpSps.length;i++){
    if (i<hp){
      hpSps[i].visible = true;
    } else {
      hpSps[i].visible = false;
    }
  }
}

msgBus.listen('game.statusChange', onGameStatusChange);
msgBus.listen('tank.hpChange', onHpChange);

export {hpLabel};