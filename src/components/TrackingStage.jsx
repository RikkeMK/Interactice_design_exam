import Webcam from "react-webcam";
import { useLayoutEffect, useRef, useState } from "react";
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

  const dwellTimerRef = useRef(null);
  const dwellTargetRef = useRef(null);

  useLayoutEffect(() => {
    const frameId = requestAnimationFrame(() => {
      if (!isRunning || tracking?.mode !== "tracking" || !handPoint) {
        onHoverStageChange?.(null);
        clearTimeout(dwellTimerRef.current);
        dwellTargetRef.current = null;
        return;
      }

      const viewbox = currentView === "map" ? MAP_VIEWBOX : FESTIVAL_VIEWBOX;
      const areas = currentView === "map" ? MAP_AREAS : FESTIVAL_AREAS;

      const svgX = (handPoint.x / LEFT_RATIO) * viewbox.width;
      const svgY = handPoint.y * viewbox.height;
      const nextHoveredArea = getAreaAtPoint(svgX, svgY, areas);

      onHoverStageChange?.(nextHoveredArea);

      const isInInfoBox = handPoint.x > LEFT_RATIO;

      if (tracking.gesture === "Closed hand") {
        if (nextHoveredArea) {
          setLockedStage(nextHoveredArea);
        } else if (!isInInfoBox) {
          setLockedStage(null); // ryd kun lock hvis hånden er udenfor InfoBox
        }
      }

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
          />
        </div>
        <canvas ref={canvasRef} className="landmark-layer" aria-hidden="true" />
      </div>
    </div>
  );
}
