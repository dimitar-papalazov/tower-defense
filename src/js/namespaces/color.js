const Color = {
    Number: {
        LIGHT: 0xfaf5d8,
        DARK: 0x21181b,
        YELLOW: 0xf2ab37,
        ORANGE: 0xcd5f2a,
        BEIGE: 0xd8ae8b,
    },
    String: {
        LIGHT: '#faf5d8',
        DARK: '#21181b',
        YELLOW: '#f2ab37',
        ORANGE: '#cd5f2a',
        BEIGE: '#d8ae8b',
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