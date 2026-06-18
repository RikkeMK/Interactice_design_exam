import Map from "../assets/mapOverview.svg?react";

export default function MapOverview({ hoveredStage }) {
  return (
    <div className="map-frame" data-hovered-stage={hoveredStage ?? ""}>
      <Map className="map-art" aria-hidden="true" focusable="false" />
      <div className="mapTitle">
        <h1>Festival Map</h1>
      </div>
    </div>
  );
}
