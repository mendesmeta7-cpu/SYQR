export const isValidUrl = (url: string): boolean => {
    try {
        new URL(url);
        return true;
    } catch (err) {
        return false;
    }
};

export const isValidSSID = (ssid: string): boolean => {
    return ssid.length > 0 && ssid.length <= 32;
};

export const isValidPassword = (password: string, encryption: string): boolean => {
    if (encryption === 'nopass') return true;
    if (encryption === 'WPA') return password.length >= 8;
    if (encryption === 'WEP') return password.length > 0;
    return false;
};
