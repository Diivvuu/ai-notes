import { SetStateAction } from "jotai";
import { File, Tag } from "lucide-react";

interface TeamHeaderProps {
  name: string | undefined;
  setOpen: (update: SetStateAction<boolean>) => void;
}

function TeamHeader({ name, setOpen }: TeamHeaderProps) {
  return (
    <div className="flex justify-between items-center  mt-20">
      <h1 className="text-left font-semibold text-lg hover:underline">
        Welcome to #{name}
      </h1>
      <div>
        <div className="flex items-center justify-center gap-x-2 cursor-pointer">
          <File className="size-5 " onClick={() => setOpen(true)} />
          <Tag className="size-5" />
        </div>
      </div>
    </div>
  );
}

export default TeamHeader;
