import { useEffect, useRef, useState } from 'react';
import QRCodeStyling, {
    type Options as QRCodeOptions,
    type FileExtension
} from 'qr-code-styling';

const defaultOptions: QRCodeOptions = {
    width: 300,
    height: 300,
    type: 'svg',
    data: '',
    image: '',
    margin: 10,
    qrOptions: {
        typeNumber: 0,
        mode: 'Byte',
        errorCorrectionLevel: 'M'
    },
    imageOptions: {
        hideBackgroundDots: true,
        imageSize: 0.4,
        margin: 5,
        crossOrigin: 'anonymous',
    },
    dotsOptions: {
        color: '#64ffda',
        type: 'rounded',
        gradient: {
            type: 'linear',
            rotation: 45,
            colorStops: [
                { offset: 0, color: '#64ffda' }, // tech-cyan
                { offset: 1, color: '#2196f3' }  // tech-blue
            ]
        }
    },
    backgroundOptions: {
        color: 'transparent',
    },
    cornersSquareOptions: {
        color: '#64ffda',
        type: 'extra-rounded', // Organic feel
    },
    cornersDotOptions: {
        color: '#2196f3',
        type: 'dot',
    }
};

export const useQRCode = (initialData: string = '') => {
    const ref = useRef<HTMLDivElement>(null);
    const [qrCode, setQrCode] = useState<QRCodeStyling | null>(null);

    useEffect(() => {
        // Lazy initialization on client-side only
        const qr = new QRCodeStyling(defaultOptions);
        setQrCode(qr);
    }, []);

    useEffect(() => {
        if (ref.current && qrCode) {
            ref.current.innerHTML = '';
            qrCode.append(ref.current);
        }
    }, [qrCode]);

    useEffect(() => {
        if (!qrCode) return;
        if (initialData) {
            qrCode.update({
                data: initialData
            });
        }
    }, [initialData, qrCode]);

    const update = (options: Partial<QRCodeOptions>) => {
        if (qrCode) {
            qrCode.update(options);
        }
    };

    const download = (extension: FileExtension, name: string = 'synapta-qr') => {
        if (qrCode) {
            qrCode.download({
                extension: extension,
                name: name
            });
        }
    };

    return { ref, update, download };
};
