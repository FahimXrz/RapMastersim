import React, { useState, useEffect } from "react";
import { SplashScreen } from "./components/SplashScreen";
import { CharacterCreation } from "./components/CharacterCreation";
import { GameScreen } from "./components/GameScreen";
import { Credits } from "./components/Credits";
import { LockedFeatureDialog } from "./components/LockedFeatureDialog";

export interface Character {
  name: string;
  gender: "male" | "female";
  age: number;
  hairstyle: number;
  skin: number;
}

export interface Skills {
  rap: number;
  flow: number;
  charisma: number;
}

export interface Track {
  id: string;
  title: string;
  week: number;
  streams: number;
  views: number;
  likes: number;
}

export interface GameState {
  character: Character | null;
  skills: Skills;
  energy: number;
  money: number;
  fame: number;
  fans: number;
  week: number;
  tracks: Track[];
  totalStreams: number;
  totalViews: number;
}

type Screen = "splash" | "character" | "game" | "credits";

export default function App() {
  const [currentScreen, setCurrentScreen] =
    useState<Screen>("splash");
  const [showLockedDialog, setShowLockedDialog] =
    useState(false);
  const [gameState, setGameState] = useState<GameState>({
    character: null,
    skills: { rap: 1, flow: 1, charisma: 1 },
    energy: 100,
    money: 0,
    fame: 0,
    fans: 0,
    week: 1,
    tracks: [],
    totalStreams: 0,
    totalViews: 0,
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentScreen("character");
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleShowCredits = () => {
      setCurrentScreen("credits");
    };

    window.addEventListener("showCredits", handleShowCredits);
    return () => {
      window.removeEventListener(
        "showCredits",
        handleShowCredits,
      );
    };
  }, []);

  // Hide Figma native bar and ensure fullscreen display
  useEffect(() => {
    // Add styles to hide Figma UI elements
    const style = document.createElement("style");
    style.textContent = `
      /* Hide Figma native bar and UI elements */
      [data-figma-native-bar],
      .figma-native-bar,
      .figma-ui-bar,
      .figma-toolbar,
      iframe[src*="figma"] + div,
      div[class*="figma"],
      div[id*="figma"] {
        display: none !important;
        visibility: hidden !important;
        opacity: 0 !important;
        height: 0 !important;
        overflow: hidden !important;
      }
      
      /* Ensure app takes full viewport */
      html, body {
        margin: 0 !important;
        padding: 0 !important;
        height: 100vh !important;
        overflow: hidden !important;
      }
      
      /* Make sure our app container is fullscreen */
      #root {
        height: 100vh !important;
        width: 100vw !important;
        position: fixed !important;
        top: 0 !important;
        left: 0 !important;
        z-index: 9999 !important;
      }
    `;
    document.head.appendChild(style);

    return () => {
      if (document.head.contains(style)) {
        document.head.removeChild(style);
      }
    };
  }, []);

  const handleCharacterCreated = (character: Character) => {
    setGameState((prev) => ({ ...prev, character }));
    setCurrentScreen("game");
  };

  const handleBackToGame = () => {
    setCurrentScreen("game");
  };

  const handleLockedFeature = () => {
    setShowLockedDialog(true);
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case "splash":
        return <SplashScreen />;
      case "character":
        return (
          <CharacterCreation
            onCharacterCreated={handleCharacterCreated}
          />
        );
      case "game":
        return (
          <GameScreen
            gameState={gameState}
            setGameState={setGameState}
            onLockedFeature={handleLockedFeature}
          />
        );
      case "credits":
        return <Credits onBack={handleBackToGame} />;
      default:
        return <SplashScreen />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white overflow-hidden fixed inset-0 z-50">
      {renderScreen()}
      <LockedFeatureDialog
        isOpen={showLockedDialog}
        onClose={() => setShowLockedDialog(false)}
      />
    </div>
  );
}