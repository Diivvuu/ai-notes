import { atom, useAtom } from "jotai";

const createContentModalAtom = atom({
  isOpen: false,
  onClose: () => {},
});

export const useCreateContentModal = () => useAtom(createContentModalAtom);
