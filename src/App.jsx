import { TrackingStage } from "./components/TrackingStage";
import { useHandTracking } from "./hooks/useHandTracking";
import "./App.css";
import BottomBar from "./components/BottomBar";
import { useState } from "react";

function App() {
  const [hoveredStage, setHoveredStage] = useState(null);
  const [currentView, setCurrentView] = useState("map");

  const {
    canvasRef,
    handleCameraError,
    handleCameraReady,
    isLoading,
    isRunning,
    startCamera,
    stopCamera,
    tracking,
    webcamRef,
  } = useHandTracking();

  return (
    <main className="app-shell">
      <TrackingStage
        canvasRef={canvasRef}
        onCameraError={handleCameraError}
        onCameraReady={handleCameraReady}
        isLoading={isLoading}
        isRunning={isRunning}
        onStartCamera={startCamera}
        onStopCamera={stopCamera}
        tracking={tracking}
        webcamRef={webcamRef}
        hoveredStage={hoveredStage}
        onHoverStageChange={setHoveredStage}
        currentView={currentView}
        onNavigate={setCurrentView}
      />
      <BottomBar className="bottomSection" currentView={currentView} />
    </main>
  );
}

export default App;
