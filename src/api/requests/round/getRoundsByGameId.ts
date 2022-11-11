import api from "../../../api";

const getRoundsByGameId = (gameId: number) => {
  const payload = {
    path: `rounds/${gameId}`,
    method: "get",
  };
  return api(payload);
};

export default getRoundsByGameId;
