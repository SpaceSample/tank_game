import * as PIXI from 'pixi.js';
import './game/user_agent';
import './game/loading_screen';
import './game/start_screen';
import './game/tank';
import Game from './game/game';

const app = new PIXI.Application({resizeTo: window});
const game = Game.getInstance();
game.init(app);

export default app;
