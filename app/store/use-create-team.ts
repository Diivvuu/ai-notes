import { atom, useAtom } from "jotai";

const modalState = atom(false);

export const useCreateTeamModal = () => {
  return useAtom(modalState);
};
