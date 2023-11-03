import Phaser from "phaser";
import TowerDefenseGame from "./src/js/game/towerDefenseGame";

try {
    const fontFace = await new FontFace('VT323-Regular', 'url(./src/assets/fonts/VT323-Regular.ttf)').load();
    document.fonts.add(fontFace)
} catch (e) {
    console.warn('Font not loaded', e);
}


new TowerDefenseGame();