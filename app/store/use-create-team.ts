import { atom, useAtom } from "jotai";

const createTeamAtom = atom(false);

export const useCreateTeamModal = () => {
  return useAtom(createTeamAtom);
};
