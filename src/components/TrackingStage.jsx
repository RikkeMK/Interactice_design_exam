import Webcam from "react-webcam";
import { VIDEO_CONSTRAINTS } from "../handTracking";

export function TrackingStage({
  canvasRef,
  onCameraError,
  onCameraReady,
  isLoading,
  isRunning,
  onStartCamera,
  zoom,
  webcamRef,
}) {
  return (
    <div
      className="stage"
      data-running={isRunning ? "true" : "false"}
      style={{ "--zoom-level": zoom }}
    >
      {isRunning && (
        <Webcam
          ref={webcamRef}
          audio={false}
          className="webcam-feed is-hidden"
          onUserMedia={onCameraReady}
          onUserMediaError={onCameraError}
          playsInline
          videoConstraints={VIDEO_CONSTRAINTS}
        />
      )}
      <div className="map-scene" aria-hidden="true">
        <div className="map-grid"></div>
        <div className="map-road map-road--horizontal"></div>
        <div className="map-road map-road--vertical"></div>
        <div className="map-road map-road--diagonal"></div>
        <div className="map-marker map-marker--poi map-marker--top"></div>
        <div className="map-marker map-marker--poi map-marker--right"></div>
        <div className="map-marker map-marker--poi map-marker--bottom"></div>
        <div className="map-marker map-marker--target"></div>
        <div className="map-focus"></div>
      </div>
      <div className="map-hud" aria-hidden="true">
        <span>Map view</span>
        <strong>{Math.round((zoom ?? 0) * 100)}%</strong>
      </div>
      <canvas ref={canvasRef} className="landmark-layer" aria-hidden="true" />

      {!isRunning && (
        <div className="start-overlay">
          <button type="button" onClick={onStartCamera} disabled={isLoading}>
            {isLoading ? "Loading..." : "Start camera"}
          </button>
        </div>
      )}
    </div>
  );
}
