import { Application } from '@pixi/app';
import { AppLoaderPlugin } from '@pixi/loaders';
import * as utils from '@pixi/utils';
import { Sprite } from '@pixi/sprite';

// class Game {
//     construcor(container, width, height){
//         this.app = new PIXI.Application({width, height});
//         container.appendChild(app.view);
//     }
// }
Application.registerPlugin(AppLoaderPlugin);
const app = new Application();
app.loader.add('assets/xl.jpg');
app.loader.load(() => {
    const sprite = new Sprite(utils.TextureCache['assets/xl.jpg']);
    app.stage.addChild(sprite);
});
export default app;