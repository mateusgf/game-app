import api from "../../../api";

const createPlayer = (nickname: string) => {
  const payload = {
    path: `players/new`,
    method: "post",
    body: {
      nickname,
    },
  };
  return api(payload);
};

export default createPlayer;
