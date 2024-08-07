import { Howl } from 'howler';
import backgroundMenuMusicFile from '../assets/background-menu1.mp3';
import clickOptionSoundFile from '../assets/click-option.wav';
import backgroundBattleMusicFile from '../assets/background-battle.wav';
import attackSoundFile from '../assets/punch.wav';
import victorySoundFile from '../assets/victory.wav';

const backgroundMenuMusic = new Howl({
  src: [backgroundMenuMusicFile],
  loop: true,
  volume: 0.5,
});

const clickOptionSound = new Howl({
  src: [clickOptionSoundFile],
  volume: 0.5,
});

const backgroundBattleMusic = new Howl({
  src: [backgroundBattleMusicFile],
  volume: 0.5,
});

const attackSound = new Howl({
  src: [attackSoundFile],
  volume: 0.5,
});

const victorySound = new Howl({
  src: [victorySoundFile],
  volume: 0.5,
});

export const playBackgroundMusic = () => {
  if (!backgroundMenuMusic.playing()) {
    backgroundMenuMusic.play();
  }
};

export const stopBackgroundMusic = () => {
  backgroundMenuMusic.stop();
};

export const playSelectPokemonSound = () => {
  clickOptionSound.play();
};

export const playBattleStartSound = () => {
  backgroundBattleMusic.play();
};

export const stopBattleMusic = () => {
  backgroundBattleMusic.stop();
};

export const playAttackSound = () => {
  attackSound.play();
};

export const playVictorySound = () => {
  victorySound.play();
};
