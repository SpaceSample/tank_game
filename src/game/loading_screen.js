import * as PIXI from 'pixi.js';
import gameVars from './util/game_vars';

const LOADING_STR = 'Loading/加载中';
const loadingText = new PIXI.Text(LOADING_STR, {
    fontFamily : 'Arial',
    fontSize: 64,
    fill : 0xff1010,
    align : 'center'}
);

let intervalNo = -1;
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

function show(stage){
    stage.addChild(loadingText);
    loadingText.anchor.set(0.5);
    loadingText.x = Math.floor(gameVars.getWidth()/2);
    loadingText.y = Math.floor(gameVars.getHeight()/2);
    intervalNo = setInterval(updateDot, 300);
}

function hide(stage){
    stage.removeChild(loadingText);
    clearInterval(intervalNo);
}

export {show, hide};