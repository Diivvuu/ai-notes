import { atom, useAtom } from "jotai";

const createContentModalAtom = atom(false);

export const useCreateContentModal = () => {
  return useAtom(createContentModalAtom);
};
