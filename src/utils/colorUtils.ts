/**
 * Utility functions for color manipulation and contrast checking.
 */

/**
 * Calculates the relative luminance of a color.
 * Based on WCAG 2.0 formula: https://www.w3.org/TR/WCAG20/#relativeluminancedef
 */
export const getLuminance = (hex: string): number => {
    const rgb = hexToRgb(hex);
    if (!rgb) return 0;

    const [r, g, b] = rgb.map(v => {
        v /= 255;
        return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
    });

    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};

/**
 * Calculates the contrast ratio between two colors.
 * Formula: (L1 + 0.05) / (L2 + 0.05), where L1 is the lighter luminance.
 */
export const getContrastRatio = (color1: string, color2: string): number => {
    const lum1 = getLuminance(color1);
    const lum2 = getLuminance(color2);

    const L1 = Math.max(lum1, lum2);
    const L2 = Math.min(lum1, lum2);

    return (L1 + 0.05) / (L2 + 0.05);
};

/**
 * Converts a hex color string to an RGB array.
 */
export const hexToRgb = (hex: string): [number, number, number] | null => {
    const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, (_m, r, g, b) => r + r + g + g + b + b);

    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? [
        parseInt(result[1], 16),
        parseInt(result[2], 16),
        parseInt(result[3], 16)
    ] : null;
};

/**
 * Checks if the contrast between two colors is sufficient for a QR code.
 * Standard recommendation for QR codes is a contrast ratio of at least 3:1,
 * but higher (4.5:1 or 7:1) is better for reliability.
 */
export const isContrastSufficient = (color1: string, color2: string, threshold = 3): boolean => {
    return getContrastRatio(color1, color2) >= threshold;
};
