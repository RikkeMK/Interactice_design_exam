import { QRCodeSVG } from "qrcode.react";

export default function QROverlay({ onClose, url, hoveringClose, countdown }) {
  return (
    <div className="qrOverlay">
      <div className="qrBox">
        <h2 className="qrTitle">
          <span>SCAN THE QR</span>
          <span>& GET DIRECTIONS</span>
        </h2>
        <QRCodeSVG
          value={url ?? { image: "/src/assets/route.svg" }}
          size={325}
        />
        <p className="qrCountdown">{countdown}s</p>
      </div>
      <button
        className="qrCloseButton"
        data-hovering={hoveringClose}
        onClick={onClose}
      >
        <h2>close directions</h2>
      </button>
    </div>
  );
}
