import React, { useState } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import { Card, CardHeader, CardTitle, CardContent } from './components/Card'; // I'll create these

export function QRScanner({ onResult }) {
  const [scanning, setScanning] = useState(false);

  const startScan = () => {
    setScanning(true);
    const scanner = new Html5QrcodeScanner("reader", { fps: 10, qrbox: 250 });
    scanner.render((result) => {
      scanner.clear();
      setScanning(false);
      onResult(result);
    }, (error) => {
      // Handle error
    });
  };

  return (
    <div className="card" style={{ textAlign: 'center' }}>
      {!scanning ? (
        <button onClick={startScan} className="badge" style={{ padding: '1rem 2rem', border: 'none', cursor: 'pointer' }}>
          START SCANNER
        </button>
      ) : (
        <div id="reader" style={{ width: '100%' }}></div>
      )}
    </div>
  );
}
