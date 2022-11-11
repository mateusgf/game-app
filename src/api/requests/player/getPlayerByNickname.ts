import api from "../../../api";

const getPlayerByNickname = (nickname: string) => {
  const payload = {
    path: `players/${nickname}`,
    method: "get",
  };
  return api(payload);
};

export default getPlayerByNickname;
