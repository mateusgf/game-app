import api from "../../../api";

const createGame = (gameId: number, nickname: string) => {
  const payload = {
    path: `games/join-game`,
    method: "post",
    body: {
      gameId,
      nickname,
    },
  };
  return api(payload);
};

export default createGame;
