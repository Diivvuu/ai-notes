import { atom, useAtom } from "jotai";

const joinTeamModalAtom = atom(false);

export const useJoinTeamModal = () => {
  return useAtom(joinTeamModalAtom);
};
    