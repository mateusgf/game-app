import api from "../../../api";
import { CreateRoundType } from "../../../types";

const createRound = ({ gameId, hostAction, guestAction }: CreateRoundType) => {
  const payload = {
    path: `rounds/new`,
    method: "post",
    body: {
      gameId,
      hostAction,
      guestAction,
    },
  };
  return api(payload);
};

export default createRound;
