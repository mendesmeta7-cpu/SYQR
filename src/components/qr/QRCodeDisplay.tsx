import React, { useEffect, useState } from 'react';
import { useQRCode } from '../../hooks/useQRCode';
import { Button, Card } from '../ui';
import { Download, Share2 } from 'lucide-react';
import { StyleSelector } from './StyleSelector';
import type { QRStyleType, QRStyleConfig } from '../../utils/qrStyles';
import { QR_STYLES, DEFAULT_CUSTOM_CONFIG } from '../../utils/qrStyles';
import type { Options } from 'qr-code-styling';

interface QRCodeDisplayProps {
    data: string;
    logo?: string;
}

export const QRCodeDisplay: React.FC<QRCodeDisplayProps> = ({ data, logo }) => {
    const { ref, update, download } = useQRCode(data);
    const [currentStyle, setCurrentStyle] = useState<QRStyleType>('synapta');
    const [customConfig, setCustomConfig] = useState<QRStyleConfig>(DEFAULT_CUSTOM_CONFIG);

    useEffect(() => {
        const config = currentStyle === 'custom' ? customConfig : QR_STYLES[currentStyle];

        const options: Partial<Options> = {
            data: data,
            dotsOptions: {
                type: config.dotsType,
                color: config.dotsColor,
                gradient: config.gradient,
            },
            backgroundOptions: {
                color: config.isTransparent ? 'transparent' : config.backgroundColor,
            },
            cornersSquareOptions: {
                type: config.cornersSquareType,
                color: config.gradient ? config.gradient.colorStops[0].color : config.dotsColor,
            },
            cornersDotOptions: {
                type: config.cornersDotType,
                color: config.gradient ? config.gradient.colorStops[1].color : config.dotsColor,
            },
            image: logo,
            imageOptions: {
                hideBackgroundDots: true,
                imageSize: 0.4,
                margin: 5
            }
        };
        update(options);
    }, [data, logo, update, currentStyle, customConfig]);

    const handleDownload = (ext: 'png' | 'svg') => {
        download(ext, `syqr-${currentStyle}-${ext.toUpperCase()}`);
    };

    return (
        <div className="flex flex-col gap-6 w-full max-w-md mx-auto">
            <Card className="flex flex-col items-center justify-center gap-8 w-full p-10 bg-white/5 border-white/5">
                <div className="relative">
                    {/* Subtle glow behind QR */}
                    <div className="absolute opacity-20"
                        style={{ inset: '-1rem', backgroundColor: 'var(--neon-glow)', borderRadius: '32px', filter: 'blur(32px)' }} />

                    <div
                        ref={ref}
                        className="relative p-6 transition-all duration-500 border border-white/10"
                        style={{
                            width: 'fit-content',
                            backgroundColor: currentStyle === 'custom' && customConfig.isTransparent ? 'transparent' : (currentStyle === 'custom' ? customConfig.backgroundColor : QR_STYLES[currentStyle].backgroundColor),
                            borderRadius: '24px',
                            boxShadow: currentStyle === 'custom' && customConfig.isTransparent ? 'none' : '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
                        }}
                    />
                </div>

                <div className="flex flex-col gap-4 w-full mt-2">
                    <div className="flex gap-4 w-full">
                        <Button
                            variant="primary"
                            fullWidth
                            onClick={() => handleDownload('png')}
                            disabled={!data}
                            style={{ borderRadius: '20px', paddingTop: '1rem', paddingBottom: '1rem' }}
                        >
                            <span className="flex items-center font-bold">
                                PNG <Download size={20} className="ml-2" />
                            </span>
                        </Button>
                        <Button
                            variant="secondary"
                            fullWidth
                            onClick={() => handleDownload('svg')}
                            disabled={!data}
                            style={{ borderRadius: '20px', paddingTop: '1rem', paddingBottom: '1rem', borderColor: 'rgba(255,255,255,0.2)', color: 'white' }}
                        >
                            <span className="flex items-center font-bold">
                                SVG <Download size={20} className="ml-2" />
                            </span>
                        </Button>
                    </div>

                    {navigator.share && (
                        <Button
                            variant="ghost"
                            fullWidth
                            onClick={() => navigator.share({ title: 'SYQR', text: 'Mon QR Code SYQR', url: window.location.href })}
                            disabled={!data}
                            className="flex items-center justify-center gap-2"
                            style={{ color: 'var(--tech-text-secondary)' }}
                        >
                            <Share2 size={20} />
                            <span className="font-medium text-sm">Partager</span>
                        </Button>
                    )}
                </div>
            </Card>

            <StyleSelector
                currentStyle={currentStyle}
                onStyleChange={setCurrentStyle}
                customConfig={customConfig}
                onCustomConfigChange={setCustomConfig}
            />
        </div>
    );
};
