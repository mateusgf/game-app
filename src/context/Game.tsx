import React, { createContext, useState, useContext } from "react";

import getGames from "../api/requests/game/getGames";
import createGameAPI from "../api/requests/game/createGame";
import joinGameAPI from "../api/requests/game/joinGame";
import getGameByIdAPI from "../api/requests/game/getGameById";
import getRoundsByGameIdAPI from "../api/requests/round/getRoundsByGameId";
import createRoundAPI from "../api/requests/round/createRound";
import updateRoundAPI from "../api/requests/round/updateRound";
import { usePlayer } from "./Player";
import { GameType, GameRound, CreateRoundType, UpdateRoundType } from "../types";

interface IContextProps {
  isLoading: boolean;
  fetchGames: Function;
  createGame: Function;
  joinGame: Function;
  games: GameType[];
  currentGame: GameType;
  getGameById: Function;
  fetchRoundsByGameId: Function;
  gameRounds: GameRound[];
  createRound: Function;
  updateRound: Function;
  shouldClearRoundsFetch: Function;
  getBestOfRounds: Function;
  playAction: Function;
}

const GameContext = createContext({} as IContextProps);

export default function GameProvider({ children }: any) {
  const { setCurrentPlayer } = usePlayer();
  const [games, setGames] = useState([]);
  const [gameRounds, setGameRounds] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentGame, setCurrentGame] = useState<GameType>({
    id: 0,
    hostNickname: "",
    guestNickname: "",
    numberOfRounds: 0,
  });

  const fetchGames = async () => {
    const res = await getGames();
    setGames(res);
  };

  const getGameById = async (id: number) => {
    setIsLoading(true);
    try {
      const game = await getGameByIdAPI(id);
      setCurrentGame(game);
      return game;
    } catch (error: any) {
      //@TODO: threat error to display friendly message to user
      alert(error);
    }
    setIsLoading(false);
  };

  const createGame = async (hostNickname: string, numberOfRounds: number) => {
    setIsLoading(true);
    try {
      const game = await createGameAPI(hostNickname, numberOfRounds);
      setCurrentGame(game);
      return game;
    } catch (error: any) {
      //@TODO: threat error to display friendly message to user
      alert(error);
    }
    setIsLoading(false);
  };

  const joinGame = async (gameId: number, nickname: string) => {
    setIsLoading(true);
    try {
      const game = await joinGameAPI(gameId, nickname);
      setCurrentGame(game);
      setCurrentPlayer({ nickname });
      return game;
    } catch (error: any) {
      //@TODO: threat error to display friendly message to user
      alert(error);
    }
    setIsLoading(false);
  };

  const fetchRoundsByGameId = async (gameId: number) => {
    setIsLoading(true);
    try {
      const rounds = await getRoundsByGameIdAPI(gameId);
      setGameRounds(rounds);
      return rounds;
    } catch (error: any) {
      //@TODO: threat error to display friendly message to user
      alert(error);
    }
    setIsLoading(false);
  };

  const createRound = async ({ gameId, hostAction, guestAction }: CreateRoundType) => {
    setIsLoading(true);
    try {
      const rounds = await createRoundAPI({ gameId, hostAction, guestAction });
      setGameRounds(rounds);
      return rounds;
    } catch (error: any) {
      //@TODO: threat error to display friendly message to user
      alert(error);
    }
    setIsLoading(false);
  };

  const updateRound = async ({
    id,
    gameId,
    hostAction,
    guestAction,
  }: UpdateRoundType) => {
    setIsLoading(true);
    try {
      const rounds = await updateRoundAPI({
        id,
        gameId,
        hostAction,
        guestAction,
      });
      setGameRounds(rounds);
      return rounds;
    } catch (error: any) {
      //@TODO: threat error to display friendly message to user
      alert(error);
    }
    setIsLoading(false);
  };

  const shouldClearRoundsFetch = () => {
    return gameRounds && currentGame && gameRounds.length === currentGame.numberOfRounds;
  }

  const getBestOfRounds = () => {
    if (currentGame && gameRounds) {
      const winsByNickname = {
        [currentGame.hostNickname]: 0,
        [currentGame.guestNickname]: 0,
      };

      gameRounds
        .filter((round: GameRound) => round.winnerAction !== "draw")
        .forEach((round: GameRound) => {
          const winner = round.winnerNickname;
          winsByNickname[winner as string] += 1;
        });

      return winsByNickname;
    }
  };

  const playAction = async (action: string, isHostPlayer: boolean) => {
    const lastRound: GameRound = gameRounds[0];
    if (gameRounds.length === 0 || (lastRound.hostAction && lastRound.guestAction)) {
      // First action
      if (isHostPlayer) {
        await createRound({ gameId: currentGame.id, hostAction: action });
      } else {
        await createRound({ gameId: currentGame.id, guestAction: action });
      }
    } else {
      // check if last round created is missing an action either from HOST or GUEST
      if (lastRound && !lastRound.hostAction) {
        // Missing host action
        await updateRound({
          id: lastRound.id,
          gameId: currentGame.id,
          hostAction: action,
        });
      } else if (lastRound && !lastRound.guestAction) {
        await updateRound({
          id: lastRound.id,
          gameId: currentGame.id,
          guestAction: action,
        });
      }
    }
    await getGameById(currentGame.id);
  };

  return (
    <GameContext.Provider
      value={{
        isLoading,
        fetchGames,
        createGame,
        joinGame,
        games,
        currentGame,
        getGameById,
        gameRounds,
        fetchRoundsByGameId,
        createRound,
        updateRound,
        shouldClearRoundsFetch,
        getBestOfRounds,
        playAction,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const context = useContext(GameContext);
  const {
    isLoading,
    fetchGames,
    createGame,
    joinGame,
    games,
    currentGame,
    getGameById,
    gameRounds,
    fetchRoundsByGameId,
    createRound,
    updateRound,
    shouldClearRoundsFetch,
    getBestOfRounds,
    playAction,
  } = context;

  return {
    isLoading,
    fetchGames,
    createGame,
    joinGame,
    games,
    currentGame,
    getGameById,
    gameRounds,
    fetchRoundsByGameId,
    createRound,
    updateRound,
    shouldClearRoundsFetch,
    getBestOfRounds,
    playAction,
  };
}
