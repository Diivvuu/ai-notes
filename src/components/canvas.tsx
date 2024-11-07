"use client";
import {
  Excalidraw,
  convertToExcalidrawElements,
  MainMenu,
  WelcomeScreen,
} from "@excalidraw/excalidraw";

const ExcalidrawWrapper: React.FC = () => {
  //   console.info(convertToExcalidrawElements([]));
  return (
    <div style={{ height: "100%", width: "100%" }}>
      <Excalidraw>
        {" "}
        <MainMenu>
          <MainMenu.DefaultItems.ClearCanvas />
          <MainMenu.DefaultItems.SaveAsImage />
          <MainMenu.DefaultItems.ChangeCanvasBackground />
        </MainMenu>
        <WelcomeScreen>
          <WelcomeScreen.Hints.MenuHint />
          <WelcomeScreen.Hints.MenuHint />
          <WelcomeScreen.Hints.ToolbarHint />
          <WelcomeScreen.Center>
            <WelcomeScreen.Center.MenuItemHelp />
          </WelcomeScreen.Center>
        </WelcomeScreen>
      </Excalidraw>
    </div>
  );
};
export default ExcalidrawWrapper;
