const Color = {
    Number: {
        LIGHT: 0xfaf5d8,
        WHITE: 0xffffff,
        DARK: 0x21181b,
        YELLOW: 0xf2ab37,
        ORANGE: 0xcd5f2a,
        BEIGE: 0xd8ae8b,
        BLACK: 0x2d2f2a,
        BLUE: 0x386d92,
        GREEN: 0x748942,
        RED: 0xcd2a47
    },
    String: {
        LIGHT: '#faf5d8',
        WHITE: '#ffffff',
        DARK: '#21181b',
        YELLOW: '#f2ab37',
        ORANGE: '#cd5f2a',
        BEIGE: '#d8ae8b',
        BLACK: '#2d2f2a',
        BLUE: '#386d92',
        GREEN: '#748942',
        RED: '#cd2a47'
    },
    /**
     * @param {string|number} input
     * @param {number} [amount]
     * @param {boolean} [toString]
     */
    darken: (input, amount = 10, toString = true) => {
        const result = Phaser.Display.Color.ValueToColor(input).darken(amount).color;
        
        if (toString) {
            return `#${result.toString(16)}`
        } else {
            return result;
        }
    },
    /**
     * @param {string|number} input
     * @param {number} [amount]
     * @param {boolean} [toString]
     */
    lighten: (input, amount = 10, toString = true) => {
        const result = Phaser.Display.Color.ValueToColor(input).lighten(amount).color;
        
        if (toString) {
            return `#${result.toString(16)}`
        } else {
            return result;
        }
    },
    /** @param {string} color */
    toNumber: (color) => {
        return parseInt(color.replace('#', '0x'));
    },
    /** @param {number} color */
    toString: (color) => {
        return `#${color.toString(16)}`;
    }
}

export default Color;