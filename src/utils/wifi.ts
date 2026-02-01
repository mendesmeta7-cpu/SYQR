export type WifiEncryption = 'WPA' | 'WEP' | 'nopass';

export const generateWifiString = (
    ssid: string,
    password?: string,
    encryption: WifiEncryption = 'WPA',
    hidden: boolean = false
): string => {
    if (!ssid) return '';

    // Escape special characters: \ ; , : "
    const escape = (str: string) => str.replace(/([\\;,:"])/g, '\\$1');

    const ssidEscaped = escape(ssid);
    const passwordEscaped = password ? escape(password) : '';

    let str = `WIFI:S:${ssidEscaped};`;

    if (encryption !== 'nopass') {
        str += `T:${encryption};`;
    }

    if (password && encryption !== 'nopass') {
        str += `P:${passwordEscaped};`;
    }

    if (hidden) {
        str += `H:true;`;
    }

    return str + ';';
};
