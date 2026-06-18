import { infoData } from "../../data";
import InfoBoxContent from "./InfoBoxContent";
import InfoBoxTopBar from "./InfoBoxTopBar";
import GetThereButton from "./GetThereButton";
import QROverlay from "./QROverlay";

export function InfoBox({
  hoveredStage,
  lockedStage,
  showQR,
  onCloseQR,
  hoveringClose,
  qrCountdown,
  hoveringButton,
}) {
  const activeKey = lockedStage ?? hoveredStage ?? "festival_site";
  const activeStage = activeKey ? infoData[activeKey] : null;

  const showButton = activeStage && activeStage.type !== "area";

  return (
    <aside className="infoBox">
      {showQR && (
        <QROverlay
          onClose={onCloseQR}
          url={activeStage?.url}
          hoveringClose={hoveringClose}
          countdown={qrCountdown}
        />
      )}
      <section className="infoBoxStage" aria-live="polite">
        <InfoBoxTopBar />

        {activeStage ? (
          <>
            <div className="infoBoxText">
              <h2 className="infoBoxTitle">{activeStage.title}</h2>
              <p>{activeStage.description}</p>
              <p>{activeStage.open}</p>
            </div>

            <InfoBoxContent data={activeStage} />
          </>
        ) : (
          <p>Hover over an area with your hand to show its details here.</p>
        )}

        {showButton && (
          <div className="infoBoxButton">
            <GetThereButton hovering={hoveringButton} />
          </div>
        )}
      </section>
    </aside>
  );
}
