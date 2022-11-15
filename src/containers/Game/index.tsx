import { useEffect } from "react";
import { useHistory, RouteComponentProps } from "react-router-dom";
import { useGame } from "../../context/Game";
import { usePlayer } from "../../context/Player";
import { routeCodes } from "../../constants/routes";
import PlayerScreen from "../../components/Organism/PlayerScreen";

type TParams = { id?: string };

const Game = ({ match }: RouteComponentProps<TParams>) => {
  const history = useHistory();
  const { currentPlayer } = usePlayer();
  const {
    currentGame,
    getGameById,
    fetchRoundsByGameId,
    gameRounds,
    createRound,
    updateRound,
    shouldClearRoundsFetch,
    getBestOfRounds,
    playAction
  } = useGame();

  useEffect(() => {
    const load = async () => {
      const id = match.params.id;
      if (!currentPlayer.nickname) {
        history.push(routeCodes.HOME);
      } else if (currentPlayer.nickname && id) {
        await getGameById(id);
        await fetchRoundsByGameId(id);
      }
    };
    load();

    // @TODO: put in place websock to avoid multiple requests to api to retrieve the last rounds for this game
    const intervalRef = setInterval(() => {
      fetchRoundsByGameId(match.params.id);
      if (shouldClearRoundsFetch()) {
        clearInterval(intervalRef);
        getBestOfRounds();
      }
    }, 2000);

    return () => {
      clearInterval(intervalRef);
    };
  }, []);

  const isHostPlayer = () => {
    return currentGame.hostNickname === currentPlayer.nickname;
  };


  const isAvailableToPlayAction = (isHostPlayer: boolean) => {
    // if missing action from oponent
    const lastRound = gameRounds[0];

    if (gameRounds.length === 0 && isHostPlayer) {
      return true;
    }

    if (lastRound && isHostPlayer && !lastRound.hostAction) {
      // Last round played by guest. Enable host to play
      return true;
    } else if (lastRound && !isHostPlayer && !lastRound.guestAction) {
      // Last round played by host. Enable guest to play
      return true;
    } else if (
      lastRound &&
      lastRound.guestAction &&
      lastRound.hostAction &&
      isHostPlayer
    ) {
      // TODO: Those two last if will enable only HOST to start the game. Once websocket is in place either HOST or GUEST can trigger the first action.
      // This is to avoid them calling the first action simultaneously
      return true; // enable only host to go first
    } else if (gameRounds && gameRounds.length === 0 && isHostPlayer) {
      return true; // enable only host to go first
    }
    // No rounds found. Either Host or Guest can play first
    return false;
  };

  const getResultMessageForLastRound = () => {
    const lastRound = gameRounds?.[0];
    if (lastRound && lastRound.winnerNickname && lastRound.winnerAction !== "draw") {
      return `Winner of last turn was: ${lastRound.winnerNickname}`;
    } else if (lastRound && lastRound.winnerAction === "draw") {
      return `Last turn was a draw`;
    }
  };

  const canHaveMoreRounds = () => {
    const lastRound = gameRounds?.[0];
    if ((gameRounds && gameRounds.length) < currentGame.numberOfRounds) {
      return true;
    } else if (
      (gameRounds && gameRounds.length) === currentGame.numberOfRounds &&
      stillMissingActionToEndRound()
    ) {
      return true;
    }

    return false;
  };

  const stillMissingActionToEndRound = () => {
    const lastRound = gameRounds?.[0];
    return lastRound && (!lastRound.guestAction || !lastRound.hostAction);
  };


  return (
    <>
      <PlayerScreen
        currentGame={currentGame}
        currentPlayer={currentPlayer}
        isHostPlayer={isHostPlayer()}
        gameRounds={gameRounds}
        roundsWinner={getBestOfRounds()}
        canHaveMoreRounds={canHaveMoreRounds()}
        resultMessageForLastRound={getResultMessageForLastRound()}
        isAvailableToPlayAction={isAvailableToPlayAction}
        playAction={playAction}
      />
    </>
  );
};

export default Game;
