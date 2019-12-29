import * as PIXI from 'pixi.js';
import userAgent from './user_agent';
import tank from './tank';
import * as loadingScreen from './loading_screen';
import * as startScreen from './start_screen';
import gameVars from './util/game_vars';
import msgBus from './util/message_bus';

const game = new PIXI.Application({resizeTo: window});
loadingScreen.show(game.stage);
game.loader.add('assets/tank1.png');
game.loader.add('assets/bullet.png');
game.ticker.start();

function onResLoaded(){
    userAgent.init();
    loadingScreen.hide(game.stage);
    gameVars.status = gameVars.GAME_STATUS.LOADED;
    startScreen.show(game.stage);
}
gameVars.stage = game.stage;

game.loader.load(() => {
    setTimeout(onResLoaded, 2000);
    
    // TODO 
    if(window.__DEBUG){
        window.g = game;
        window.msgBus = msgBus;
    }
});



export default game;
