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
game.ticker.start();

function onResLoaded(){
    // console.log(game.renderer);
    // const tank1 = new PIXI.Sprite(PIXI.utils.TextureCache['assets/tank1.png']);
    // const container = new PIXI.Container();
    // game.stage.addChild(container);
    // const texture = PIXI.Texture.from('assets/xl.jpg');
    // const sp = new PIXI.Sprite(texture);
    // container.addChild(sp);
    // container.addChild(tank1);
    // game.ticker.add(d => {
    //     sp.x +=10;
    //     sp.y +=10;
    //     if(sp.x>window.innerWidth){
    //         sp.x = 0;
    //     }
    //     if(sp.y>window.innerHeight){
    //         sp.y = 0;
    //     }
    // });
    userAgent.init();
    //game.stage.addChild(tank.sp);
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
