import { useState, useMemo } from 'react';
import { AppLayout } from './components/layout/AppLayout';
import { Navigation } from './components/layout/Navigation';
import { WifiForm } from './components/forms/WifiForm';
import { LinkForm } from './components/forms/LinkForm';
import { QRCodeDisplay } from './components/qr/QRCodeDisplay';
import { generateWifiString, type WifiEncryption } from './utils/wifi';

// Defaults
const DEFAULT_WIFI: {
  ssid: string;
  password?: string;
  encryption: WifiEncryption;
  hidden: boolean;
} = {
  ssid: '',
  password: '',
  encryption: 'WPA',
  hidden: false
};

function App() {
  const [activeTab, setActiveTab] = useState<'wifi' | 'link'>('wifi');

  // State for Wi-Fi
  const [wifiState, setWifiState] = useState(DEFAULT_WIFI);

  // State for Link
  const [linkUrl, setLinkUrl] = useState('');

  // Compute QR Data dynamically
  const qrData = useMemo(() => {
    if (activeTab === 'wifi') {
      return generateWifiString(
        wifiState.ssid,
        wifiState.password,
        wifiState.encryption,
        wifiState.hidden
      );
    } else {
      return linkUrl;
    }
  }, [activeTab, wifiState, linkUrl]);

  return (
    <AppLayout>
      <Navigation activeTab={activeTab} onTabChange={setActiveTab} />

      <div className="flex flex-col gap-8 w-full animate-fade-in">
        {/* Input Section */}
        <section className="w-full">
          {activeTab === 'wifi' ? (
            <WifiForm
              value={wifiState}
              onChange={(newState) => setWifiState(newState)}
            />
          ) : (
            <LinkForm
              value={linkUrl}
              onChange={setLinkUrl}
            />
          )}
        </section>

        {/* Output Section */}
        <section className="w-full flex justify-center">
          <QRCodeDisplay data={qrData} />
        </section>
      </div>
    </AppLayout>
  );
}

export default App;
