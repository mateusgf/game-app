export type GameType = {
  id: number;
  hostNickname: string;
  guestNickname: string;
  numberOfRounds: number;
};

export type GameRound = {
  id: number;
  gameId: number;
  hostAction?: string;
  guestAction?: string;
  winnerNickname?: string;
  winnerAction?: string;
};

export type PlayerType = {
  nickname: string;
};

export type CreateRoundType = {
  gameId: number;
  hostAction?: string;
  guestAction?: string;
};

export type UpdateRoundType = {
  id: number;
  gameId: number;
  hostAction?: string;
  guestAction?: string;
};
