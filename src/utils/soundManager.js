import { Howl } from 'howler';
import backgroundMenuMusicFile1 from '../assets/background-menu1.mp3';
import backgroundMenuMusicFile2 from '../assets/pokemon-intro.mp3';
import backgroundMenuMusicFile3 from '../assets/pokemon-intro-intro.mp3';
import clickOptionSoundFile from '../assets/click-option.wav';
import backgroundBattleMusicFile from '../assets/background-battle.wav';
import attackSoundFile from '../assets/punch.wav';
import victorySoundFile from '../assets/victory.wav';

const backgroundTracks = [
  backgroundMenuMusicFile1,
  backgroundMenuMusicFile2,
  backgroundMenuMusicFile3,
];

let currentBackgroundMusic = null;

const playNextBackgroundTrack = () => {
  const randomIndex = Math.floor(Math.random() * backgroundTracks.length);
  currentBackgroundMusic = new Howl({
    src: [backgroundTracks[randomIndex]],
    loop: false,
    volume: 0.5,
    onend: playNextBackgroundTrack,
  });
  currentBackgroundMusic.play();
};

export const playBackgroundMusic = () => {
  if (!currentBackgroundMusic || !currentBackgroundMusic.playing()) {
    playNextBackgroundTrack();
  }
};

export const stopBackgroundMusic = () => {
  if (currentBackgroundMusic) {
    currentBackgroundMusic.stop();
    currentBackgroundMusic = null;
  }
};

const clickOptionSound = new Howl({
  src: [clickOptionSoundFile],
  volume: 0.5,
});

const backgroundBattleMusic = new Howl({
  src: [backgroundBattleMusicFile],
  volume: 0.5,
  loop: true,
});

const attackSound = new Howl({
  src: [attackSoundFile],
  volume: 0.5,
});

const victorySound = new Howl({
  src: [victorySoundFile],
  volume: 0.5,
});

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

