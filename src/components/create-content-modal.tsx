import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
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

function CreateContentModal() {
  // const fileId = useFileId();
  const [open, setOpen] = useCreateContentModal();
  // const { data: file, isLoading: fileLoading } = useGetFile({ id: fileId });

  const [topic, setTopic] = useState<string>("");
  const [style, setStyle] = useState<string>("brief");
  const [generatedContent, setGeneratedContent] = useState<string>("");

  const handleClose = () => {
    setOpen(false);
  };

  const FINAL_PROMPT = AI_PROMPT.replace("{topic}", topic).replace(
    "{style}",
    style
  );
  const onGenerateTrip = async () => {
    const result = await chatSession.sendMessage(FINAL_PROMPT);
    console.log("result", result?.response?.text());
    console.log(process.env.NEXT_PUBLIC_GOOGLE_GEMINI_API_KEY);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
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

            {/* Display the generated content */}
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={handleClose}>
              Cancel
            </Button>
            <Button onClick={onGenerateTrip}>Deploy</Button>
          </CardFooter>
        </Card>
      </DialogContent>
    </Dialog>
  );
}

export default CreateContentModal;
