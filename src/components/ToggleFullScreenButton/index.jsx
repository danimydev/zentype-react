import FAButton from "../FAButton";
import { useState } from "react";

function ToggleFullScreenButton() {
  const [isFullScreen, setFullScreen] = useState(false);

  function toggleFullScreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setFullScreen(true);
    } else if (document.exitFullscreen) {
      document.exitFullscreen();
      setFullScreen(false);
    }
  }

  if (isFullScreen) {
    return <FAButton
      action={toggleFullScreen}
      fontawesomeClasses={'fa-solid fa-minimize fa-xl'}>
    </FAButton>
  } else {
    return <FAButton
      action={toggleFullScreen}
      fontawesomeClasses={'fa-solid fa-maximize fa-xl'}>
    </FAButton>
  }
}

export default ToggleFullScreenButton;