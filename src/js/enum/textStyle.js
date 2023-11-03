import Color from "./color";
import Constants from '../constants/constants';

const TextStyle = {
    /** @type {Phaser.Types.GameObjects.Text.TextStyle} */
    Button: {
        fontSize: '26px',
        color: Color.String.DARK,
        fontFamily: Constants.FONT_FAMILY,
    },
    /** @type {Phaser.Types.GameObjects.Text.TextStyle} */
    Loading: {
        fontSize: '42px',
        color: Color.String.DARK,
        fontFamily: Constants.FONT_FAMILY,
    },
    /** @type {Phaser.Types.GameObjects.Text.TextStyle} */
    Title: {
        fontSize: '68px',
        color: Color.String.DARK,
        fontFamily: Constants.FONT_FAMILY,
        stroke: Color.String.BEIGE,
        strokeThickness: 3
    }
}

export default TextStyle