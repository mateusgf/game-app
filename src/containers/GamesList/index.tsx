import { useEffect } from "react";
import { useGame } from "../../context/Game";

const GamesList = () => {
  const { fetchGames, games } = useGame();

  useEffect(() => {
    fetchGames();
  }, []);

  return <h1>GamesList: {JSON.stringify(games)}</h1>;
};

export default GamesList;
