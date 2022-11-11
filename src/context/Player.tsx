import React, { createContext, useState, useContext } from "react";
import createPlayerAPI from "../api/requests/player/createPlayer";
import { PlayerType } from "../types";

interface IContextProps {
  isLoading: boolean;
  createPlayer: Function;
  currentPlayer: PlayerType;
  setCurrentPlayer: Function;
}

const PlayerContext = createContext({} as IContextProps);

export default function PlayerProvider({ children }: any) {
  const [isLoading, setIsLoading] = useState(false);
  const [currentPlayer, setCurrentPlayer] = useState<PlayerType>({
    nickname: "",
  });

  const createPlayer = async (nickname: string) => {
    setIsLoading(true);
    try {
      const player = await createPlayerAPI(nickname);
      setCurrentPlayer(player);
      return player;
    } catch (error: any) {
      //@TODO: threat error to display friendly message to user
      alert(error);
    }
    setIsLoading(false);
  };

  return (
    <PlayerContext.Provider
      value={{
        isLoading,
        createPlayer,
        currentPlayer,
        setCurrentPlayer,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
}

export function usePlayer() {
  const context = useContext(PlayerContext);
  const { isLoading, createPlayer, currentPlayer, setCurrentPlayer } = context;

  return {
    isLoading,
    createPlayer,
    currentPlayer,
    setCurrentPlayer,
  };
}
