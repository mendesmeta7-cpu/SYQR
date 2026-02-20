import React, { useState, useEffect } from 'react';
import { clsx } from 'clsx';
import { Input, Select, Card } from '../ui';
import { type WifiEncryption } from '../../utils/wifi';
import { isValidSSID, isValidPassword } from '../../utils/validation';

export interface WifiState {
    ssid: string;
    password?: string;
    encryption: WifiEncryption;
    hidden: boolean;
}

interface WifiFormProps {
    value: WifiState;
    onChange: (value: WifiState) => void;
}

export const WifiForm: React.FC<WifiFormProps> = ({ value, onChange }) => {
    const [ssidError, setSsidError] = useState('');
    const [passError, setPassError] = useState('');

    // Auto-validate whenever value changes
    useEffect(() => {
        if (value.ssid && !isValidSSID(value.ssid)) {
            setSsidError('Nom SSID : 32 caractères max');
        } else {
            setSsidError('');
        }

        if (value.password && !isValidPassword(value.password, value.encryption)) {
            if (value.encryption === 'WPA' && value.password.length < 8) {
                setPassError('Au moins 8 caractères pour WPA');
            } else {
                setPassError('');
            }
        } else {
            setPassError('');
        }
    }, [value]);

    const handleChange = (field: keyof WifiState, val: string | boolean) => {
        onChange({
            ...value,
            [field]: val
        });
    };

    const encryptionOptions = [
        { value: 'WPA', label: 'WPA/WPA2 (Standard)' },
        { value: 'WEP', label: 'WEP (Ancien)' },
        { value: 'nopass', label: 'Ouvert (Sans mot de passe)' },
    ];

    return (
        <Card className="flex flex-col gap-5 p-8">
            <h2 className="text-3xl font-bold mb-4 text-center tracking-tight text-white">Accès Wi-Fi</h2>

            <div className="space-y-6">
                <Input
                    label="Nom du réseau (SSID)"
                    placeholder="MonWifiMaison"
                    value={value.ssid}
                    onChange={(e) => handleChange('ssid', e.target.value)}
                    error={ssidError}
                    maxLength={32}
                />

                <Select
                    label="Type de sécurité"
                    options={encryptionOptions}
                    value={value.encryption}
                    onChange={(e) => handleChange('encryption', e.target.value as WifiEncryption)}
                />

                {value.encryption !== 'nopass' && (
                    <Input
                        label="Mot de passe"
                        type="password"
                        placeholder="••••••••"
                        value={value.password || ''}
                        onChange={(e) => handleChange('password', e.target.value)}
                        error={passError}
                    />
                )}

                <div className="pt-2">
                    <label className="group flex items-center gap-3 cursor-pointer w-fit select-none">
                        <div className="relative flex items-center">
                            <input
                                type="checkbox"
                                checked={value.hidden}
                                onChange={(e) => handleChange('hidden', e.target.checked)}
                                className="sr-only"
                            />
                            <div className={clsx(
                                "w-6 h-6 rounded-lg border-2 transition-all duration-300 flex items-center justify-center",
                                value.hidden ? "border-neon-cyan bg-neon-glow" : "border-white/10 bg-white/5"
                            )}
                                style={{
                                    borderColor: value.hidden ? 'var(--neon-cyan)' : 'rgba(255,255,255,0.1)',
                                    backgroundColor: value.hidden ? 'var(--neon-glow)' : 'rgba(255,255,255,0.05)'
                                }}>
                                <div className={clsx(
                                    "w-2.5 h-2.5 rounded-sm bg-neon-cyan transition-opacity",
                                    value.hidden ? "opacity-100" : "opacity-0"
                                )}
                                    style={{
                                        backgroundColor: 'var(--neon-cyan)',
                                        boxShadow: value.hidden ? '0 0 8px var(--neon-cyan)' : 'none',
                                        opacity: value.hidden ? 1 : 0
                                    }} />
                            </div>
                        </div>
                        <span className="text-sm font-medium transition-colors"
                            style={{ color: 'var(--tech-text-secondary)' }}>
                            Réseau masqué
                        </span>
                    </label>
                </div>
            </div>
        </Card>
    );
};
