import Color from "./color";
import Constants from '../constants/constants';

const TextStyle = {
    /** @type {Phaser.Types.GameObjects.Text.TextStyle} */
    Button: {
        fontSize: 26,
        color: Color.String.DARK,
        fontFamily: Constants.FONT_FAMILY,
    },
    /** @type {Phaser.Types.GameObjects.Text.TextStyle} */
    Loading: {
        fontSize: 42,
        color: Color.String.DARK,
        fontFamily: Constants.FONT_FAMILY,
    },
    /** @type {Phaser.Types.GameObjects.Text.TextStyle} */
    Title: {
        fontSize: 68,
        color: Color.String.DARK,
        fontFamily: Constants.FONT_FAMILY,
        stroke: Color.String.BEIGE,
        strokeThickness: 3
    }
}

export default TextStyle