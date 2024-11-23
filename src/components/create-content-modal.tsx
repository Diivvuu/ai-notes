import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "./ui/button";
import { useCreateContentModal } from "@/store/use-create-content-modal";
import { AI_PROMPT } from "@/constants/options";
import { chatSession } from "@/service/ai-model";
import dynamic from "next/dynamic";
import { useUpdateDocument } from "@/features/files/api/use-update-doc";
import { useFileId } from "@/hooks/use-file";
import { toast } from "sonner";
import { useGetFile } from "@/features/files/api/use-get-file";

const Editor = dynamic(() => import("@/components/editor"), {
  ssr: false,
});

function CreateContentModal() {
  const fileId = useFileId();
  const [modalState, setModalState] = useCreateContentModal();
  const { isOpen, onClose } = modalState;
  const [response, setResponse] = useState("");
  // const { data: file, isLoading: fileLoading } = useGetFile({ id: fileId });
  const { mutate, isPending, isSuccess } = useUpdateDocument();
  const [isSaveTriggered, setIsSaveTriggered] = useState(false);
  const [topic, setTopic] = useState<string>("");
  const [style, setStyle] = useState<string>("brief");
  const [generatedContent, setGeneratedContent] = useState<string>("");

  const handleClose = () => {
    if (onClose) onClose();
    setModalState({ ...modalState, isOpen: false });
  };

  const FINAL_PROMPT = AI_PROMPT.replace("{topic}", topic).replace(
    "{style}",
    style
  );
  const onGenerateTrip = async () => {
    const result = await chatSession.sendMessage(FINAL_PROMPT);
    console.log("result", result?.response?.text());
    setResponse(result?.response?.text());
    console.log(process.env.NEXT_PUBLIC_GOOGLE_GEMINI_API_KEY);
  };

  const handleSaveDocument = async (content: any) => {
    if (content) console.log("content is", content);
    mutate(
      { id: fileId, document: JSON.stringify(content) },
      {
        onSuccess(Id) {
          console.log("onSuccess triggered");
          setIsSaveTriggered(false);
          handleClose();
        },
        onError(error) {
          toast.error("Failed to update content.");
        },
      }
    );
  };
  const handleAddContent = () => {
    setIsSaveTriggered(true);
  };
  return response === "" ? (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="w-full">
        <DialogHeader>
          <DialogTitle>Create content from AI</DialogTitle>
        </DialogHeader>
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Create content for file</CardTitle>
            <CardDescription>Get notes in one click</CardDescription>
          </CardHeader>
          <CardContent>
            <form>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="name">What's the topic & main focus</Label>
                  <Input
                    id="name"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    placeholder="e.g. travel plan, art history, business"
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="framework">
                    What style and depth do you want?
                  </Label>
                  <Select
                    value={style}
                    onValueChange={(value) => setStyle(value)}
                  >
                    <SelectTrigger id="framework">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent position="popper">
                      <SelectItem value="brief">Brief Overview</SelectItem>
                      <SelectItem value="detailed">
                        Detailed Breakdown
                      </SelectItem>
                      <SelectItem value="professional">Professional</SelectItem>
                      <SelectItem value="casual">Casual Tone</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              {generatedContent && (
                <div className="mt-4">
                  <h3>Generated Content:</h3>
                  <pre className="bg-gray-100 p-4 rounded">
                    {generatedContent}
                  </pre>
                </div>
              )}
            </form>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={handleClose}>
              Cancel
            </Button>
            <Button onClick={onGenerateTrip}>Create content</Button>
          </CardFooter>
        </Card>
      </DialogContent>
    </Dialog>
  ) : (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="w-full h-full">
        <DialogHeader>
          <DialogTitle>What content do you want to add?</DialogTitle>
        </DialogHeader>
        <div className="w-full max-h-screen">
          <Editor
            key={0}
            data={response}
            holder="editor-holder1"
            isSaveTriggered={isSaveTriggered}
            onSaveTrigger={handleSaveDocument}
          />
          <div className="flex justify-end">
            <Button onClick={handleAddContent}>Add content</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default CreateContentModal;
