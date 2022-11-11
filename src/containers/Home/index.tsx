import { useState } from "react";
import "./Home.scss";
import Button from "../../components/Atom/Button";
import NewGameForm from "../../components/Molecule/NewGameForm";
import JoinGameForm from "../../components/Molecule/JoinGameForm";
import { routeCodes } from "../../constants/routes";
import { useHistory } from "react-router-dom";
import { useGame } from "../../context/Game";
import { usePlayer } from "../../context/Player";
import getPlayerByNickname from "../../api/requests/player/getPlayerByNickname";

const Home = () => {
  const history = useHistory();
  const { createPlayer } = usePlayer();
  const { createGame, joinGame } = useGame();
  const [isNewGameFormVisible, setIsNewGameFormVisible] = useState(false);
  const [isJoinGameFormVisible, setIsJoinGameFormVisible] = useState(false);

  const goToGamesList = () => {
    history.push(routeCodes.GAMES_LIST);
  };

  const newGameHandler = async (values: { nickname: string; numberOfRounds: string }) => {
    console.log(values);

    const player = await createPlayer(values.nickname);
    // console.log('player created', currentPlayer);
    if (player && player.nickname) {
      // console.log('player created inside if', player);
      // create game
      const game = await createGame(player.nickname, values.numberOfRounds);
      // console.log('game created', game);

      if (game.id) {
        history.push({
          pathname: routeCodes.GAME.replace(":id", game.id),
        });
      }
    }
  };

  const joinGameHandler = async (values: { nickname: string; gameId: string }) => {
    console.log(values);

    const submitedPlayer = await getPlayerByNickname(values.nickname);

    // @TODO: check if game exists before creating the player

    if (!submitedPlayer || !submitedPlayer.nickname) {
      // Player does not exist yet, so create one
      const player = await createPlayer(values.nickname);
    }

    if (await joinGame(values.gameId, values.nickname)) {
      history.push({
        pathname: routeCodes.GAME.replace(":id", values.gameId),
      });
    } else {
      // @TODO: threat error better here
      alert("Could not join the game");
    }
  };

  return (
    <div className="home">
      <h1>Rock, Paper & Scissors</h1>
      {isNewGameFormVisible ? (
        <>
          <h3>New game</h3>
          <NewGameForm onSubmit={newGameHandler} />
        </>
      ) : null}
      {isJoinGameFormVisible ? (
        <>
          <h3>Join game</h3>
          <JoinGameForm onSubmit={joinGameHandler} />
        </>
      ) : null}

      <div className="home--btns-wrp">
        <Button
          className="game-button--full-width"
          data-testid="btn-start-game"
          onClick={() => {
            setIsNewGameFormVisible(!isNewGameFormVisible)
            setIsJoinGameFormVisible(false);
          }}
        >
          Start Game
        </Button>

        <div className="home--or-label">or</div>

        <Button
          className="game-button--full-width"
          data-testid="btn-join-game"
          onClick={() => {
            setIsJoinGameFormVisible(!isJoinGameFormVisible)
            setIsNewGameFormVisible(false)
          }}
        >
          Join a game
        </Button>

        <div className="home--or-label">or</div>

        <Button className="game-button--full-width" onClick={goToGamesList}>See started games</Button>
      </div>

    </div>
  );
};

export default Home;