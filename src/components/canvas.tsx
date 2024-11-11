import { useUpdateWhiteboard } from "@/features/files/api/use-update-whiteboard";
import { useFileId } from "@/hooks/use-file";
import { Excalidraw, MainMenu, WelcomeScreen } from "@excalidraw/excalidraw";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { toast } from "sonner";

interface ExcalidrawProps {
  triggerSave: boolean;
  data: string;
}

const ExcalidrawWrapper = ({ triggerSave, data }: ExcalidrawProps) => {
  const fileId = useFileId();
  const [whiteboardData, setWhiteboardData] = useState("");
  const { mutate, isSuccess, isPending } = useUpdateWhiteboard();

  const handleChange = (elements: any) => {
    const jsonString = JSON.stringify(elements);
    setWhiteboardData(jsonString);
    // Ensure this mutate only fires after the debounce delay
    // mutate({ id: fileId, whiteboard: jsonString });
  };
  useEffect(() => {
    triggerSave && saveWhiteboardData();
  }, [triggerSave]);
  const saveWhiteboardData = () => {
    mutate(
      { id: fileId, whiteboard: whiteboardData },
      {
        onSuccess(Id) {
          toast.success("Your canvas is updated!");
        },
        onError(error) {
          toast.error("Failed to update whiteboard");
        },
      }
    );
  };
  console.log(data);
  return (
    <div style={{ height: "100%", width: "100%" }}>
      <Excalidraw
        // theme="dark"
        initialData={{ elements: data && JSON.parse(data) }}
        onChange={handleChange}
        UIOptions={{
          canvasActions: {
            saveToActiveFile: false,
            loadScene: false,
            export: false,
            toggleTheme: false,
          },
        }}
      >
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
