import * as PIXI from 'pixi.js';
import msgBus from './util/message_bus';
import Game from './game';

const game = Game.getInstance();
const SCORE_STR = 'Score/得分: ';
const scoreText = new PIXI.Text(SCORE_STR, {
  fontFamily : 'Arial',
  fontSize: 28,
  fill : 0x2222ff,
  align : 'center'}
);

const scoreLabel = new PIXI.Container();
scoreLabel.addChild(scoreText);

let notAdded = true;
let score = 0;

function onGameStatusChange(content) {
  if (content.new === Game.STATUS.GAME_OVER) {
    // scoreLabel.visible = false;
  } else if (content.new === Game.STATUS.PLAYING) {
    if (notAdded) {
      game.getStage().addChild(scoreLabel);
      scoreLabel.y = 10;
      scoreLabel.x = 100;
      notAdded = false;
    }
    score = 0;
    scoreText.text = SCORE_STR + score;
    scoreLabel.visible = true;
  }
}

function addScore(s){
  score += s;
  scoreText.text = SCORE_STR + score;
}

msgBus.listen('game.statusChange', onGameStatusChange);
msgBus.listen('score.add', addScore);

export {scoreLabel};