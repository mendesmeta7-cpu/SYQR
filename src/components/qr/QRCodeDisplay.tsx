import React, { useEffect } from 'react';
import { useQRCode } from '../../hooks/useQRCode';
import { Button, Card } from '../ui';
import { Download, Share2 } from 'lucide-react';
import type { Options } from 'qr-code-styling';

interface QRCodeDisplayProps {
    data: string;
    logo?: string;
}

export const QRCodeDisplay: React.FC<QRCodeDisplayProps> = ({ data, logo }) => {
    const { ref, update, download } = useQRCode(data);

    useEffect(() => {
        // Dynamically update based on logo or data
        const options: Partial<Options> = {
            data: data,
            dotsOptions: {
                type: 'rounded',
                gradient: {
                    type: 'linear',
                    rotation: 45,
                    colorStops: [
                        { offset: 0, color: '#64ffda' },
                        { offset: 1, color: '#2196f3' }
                    ]
                }
            },
            cornersSquareOptions: {
                type: 'extra-rounded',
                color: '#64ffda',
            },
            cornersDotOptions: {
                type: 'dot',
                color: '#2196f3',
            },
            image: logo, // Logo URL
            imageOptions: {
                hideBackgroundDots: true,
                imageSize: 0.4,
                margin: 5
            }
        };
        update(options);
    }, [data, logo, update]);

    const handleDownload = (ext: 'png' | 'svg') => {
        download(ext, `syqr-${ext.toUpperCase()}`);
    };

    return (
        <Card className="flex flex-col items-center justify-center gap-6 w-full max-w-md mx-auto">
            <div
                ref={ref}
                className="bg-white p-4 rounded-xl shadow-lg transition-transform hover:scale-[1.02]"
                style={{ width: 'fit-content' }}
            />

            <div className="flex gap-4 w-full">
                <Button
                    variant="primary"
                    fullWidth
                    onClick={() => handleDownload('png')}
                    disabled={!data}
                >
                    <Download size={18} className="mr-2" /> PNG
                </Button>
                <Button
                    variant="secondary"
                    fullWidth
                    onClick={() => handleDownload('svg')}
                    disabled={!data}
                >
                    <Download size={18} className="mr-2" /> SVG
                </Button>
            </div>

            {navigator.share && (
                <Button
                    variant="ghost"
                    fullWidth
                    onClick={() => navigator.share({ title: 'SYQR', text: 'Mon QR Code SYQR', url: window.location.href })}
                    disabled={!data}
                >
                    <Share2 size={18} className="mr-2" /> Partager
                </Button>
            )}
        </Card>
    );
};
