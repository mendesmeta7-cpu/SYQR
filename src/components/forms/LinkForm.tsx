import React, { useState, useEffect } from 'react';
import { Input, Card } from '../ui';
import { isValidUrl } from '../../utils/validation';

interface LinkFormProps {
    value: string;
    onChange: (value: string) => void;
}

export const LinkForm: React.FC<LinkFormProps> = ({ value, onChange }) => {
    const [error, setError] = useState('');

    useEffect(() => {
        if (value && !isValidUrl(value)) {
            setError('Veuillez saisir une URL valide (ex: https://exemple.com)');
        } else {
            setError('');
        }
    }, [value]);

    return (
        <Card className="flex flex-col gap-6 p-8">
            <h2 className="text-3xl font-bold mb-4 text-center tracking-tight text-white">Lien URL</h2>
            <Input
                label="Adresse Web (URL)"
                placeholder="https://exemple.com"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                error={error}
                type="url"
            />
            <p className="text-xs text-[var(--tech-text-secondary)] mt-1">
                Saisissez l'URL complète avec https://
            </p>
        </Card>
    );
};
