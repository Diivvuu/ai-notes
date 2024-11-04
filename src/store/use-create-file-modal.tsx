import { atom, useAtom } from "jotai";

const createFileModalAtom = atom(false);

export const useCreateFileModal = () => {
  return useAtom(createFileModalAtom);
};
