import { useEffect } from "react";
import { useGame } from "../../context/Game";

const GamesList = () => {
  const { fetchGames, games } = useGame();

  useEffect(() => {
    fetchGames();
  }, []);

  return (
    <div>
      <h3 data-testid="heading-games-list">Games:</h3>
      <table border={1} width="100%">
        <thead>
          <tr>
            <th>ID</th>
            <th>Number of Rounds</th>
            <th>Host</th>
            <th>Guest</th>
          </tr>
        </thead>
        <tbody>
          {games
            .map((game) => {
              return (
                <tr key={game.id}>
                  <td>{game.id}</td>
                  <td>{game.numberOfRounds}</td>
                  <td>{game.hostNickname}</td>
                  <td>{game.guestNickname}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default GamesList;
