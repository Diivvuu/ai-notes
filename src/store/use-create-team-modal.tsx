import { atom, useAtom } from "jotai";

const createTeamModalAtom = atom(false);

export const useCreateTeamModal = () => {
  return useAtom(createTeamModalAtom);
};
