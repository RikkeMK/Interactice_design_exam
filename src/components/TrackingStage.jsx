import Webcam from "react-webcam";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { VIDEO_CONSTRAINTS } from "../handTracking";
import {
  MAP_VIEWBOX,
  FESTIVAL_VIEWBOX,
  MAP_AREAS,
  FESTIVAL_AREAS,
  getAreaAtPoint,
  LEFT_RATIO,
} from "../interactiveAreas";
import FestivalSite from "./FestivalSite";
import MapOverview from "./MapOverview";
import { InfoBox } from "./InfoBox";

export function TrackingStage({
  canvasRef,
  onCameraError,
  onCameraReady,
  isLoading,
  isRunning,
  onStartCamera,
  onStopCamera,
  tracking,
  webcamRef,
  hoveredStage,
  onHoverStageChange,
  currentView,
  onNavigate,
}) {
  const handPoint = tracking?.pointer;
  const [lockedStage, setLockedStage] = useState(null);
  const [showQR, setShowQR] = useState(false);
  const [hoveringClose, setHoveringClose] = useState(false);
  const [hoveringButton, setHoveringButton] = useState(false);
  const [qrCountdown, setQrCountdown] = useState(10);

  const dwellTimerRef = useRef(null);
  const dwellTargetRef = useRef(null);
  const buttonDwellRef = useRef(null);
  const closeDwellRef = useRef(null);

  useEffect(() => {
    if (!handPoint || showQR) {
      setHoveringButton(false);
      return;
    }
    setHoveringButton(handPoint.x > LEFT_RATIO && handPoint.y > 0.7);
  }, [handPoint, showQR]);

  useEffect(() => {
    if (!showQR || !handPoint) {
      setHoveringClose(false);
      return;
    }
    const overCloseButton =
      handPoint.x > 0.35 &&
      handPoint.x < 0.65 &&
      handPoint.y > 0.8 &&
      handPoint.y < 0.9;
    setHoveringClose(overCloseButton);
  }, [handPoint, showQR]);

  useEffect(() => {
    if (!showQR) {
      setQrCountdown(10);
      return;
    }
    if (qrCountdown <= 0) {
      setShowQR(false);
      return;
    }
    const timer = setTimeout(() => setQrCountdown((s) => s - 1), 1000);
    return () => clearTimeout(timer);
  }, [showQR, qrCountdown]);

  useLayoutEffect(() => {
    const frameId = requestAnimationFrame(() => {
      if (!isRunning || tracking?.mode !== "tracking" || !handPoint) {
        onHoverStageChange?.(null);
        clearTimeout(dwellTimerRef.current);
        dwellTargetRef.current = null;
        return;
      }

      const isInInfoBox = handPoint.x > LEFT_RATIO;

      const viewbox = currentView === "map" ? MAP_VIEWBOX : FESTIVAL_VIEWBOX;
      const areas = currentView === "map" ? MAP_AREAS : FESTIVAL_AREAS;

      const svgX = (handPoint.x / LEFT_RATIO) * viewbox.width;
      const svgY = handPoint.y * viewbox.height;
      const nextHoveredArea = getAreaAtPoint(svgX, svgY, areas);

      onHoverStageChange?.(nextHoveredArea);

      // QR overlay close-knap dwell
      if (showQR) {
        const overCloseButton =
          handPoint.x > 0.35 &&
          handPoint.x < 0.65 &&
          handPoint.y > 0.8 &&
          handPoint.y < 0.9;

        if (overCloseButton && closeDwellRef.current === null) {
          closeDwellRef.current = setTimeout(() => {
            setShowQR(false);
            closeDwellRef.current = null;
          }, 1500);
        } else if (!overCloseButton && closeDwellRef.current !== null) {
          clearTimeout(closeDwellRef.current);
          closeDwellRef.current = null;
        }
        return;
      }

      // Get There-knap dwell
      if (isInInfoBox && currentView !== "map") {
        const overButton = handPoint.y > 0.7;

        if (overButton && buttonDwellRef.current === null) {
          buttonDwellRef.current = setTimeout(() => {
            setShowQR(true);
            buttonDwellRef.current = null;
          }, 1500);
        } else if (!overButton && buttonDwellRef.current !== null) {
          clearTimeout(buttonDwellRef.current);
          buttonDwellRef.current = null;
        }
      }

      // Lock logik
      if (tracking.gesture === "Closed hand") {
        if (nextHoveredArea) {
          setLockedStage(nextHoveredArea);
        } else if (!isInInfoBox) {
          setLockedStage(null);
        }
      }

      // Kort-navigation dwell
      if (
        currentView === "map" &&
        nextHoveredArea &&
        nextHoveredArea !== dwellTargetRef.current
      ) {
        clearTimeout(dwellTimerRef.current);
        dwellTargetRef.current = nextHoveredArea;
        dwellTimerRef.current = setTimeout(() => {
          onNavigate?.(nextHoveredArea);
        }, 1500);
      } else if (!nextHoveredArea) {
        clearTimeout(dwellTimerRef.current);
        dwellTargetRef.current = null;
      }
    });

    return () => cancelAnimationFrame(frameId);
  }, [
    currentView,
    handPoint,
    isRunning,
    onHoverStageChange,
    onNavigate,
    showQR,
    tracking?.mode,
    tracking?.gesture,
  ]);

  return (
    <div className="app-shell">
      <div className="interactiveSection">
        <div className="leftSection">
          <section className="workspace" aria-label="Hand controlled object">
            <div className="stage" data-running={isRunning ? "true" : "false"}>
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
              <div className="map-scene">
                {currentView === "map" ? (
                  <MapOverview hoveredStage={hoveredStage} />
                ) : (
                  <FestivalSite hoveredStage={hoveredStage} />
                )}
              </div>
              {!isRunning && (
                <div className="start-overlay">
                  <button
                    type="button"
                    onClick={onStartCamera}
                    disabled={isLoading}
                  >
                    {isLoading ? "Loading..." : "Start camera"}
                  </button>
                </div>
              )}
            </div>
          </section>
        </div>
        <div className="rightSection">
          <InfoBox
            tracking={tracking}
            hoveredStage={hoveredStage}
            lockedStage={lockedStage}
            isLoading={isLoading}
            isRunning={isRunning}
            onStartCamera={onStartCamera}
            onStopCamera={onStopCamera}
            showQR={showQR}
            onCloseQR={() => setShowQR(false)}
            hoveringClose={hoveringClose}
            hoveringButton={hoveringButton}
            qrCountdown={qrCountdown}
          />
        </div>
        <canvas ref={canvasRef} className="landmark-layer" aria-hidden="true" />
      </div>
    </div>
  );
}
