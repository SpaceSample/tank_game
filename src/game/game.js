import msgBus from './util/message_bus';

const GAME_STATUS = {
    UNINIT: 0,
    INIT: 1,
    LOADED: 2,
    PLAYING: 3,
    GAME_OVER:4
};

class Game{
    constructor(){
        this.status = GAME_STATUS.UNINIT;
    }

    // game state machine
    updateStatus(newStatus){
        if(newStatus === GAME_STATUS.INIT) {
            if (this.status !== GAME_STATUS.UNINIT) {
                throw new Error('Game status wrong, do not init again.');
            }
            this.status = GAME_STATUS.INIT;
        } else if(newStatus === GAME_STATUS.LOADED) {
            if (this.status !== GAME_STATUS.INIT) {
                throw new Error('Game status wrong, do not load again.');
            }
        } else if(newStatus === GAME_STATUS.PLAYING) {
            if (this.status !== GAME_STATUS.LOADED && this.status !== GAME_STATUS.GAME_OVER) {
                throw new Error('Game status wrong, do not start when init or playing.');
            }
        } else {
            throw new Error('Wrong game status');
        }
        const old = this.status;
        this.status = newStatus;
        msgBus.send('game.statusChange', {old, new: newStatus});
    }

    init(app){
        this.pixiApp = app;
        if (this.loaderTmp) {
            this.loaderTmp.forEach(resUrl => app.loader.add(resUrl));
        }
        this.updateStatus(GAME_STATUS.INIT);
        this.pixiApp.loader.load(() => {
            setTimeout(() => this.onResLoaded(), 1000);
            // TODO 
            if(window.__DEBUG){
                window.g = game;
                window.msgBus = msgBus;
            }
        });
        msgBus.listen('start_screen.start', () => this.updateStatus(GAME_STATUS.PLAYING));
        this.pixiApp.ticker.start();
    }

    onResLoaded(){
        this.updateStatus(GAME_STATUS.LOADED);
    }

    addToLoader(resUrl){
        if (this.status !== GAME_STATUS.UNINIT ) {
            throw new Error('Cannot add to loader after init');
        }
        if (this.pixiApp){
            this.pixiApp.loader.add(resUrl);
        } else {
            if(!this.loaderTmp) {
                this.loaderTmp = [];
            }
            this.loaderTmp.push(resUrl);
        }
    }

    getStage(){
        return this.pixiApp.stage;
    }

    getTicker() {
        return this.pixiApp.ticker;
    }

    getWidth() {
        return window.innerWidth;
    }

    getHeight () {
        return window.innerHeight;
    }
}

Game.STATUS = GAME_STATUS;
// singleton
const game = new Game();
Game.getInstance = () => game;

export default Game;
