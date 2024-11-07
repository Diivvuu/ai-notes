import { useUpdateWhiteboard } from "@/features/files/api/use-update-whiteboard";
import { useFileId } from "@/hooks/use-file";
import { Excalidraw, MainMenu, WelcomeScreen } from "@excalidraw/excalidraw";
import { useRef } from "react";

const ExcalidrawWrapper: React.FC = () => {
  const fileId = useFileId();
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);
  const debounceDelay = 300;

  const { mutate, isSuccess, isPending } = useUpdateWhiteboard();
  const get = (elements: any) => {
    console.log(JSON.stringify(elements));
  };

  const handleChange = (elements: any) => {
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }
    debounceTimeout.current = setTimeout(() => {
      const jsonString = JSON.stringify(elements);
      // Ensure this mutate only fires after the debounce delay
      // mutate({ id: fileId, whiteboard: jsonString });
    }, debounceDelay);
  };

  return (
    <div style={{ height: "100%", width: "100%" }}>
      <Excalidraw onChange={get}>
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
