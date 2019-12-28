const gameVars = {
    getWidth: () => window.innerWidth,
    getHeight: () => window.innerHeight,
    GAME_STATUS: {
        INIT: 1,
        LOADED: 2,
        PLAYING: 3,
        GAME_OVER:4
    },
    status: 1,
    stage: null
};

export default gameVars;