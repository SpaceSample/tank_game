import * as PIXI from 'pixi.js'
PIXI.Application.registerPlugin(PIXI.AppLoaderPlugin);
const app = new PIXI.Application({width: 800, height: 600});
app.loader.add('assets/tank1.png');
const ticker = new PIXI.Ticker();
app.loader.load(() => {
    console.log(app.renderer);
    const tank1 = new PIXI.Sprite(PIXI.utils.TextureCache['assets/tank1.png']);
    const container = new PIXI.Container();
    app.stage.addChild(container);
    const texture = PIXI.Texture.from('assets/xl.jpg');
    const sp = new PIXI.Sprite(texture);
    container.addChild(sp);
    container.addChild(tank1);
    app.ticker.add(d => {
        sp.x +=10;
        if(sp.x>700){
            sp.x = 0;
        }
    });
   ticker.start();
});

export default app;