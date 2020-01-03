import * as PIXI from 'pixi.js';
import msgBus from './util/message_bus';
import Game from './game';

const game = Game.getInstance();
const START_STR = 'Start Game/开始游戏';
const startText = new PIXI.Text(START_STR, {
    fontFamily : 'Arial',
    fontSize: 64,
    fill : 0x0000cf,
    align : 'center'}
);

function onClickStart(){
    if (game.status === Game.STATUS.LOADED ) {
        msgBus.send('start_screen.start')
    }
}

let notAdded = true;

function show(stage){
    if (notAdded) {
        stage.addChild(startText);
        startText.anchor.set(0.5);
        startText.x = Math.floor(game.getWidth()/2);
        startText.y = Math.floor(game.getHeight()/2);
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

function onGameStatusChange(content) {
    if (content.new === Game.STATUS.LOADED) {
        show(game.getStage());
    } else if (content.new === Game.STATUS.PLAYING) {
        hide();
    }
}

msgBus.listen('game.statusChange', onGameStatusChange);

export {show, hide};