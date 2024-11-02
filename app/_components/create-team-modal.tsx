import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useCreateTeamModal } from "../store/use-create-team";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useCreateTeam } from "../hooks/use-create-team";
import { User } from "../types";
import { toast } from "sonner";

interface CreateTeamModalProps {
  user: User;
}

const CreateTeamModal = ({ user }: CreateTeamModalProps) => {
  const [open, setOpen] = useCreateTeamModal();

  const [teamName, setTeamName] = useState("");

  const { mutate, isPending } = useCreateTeam();
  const handleClose = () => {
    setOpen(false);
    setTeamName("");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("first");
    mutate(
      {
        teamName: teamName,
        ownerId: user._id,
        currentMemberCount: 1,
        currentFileCount: 0,
        maxMembers: 5,
        maxFiles: 5,
      },
      {
        onSuccess(Id) {
          toast.success("New Team created");
          handleClose();
        },
      }
    );
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a new Team</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <Input
            value={teamName}
            onChange={(e) => {
              setTeamName(e.target.value);
            }}
            disabled={false}
            required
            autoFocus
            minLength={3}
            maxLength={80}
            placeholder="Team Name e.g. 'Graphic Designers', 'Frontend Developers'"
          />
          <div></div>
          <div className="flex justify-end">
            <Button>Create</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateTeamModal;
