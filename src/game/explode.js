import * as PIXI from 'pixi.js';
import Game from './game';
import msgBus from './util/message_bus';

const game = Game.getInstance();
let sp;

function hide(){
  if (sp){
    sp.visible = false;
  } 
}

function explode(targetSp){
  console.log(targetSp);
  if(!sp) {
    return;
  }
  sp.x = targetSp.x;
  sp.y = targetSp.y;
  sp.visible = true;
  setTimeout(hide, 200);
}

function onGameLoaded(){
  sp = new PIXI.Sprite(PIXI.utils.TextureCache['assets/explode.png']);
  sp.visible = false;
  game.getStage().addChild(sp);
}

game.addToLoader('assets/explode.png');
msgBus.listen('game.statusChange.loaded', onGameLoaded);
export {explode};