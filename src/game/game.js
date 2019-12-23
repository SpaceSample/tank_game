import * as PIXI from 'pixi.js'
const game = new PIXI.Application({resizeTo: window});
game.loader.add('assets/tank1.png');
game.loader.load(() => {
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
   game.ticker.start();
   // TODO 
    if(window.__DEBUG){
        window.g = game;
    }
});



export default game;
