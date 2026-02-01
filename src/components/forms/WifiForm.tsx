import React, { useState, useEffect } from 'react';
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
                setPassError('Le mot de passe WPA doit contenir au moins 8 caractères');
            } else {
                setPassError(''); // WEP can be anything > 0 usually
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
        <Card className="flex flex-col gap-4">
            <h2 className="text-xl font-semibold mb-2 text-gradient">Accès Wi-Fi</h2>

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

            <label className="flex items-center gap-2 cursor-pointer mt-2 w-fit">
                <input
                    type="checkbox"
                    checked={value.hidden}
                    onChange={(e) => handleChange('hidden', e.target.checked)}
                    className="w-4 h-4 rounded border-gray-300 text-[var(--tech-cyan)] focus:ring-[var(--tech-cyan)]"
                />
                <span className="text-sm font-medium text-[var(--tech-text-secondary)]">
                    Réseau masqué
                </span>
            </label>
        </Card>
    );
};
