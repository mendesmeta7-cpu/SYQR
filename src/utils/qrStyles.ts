import type { Options } from 'qr-code-styling';

export type QRStyleType = 'classic' | 'synapta' | 'custom';

export interface QRStyleConfig {
    type: QRStyleType;
    dotsColor: string;
    backgroundColor: string;
    dotsType: Options['dotsOptions']['type'];
    cornersSquareType: Options['cornersSquareOptions']['type'];
    cornersDotType: Options['cornersDotOptions']['type'];
    gradient?: {
        type: 'linear' | 'radial';
        rotation?: number;
        colorStops: { offset: number; color: string }[];
    };
    isTransparent?: boolean;
}

export const QR_STYLES: Record<string, QRStyleConfig> = {
    classic: {
        type: 'classic',
        dotsColor: '#000000',
        backgroundColor: '#FFFFFF',
        dotsType: 'square',
        cornersSquareType: 'square',
        cornersDotType: 'square',
    },
    synapta: {
        type: 'synapta',
        dotsColor: '#00f5ff',
        backgroundColor: '#FFFFFF',
        dotsType: 'rounded',
        cornersSquareType: 'extra-rounded',
        cornersDotType: 'dot',
        gradient: {
            type: 'linear',
            rotation: 45,
            colorStops: [
                { offset: 0, color: '#00f5ff' }, // neon-cyan
                { offset: 1, color: '#1d4ed8' }  // deep-blue
            ]
        }
    },
    custom: {
        type: 'custom',
        dotsColor: '#000000',
        backgroundColor: '#FFFFFF',
        dotsType: 'rounded',
        cornersSquareType: 'extra-rounded',
        cornersDotType: 'dot',
    }
};

export const DEFAULT_CUSTOM_CONFIG: QRStyleConfig = {
    type: 'custom',
    dotsColor: '#000000',
    backgroundColor: '#FFFFFF',
    dotsType: 'rounded',
    cornersSquareType: 'extra-rounded',
    cornersDotType: 'dot',
    isTransparent: false,
};
