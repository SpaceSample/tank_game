import * as PIXI from 'pixi.js';
import msgBus from './util/message_bus';
import Game from './game';

const game = Game.getInstance();
const GAMEOVER_STR = 'GAME OVER!/游戏结束！';
const gameoverText = new PIXI.Text(GAMEOVER_STR, {
    fontFamily : 'Arial',
    fontSize: 64,
    fill : 0xff1010,
    align : 'center'}
);

const RESTART_STR = 'Restart/重新开始？';
const restartText = new PIXI.Text(RESTART_STR, {
    fontFamily : 'Arial',
    fontSize:48,
    fill : 0x0000cf,
    align : 'center'}
);

function onClickRestart(){
    if (game.status === Game.STATUS.GAME_OVER) {
        hide();
        msgBus.send('gameover_screen.restart');
    }
}

let notAdded = true;

function show(stage){
    if (notAdded) {
        stage.addChild(gameoverText);
        gameoverText.anchor.set(0.5);
        gameoverText.x = Math.floor(game.getWidth()/2);
        gameoverText.y = Math.floor(game.getHeight()/4);

        stage.addChild(restartText);
        restartText.anchor.set(0.5);
        restartText.x = Math.floor(game.getWidth()/2);
        restartText.y = Math.floor(game.getHeight()/4*3);
        restartText.interactive = true;
        restartText.buttonMode = true;
        notAdded = false;
    }

    gameoverText.visible = true;
    restartText.visible = true;
    restartText.on('click', onClickRestart);
    msgBus.listen('user.key_space', onClickRestart);
}

function hide(){
    gameoverText.visible = false;
    restartText.visible = false;
}

function onGameStatusChange(content) {
    if (content.new === Game.STATUS.GAME_OVER) {
        show(game.getStage());
    }
}

msgBus.listen('game.statusChange', onGameStatusChange);

export {show, hide};