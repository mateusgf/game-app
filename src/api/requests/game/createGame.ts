import api from "../../../api";

const createGame = (hostNickname: string, numberOfRounds: number) => {
  const payload = {
    path: `games/new`,
    method: "post",
    body: {
      hostNickname,
      numberOfRounds,
    },
  };
  return api(payload);
};

export default createGame;
