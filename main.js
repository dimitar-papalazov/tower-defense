import Phaser from "phaser";
import TowerDefenseGame from "./src/js/game/towerDefenseGame";

const fontFace = new FontFace('VT323-Regular', 'url(./src/assets/fonts/VT323-Regular.ttf)');

fontFace
    .load()
    .then(() => {
        document.fonts.add(fontFace);
    })
    .catch(error => {
        console.warn('Font not loaded', error);
    })
    .finally(() => {
        new TowerDefenseGame();
    });
