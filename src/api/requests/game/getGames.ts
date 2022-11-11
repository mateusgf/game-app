import api from "../../../api";

const getGames = () => {
  const payload = {
    path: `games`,
    method: "get",
  };
  return api(payload);
};

export default getGames;
