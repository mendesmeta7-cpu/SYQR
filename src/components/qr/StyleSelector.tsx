import React from 'react';
import { Card, Button } from '../ui';
import { Palette, Shield, Settings2, RotateCcw, AlertTriangle } from 'lucide-react';
import type { QRStyleType, QRStyleConfig } from '../../utils/qrStyles';
import { DEFAULT_CUSTOM_CONFIG } from '../../utils/qrStyles';
import { isContrastSufficient } from '../../utils/colorUtils';

interface StyleSelectorProps {
    currentStyle: QRStyleType;
    onStyleChange: (style: QRStyleType) => void;
    customConfig: QRStyleConfig;
    onCustomConfigChange: (config: QRStyleConfig) => void;
}

export const StyleSelector: React.FC<StyleSelectorProps> = ({
    currentStyle,
    onStyleChange,
    customConfig,
    onCustomConfigChange,
}) => {
    const contrastRatio = isContrastSufficient(customConfig.dotsColor, customConfig.backgroundColor);

    const handleColorChange = (key: 'dotsColor' | 'backgroundColor', value: string) => {
        onCustomConfigChange({
            ...customConfig,
            [key]: value,
        });
    };

    const handleTransparencyToggle = () => {
        onCustomConfigChange({
            ...customConfig,
            isTransparent: !customConfig.isTransparent,
        });
    };

    const resetCustom = () => {
        onCustomConfigChange(DEFAULT_CUSTOM_CONFIG);
    };

    return (
        <Card className="flex flex-col gap-6 w-full max-w-md mx-auto mt-4">
            <div className="flex flex-col gap-2">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <Palette size={20} className="text-neo-cyan" />
                    Style du QR Code
                </h3>
                <p className="text-sm text-white/60">
                    Personnalisez l'apparence de votre QR code.
                </p>
            </div>

            <div className="grid grid-cols-3 gap-3">
                <Button
                    variant={currentStyle === 'classic' ? 'primary' : 'ghost'}
                    onClick={() => onStyleChange('classic')}
                    className="flex flex-col items-center py-4 px-2 h-auto"
                >
                    <Shield size={24} className="mb-2" />
                    <span className="text-xs font-bold">Classique</span>
                </Button>
                <Button
                    variant={currentStyle === 'synapta' ? 'primary' : 'ghost'}
                    onClick={() => onStyleChange('synapta')}
                    className="flex flex-col items-center py-4 px-2 h-auto border border-white/10"
                >
                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#00f5ff] to-[#1d4ed8] mb-2" />
                    <span className="text-xs font-bold">Synapta</span>
                </Button>
                <Button
                    variant={currentStyle === 'custom' ? 'primary' : 'ghost'}
                    onClick={() => onStyleChange('custom')}
                    className="flex flex-col items-center py-4 px-2 h-auto border border-white/10"
                >
                    <Settings2 size={24} className="mb-2" />
                    <span className="text-xs font-bold">Sur Mesure</span>
                </Button>
            </div>

            {currentStyle === 'custom' && (
                <div className="flex flex-col gap-4 p-4 rounded-xl bg-white/5 border border-white/10 animate-fade-in">
                    <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-white/80">Couleurs</span>
                        <button
                            onClick={resetCustom}
                            className="text-xs text-white/40 hover:text-white flex items-center gap-1 transition-colors"
                        >
                            <RotateCcw size={12} /> Réinitialiser
                        </button>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col gap-2">
                            <label className="text-xs text-white/60">QR Code</label>
                            <div className="flex items-center gap-3 bg-white/5 p-2 rounded-lg border border-white/10">
                                <input
                                    type="color"
                                    value={customConfig.dotsColor}
                                    onChange={(e) => handleColorChange('dotsColor', e.target.value)}
                                    className="w-8 h-8 rounded cursor-pointer bg-transparent border-none"
                                />
                                <span className="text-xs font-mono uppercase text-white/80">{customConfig.dotsColor}</span>
                            </div>
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-xs text-white/60">Fond</label>
                            <div className="flex items-center gap-3 bg-white/5 p-2 rounded-lg border border-white/10">
                                <input
                                    type="color"
                                    value={customConfig.backgroundColor}
                                    onChange={(e) => handleColorChange('backgroundColor', e.target.value)}
                                    className="w-8 h-8 rounded cursor-pointer bg-transparent border-none"
                                    disabled={customConfig.isTransparent}
                                />
                                <span className="text-xs font-mono uppercase text-white/80">
                                    {customConfig.isTransparent ? 'Transparent' : customConfig.backgroundColor}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 mt-2">
                        <input
                            type="checkbox"
                            id="transparent-bg"
                            checked={customConfig.isTransparent}
                            onChange={handleTransparencyToggle}
                            className="w-4 h-4 accent-neo-cyan"
                        />
                        <label htmlFor="transparent-bg" className="text-sm text-white/80 cursor-pointer">
                            Fond transparent (PNG uniquement)
                        </label>
                    </div>

                    {!contrastRatio && !customConfig.isTransparent && (
                        <div className="flex items-start gap-2 p-3 rounded-lg bg-orange-500/10 border border-orange-500/20 text-orange-400 mt-2">
                            <AlertTriangle size={16} className="shrink-0 mt-0.5" />
                            <p className="text-xs leading-relaxed">
                                <strong>Attention :</strong> Le contraste est trop faible. Le QR code pourrait être difficile à scanner.
                            </p>
                        </div>
                    )}
                </div>
            )}
        </Card>
    );
};
