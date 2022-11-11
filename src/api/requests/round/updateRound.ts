import api from "../../../api";
import { UpdateRoundType } from "../../../types";

const updateRound = ({ id, gameId, hostAction, guestAction }: UpdateRoundType) => {
  const payload = {
    path: `rounds/update`,
    method: "PUT",
    body: {
      id,
      gameId,
      hostAction,
      guestAction,
    },
  };
  return api(payload);
};

export default updateRound;
