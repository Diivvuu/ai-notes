import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useCreateTeamModal } from "../store/use-create-team";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const CreateTeamModal = () => {
  const [open, setOpen] = useCreateTeamModal();

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add a new Team</DialogTitle>
        </DialogHeader>
        <form>
          <Input value={"asda"} />
          <div></div>
        </form>
        <div>
          <Button>Create</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreateTeamModal;
