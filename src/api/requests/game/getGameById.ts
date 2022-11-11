import api from "../../../api";

const getGameById = (id: number) => {
  const payload = {
    path: `games/${id}`,
    method: "get",
  };
  return api(payload);
};

export default getGameById;
