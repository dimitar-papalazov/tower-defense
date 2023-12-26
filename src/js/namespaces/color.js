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
     * @param {string|number} color
     * @param {number} [percent]
     * @param {boolean} [toString]
     */
    darken: (color, percent = 0.1, toString = true) => {
        if (typeof color === "number") {
            color = Color.toString(color);
        }

        percent = Math.min(1, Math.max(0, percent));

        let r = parseInt(color.substring(1, 3), 16);
        let g = parseInt(color.substring(3, 5), 16);
        let b = parseInt(color.substring(5, 7), 16);

        r = Math.round(r - r * percent);
        g = Math.round(g - g * percent);
        b = Math.round(b - b * percent);
        
        r = Math.min(255, Math.max(0, r));
        g = Math.min(255, Math.max(0, g));
        b = Math.min(255, Math.max(0, b));

        color = `#${r.toString(16)}${g.toString(16)}${b.toString(16)}`
        
        if (toString) {
            return color;
        } else {
            return Color.toNumber(color);
        }
    },
    /**
     * @param {string|number} color
     * @param {number} [percent]
     * @param {boolean} [toString]
     */
    lighten: (color, percent = 0.1, toString = true) => {
        if (typeof color === "number") {
            color = Color.toString(color);
        }

        percent = Math.min(1, Math.max(0, percent));

        let r = parseInt(color.substring(1, 3), 16);
        let g = parseInt(color.substring(3, 5), 16);
        let b = parseInt(color.substring(5, 7), 16);

        r = Math.round(r + r * percent);
        g = Math.round(g + g * percent);
        b = Math.round(b + b * percent);
        
        r = Math.min(255, Math.max(0, r));
        g = Math.min(255, Math.max(0, g));
        b = Math.min(255, Math.max(0, b));

        color = `#${r.toString(16)}${g.toString(16)}${b.toString(16)}`
        
        if (toString) {
            return color;
        } else {
            return Color.toNumber(color);
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