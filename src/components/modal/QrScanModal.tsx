interface QrScanModalProps {
  closeModal: () => void;
}

const QrScanModal = ({ closeModal }: QrScanModalProps) => {
  return (
    <div className="p-2">
      <h2 className="text-lg font-semibold ">Scan QR Code</h2>
      <p className="text-sm text-muted-foreground">Use your device's camera to scan a QR code for payment.</p>
      <div className="mt-2 p-0">
        <div className="flex items-center justify-center h-64 bg-gray-100 rounded-md text-muted-foreground">Camera feed would appear here</div>
      </div>
    </div>
  );
};

export { QrScanModal };
