import FestivalArea from "../assets/festivalArea.svg?react";

export default function FestivalSite({ hoveredStage }) {
  return (
    <div className="map-frame" data-hovered-stage={hoveredStage ?? ""}>
      <FestivalArea className="map-art" aria-hidden="true" focusable="false" />
      <div className="mapTitle">
        <h1>Festival Area</h1>
      </div>
    </div>
  );
}
