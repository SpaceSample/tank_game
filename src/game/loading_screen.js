import * as PIXI from 'pixi.js';
import msgBus from './util/message_bus';
import Game from './game';

const game = Game.getInstance();
const LOADING_STR = 'Loading/加载中';
const loadingText = new PIXI.Text(LOADING_STR, {
    fontFamily : 'Arial',
    fontSize: 64,
    fill : 0xff1010,
    align : 'center'}
);

let intervalNo = -1;

function show(stage){
    stage.addChild(loadingText);
    loadingText.anchor.set(0.5);
    loadingText.x = Math.floor(game.getWidth()/2);
    loadingText.y = Math.floor(game.getHeight()/2);

    let dotCount = 0 ;
    function updateDot(){
        dotCount++;
        dotCount = dotCount > 3 ? 0 : dotCount;
        let postfix = '';
        for(let i=0;i<dotCount;i++){
            postfix += '.';
        }
        loadingText.text = LOADING_STR + postfix;
    }
    intervalNo = setInterval(updateDot, 200);
}

function hide(stage){
    stage.removeChild(loadingText);
    clearInterval(intervalNo);
}

function onGameStatusChange(content) {
    if (content.new === Game.STATUS.INIT) {
        show(game.getStage());
    } else if (content.new === Game.STATUS.LOADED) {
        hide(game.getStage());
        msgBus.unListen('game.statusChange', onGameStatusChange);
    }
}

msgBus.listen('game.statusChange', onGameStatusChange);

export {show, hide};