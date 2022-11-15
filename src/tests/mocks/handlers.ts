import { rest } from "msw";

const mockNewGame = {
  id: 14,
  hostNickname: "I_am_host2",
  guestNickname: "I_am_guest2",
  numberOfRounds: 1,
};

const mockNewPlayer = {nickname: "droid1"};

const mockCurrentGame = {
  id: 14,
  hostNickname: "I_am_host",
  guestNickname: "I_am_guest",
  numberOfRounds: 4,
};

const mockCurrentGame15 = {
  id: 15,
  hostNickname: "I_am_host",
  guestNickname: "I_am_guest",
  numberOfRounds: 1,
};

const mockGameRounds = [
  {
    id: 29,
    gameId: 14,
    hostAction: "rock",
    guestAction: "scissors",
    winnerNickname: "I_am_host",
    winnerAction: "rock",
    guestNickname: "I_am_guest",
    hostNickname: "I_am_host",
  },
  {
    id: 28,
    gameId: 14,
    hostAction: "paper",
    guestAction: "paper",
    winnerNickname: "draw",
    winnerAction: "draw",
    guestNickname: "I_am_guest",
    hostNickname: "I_am_host",
  },
];

const mockGameRounds15 = [
  {
    id: 31,
    gameId: 15,
    hostAction: "paper",
    guestAction: "rock",
    winnerNickname: "I_am_host",
    winnerAction: "paper",
    guestNickname: "I_am_guest",
    hostNickname: "I_am_host",
  },
];

export const handlers = [

  rest.post("http://localhost:8001/games/new", (req, res, ctx) => {
    return res(
      ctx.json(mockNewGame)
    );
  }),

  rest.post("http://localhost:8001/games/join-game", (req, res, ctx) => {
    return res(
      ctx.json(mockCurrentGame)
    );
  }),

  rest.get("http://localhost:8001/games/14", (req, res, ctx) => {
    return res(
      ctx.json(mockCurrentGame)
    );
  }),

  rest.get("http://localhost:8001/players/I_am_host", (req, res, ctx) => {
    return res(
      ctx.json(mockCurrentGame)
    );
  }),

  rest.get("http://localhost:8001/rounds/14", (req, res, ctx) => {
    return res(
      ctx.json(mockGameRounds)
    );
  }),

  rest.get("http://localhost:8001/games/15", (req, res, ctx) => {
    return res(
      ctx.json(mockCurrentGame15)
    );
  }),

  rest.get("http://localhost:8001/rounds/15", (req, res, ctx) => {
    return res(
      ctx.json(mockGameRounds15)
    );
  }),

  rest.post("http://localhost:8001/players/new", (req, res, ctx) => {
    return res(
      ctx.json(mockNewPlayer)
    );
  }),
];
