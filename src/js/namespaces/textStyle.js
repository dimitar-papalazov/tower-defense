import Color from "./color";
import Constants from '../constants/constants';

const TextStyle = {
    /** @type {Phaser.Types.GameObjects.Text.TextStyle} */
    ButtonSmall: {
        fontSize: 20,
        color: Color.String.DARK,
        fontFamily: Constants.FONT_FAMILY,
    },
    /** @type {Phaser.Types.GameObjects.Text.TextStyle} */
    Button: {
        fontSize: 26,
        color: Color.String.DARK,
        fontFamily: Constants.FONT_FAMILY,
    },
    /** @type {Phaser.Types.GameObjects.Text.TextStyle} */
    Popup: {
        fontSize: 34,
        color: Color.String.DARK,
        fontFamily: Constants.FONT_FAMILY,
        wordWrap: {
            width: Constants.WIDTH * 0.56
        }
    },
    /** @type {Phaser.Types.GameObjects.Text.TextStyle} */
    TitleSmall: {
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