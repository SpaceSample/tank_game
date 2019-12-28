import * as PIXI from 'pixi.js';
import gameVars from './util/game_vars';
import msgBus from './util/message_bus';

const START_STR = 'Start Game/开始游戏';
const startText = new PIXI.Text(START_STR, {
    fontFamily : 'Arial',
    fontSize: 64,
    fill : 0xff1010,
    align : 'center'}
);

function onClickStart(){
    if (gameVars.status === gameVars.GAME_STATUS.LOADED || 
        gameVars.status === gameVars.GAME_STATUS.GAME_OVER) {
        gameVars.status = gameVars.GAME_STATUS.PLAYING;
        msgBus.send('game.start');
        hide();
    }
}

let notAdded = true;

function show(stage){
    if (notAdded) {
        stage.addChild(startText);
        startText.anchor.set(0.5);
        startText.x = Math.floor(gameVars.getWidth()/2);
        startText.y = Math.floor(gameVars.getHeight()/2);
        startText.interactive = true;
        startText.buttonMode = true;
        notAdded = false;
    }

    startText.visible = true;
    startText.on('click', onClickStart);
    msgBus.listen('user.key_space', onClickStart);
}

function hide(){
    startText.visible = false;
}

export {show, hide};