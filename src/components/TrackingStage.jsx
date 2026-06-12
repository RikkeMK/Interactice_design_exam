import Webcam from "react-webcam";
import { useLayoutEffect, useRef, useState } from "react";
import { VIDEO_CONSTRAINTS } from "../handTracking";
import {
  ForwardedCenterBox,
  ForwardedLeftBox,
  ForwardedRightBox,
} from "./TestBox";

const HOVER_ENTER_PADDING = 18;
const HOVER_EXIT_PADDING = 28;

export function TrackingStage({
  canvasRef,
  onCameraError,
  onCameraReady,
  isLoading,
  isRunning,
  onStartCamera,
  tracking,
  webcamRef,
}) {
  const stageRef = useRef(null);
  const leftBoxRef = useRef(null);
  const centerBoxRef = useRef(null);
  const rightBoxRef = useRef(null);
  const [hoveredBox, setHoveredBox] = useState(null);

  const handPoint = tracking?.pointer;

  useLayoutEffect(() => {
    const frameId = requestAnimationFrame(() => {
      if (!isRunning || tracking?.mode !== "tracking" || !handPoint) {
        setHoveredBox((current) => (current === null ? current : null));
        return;
      }

      const stage = stageRef.current;
      if (!stage) {
        return;
      }

      const stageRect = stage.getBoundingClientRect();
      const pointer = {
        x: handPoint.x * stageRect.width,
        y: handPoint.y * stageRect.height,
      };

      const boxes = [
        ["left", leftBoxRef.current],
        ["center", centerBoxRef.current],
        ["right", rightBoxRef.current],
      ].filter(([, element]) => element);

      const activeBox =
        boxes.find(([name]) => name === hoveredBox)?.[1] ?? null;
      const keepActive = activeBox
        ? isInsideBox(activeBox, stageRect, pointer, HOVER_EXIT_PADDING)
        : false;

      if (keepActive) {
        return;
      }

      const nextHoveredBox =
        boxes.find(([, element]) =>
          isInsideBox(element, stageRect, pointer, HOVER_ENTER_PADDING),
        )?.[0] ?? null;

      setHoveredBox((current) =>
        current === nextHoveredBox ? current : nextHoveredBox,
      );
    });

    return () => cancelAnimationFrame(frameId);
  }, [handPoint, hoveredBox, isRunning, tracking?.mode]);

  return (
    <div
      ref={stageRef}
      className="stage"
      data-running={isRunning ? "true" : "false"}
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
        {/* <div className="map-grid"></div>
        <div className="map-road map-road--horizontal"></div>
        <div className="map-road map-road--vertical"></div>
        <div className="map-road map-road--diagonal"></div>
        <div className="map-marker map-marker--poi map-marker--top"></div>
        <div className="map-marker map-marker--poi map-marker--right"></div>
        <div className="map-marker map-marker--poi map-marker--bottom"></div>
        <div className="map-marker map-marker--target"></div>
        <div className="map-focus"></div> */}
        <div className="testBoxGroup">
          <ForwardedLeftBox
            ref={leftBoxRef}
            isHovered={hoveredBox === "left"}
          />
          <ForwardedCenterBox
            ref={centerBoxRef}
            isHovered={hoveredBox === "center"}
          />
          <ForwardedRightBox
            ref={rightBoxRef}
            isHovered={hoveredBox === "right"}
          />
        </div>
      </div>
      <div className="map-hud" aria-hidden="true">
        <span>Map view</span>
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

function isInsideBox(element, stageRect, pointer, padding) {
  const rect = element.getBoundingClientRect();

  return (
    pointer.x >= rect.left - stageRect.left - padding &&
    pointer.x <= rect.right - stageRect.left + padding &&
    pointer.y >= rect.top - stageRect.top - padding &&
    pointer.y <= rect.bottom - stageRect.top + padding
  );
}
