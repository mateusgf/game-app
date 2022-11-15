import "./PlayerScreen.scss";
import { GameType, PlayerType, GameRound } from "../../../types";
import PlayerActions from "../../Molecule/PlayerActions";

interface IPlayerScreenProps {
  currentGame: GameType;
  currentPlayer: PlayerType;
  isHostPlayer: boolean;
  gameRounds: GameRound[];
  roundsWinner?: { [key: string]: number };
  canHaveMoreRounds: boolean;
  resultMessageForLastRound?: string;
  isAvailableToPlayAction: Function;
  playAction: Function;
}

const PlayerScreen = ({
  currentGame,
  currentPlayer,
  isHostPlayer,
  gameRounds,
  roundsWinner,
  canHaveMoreRounds,
  resultMessageForLastRound,
  isAvailableToPlayAction,
  playAction,
}: IPlayerScreenProps) => {
  return (
    <div className="player-screen" data-testid="player-screen">
      <h1 className="player-screen--game-id" data-testid="game-id-header">
        Game ID: {currentGame.id} | Rounds: {currentGame.numberOfRounds}
      </h1>
      {canHaveMoreRounds && resultMessageForLastRound ? (
        <span className="player-screen--round-winner-message" data-testid="winner-last-round-message">
          {resultMessageForLastRound}
        </span>
      ) : null}

      {canHaveMoreRounds ? (
        <PlayerActions
          playAction={playAction}
          isHostPlayer={isHostPlayer}
          isAvailableToPlayAction={isAvailableToPlayAction(isHostPlayer)}
        />
      ) : (
        <h3 data-testid="all-rounds-ended-label">All rounds ended</h3>
      )}

      {!canHaveMoreRounds ? (
        <div>
          <span>Number of wins:</span>
          <br />- {currentGame.hostNickname}: {roundsWinner?.[currentGame.hostNickname]}
          <br />- {currentGame.guestNickname}: {roundsWinner?.[currentGame.guestNickname]}
        </div>
      ) : null}

      <hr className="player-screen--divider" />

      <h3>Rounds:</h3>
      <table border={1} width="100%">
        <thead>
          <tr>
            <th>Round</th>
            <th>{currentGame.hostNickname}</th>
            <th>{currentGame.guestNickname}</th>
            <th>Winner</th>
          </tr>
        </thead>
        <tbody>
          {gameRounds
            .filter((r) => r.winnerNickname)
            .sort((r) => -1)
            .map((round, i) => {
              return (
                <tr key={round.id}>
                  <td>{i + 1}</td>
                  <td>{round.hostAction}</td>
                  <td>{round.guestAction}</td>
                  <td>{round.winnerNickname}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default PlayerScreen;
