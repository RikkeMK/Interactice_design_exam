import { infoData } from "../../data";
import InfoBoxContent from "./InfoBoxContent";
import InfoBoxTopBar from "./InfoBoxTopBar";

export function InfoBox({ hoveredStage, lockedStage }) {
  const activeKey = lockedStage ?? hoveredStage ?? "festival_site";
  const activeStage = activeKey ? infoData[activeKey] : null;

  return (
    <aside className="infoBox">
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
      </section>
    </aside>
  );
}
