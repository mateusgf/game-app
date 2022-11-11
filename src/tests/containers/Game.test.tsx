import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Game from "../../containers/Game";

const mockCurrentGame = {
  id: 14,
  hostNickname: "I_am_host",
  guestNickname: "I_am_guest",
  numberOfRounds: 4,
};
const mockGameRounds = [
  {
    id: 30,
    gameId: 14,
    hostAction: "",
    guestAction: "",
    winnerNickname: "",
    winnerAction: "",
    guestNickname: "I_am_guest",
    hostNickname: "I_am_host",
  },
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

jest.mock("../../context/Game", () => ({
  ...jest.requireActual("../../context/Game"),
  useGame: () => {
    return {
      currentGame: mockCurrentGame,
      gameRounds: mockGameRounds,
      getGameById: () => mockCurrentGame,
      fetchRoundsByGameId: () => mockGameRounds,
      createRound: () => {},
      updateRound: () => {},
    };
  },
}));
jest.mock("../../context/Player", () => ({
  ...jest.requireActual("../../context/Player"),
  usePlayer: () => {
    return {
      currentPlayer: { nickname: "dummy" },
    };
  },
}));

describe("Game container", () => {
  test("match snapshot", () => {
    const mockedProps = {
      match: { params: { id: 1 } },
    };
    const { container } = render(<Game {...mockedProps} />);
    expect(container).toMatchSnapshot();
  });

  test("renders home", () => {
    const mockedProps = {
      match: { params: { id: 14 } },
    };
    const { container } = render(<Game {...mockedProps} />);

    const gameIdLabel = screen.getByText(/Game ID/i);
    const numberOfRoundsLabel = screen.getByText(/Rounds: /i);
    const playerActionsWrp = screen.getByTestId("player-actions");
    const actionRock = screen.getByTestId("action-rock");
    const actionPaper = screen.getByTestId("action-paper");
    const actionScissors = screen.getByTestId("action-scissors");

    expect(gameIdLabel).toBeInTheDocument();
    expect(numberOfRoundsLabel).toBeInTheDocument();
    expect(playerActionsWrp).toBeTruthy();

    expect(actionRock).toBeTruthy();
    expect(actionPaper).toBeTruthy();
    expect(actionScissors).toBeTruthy();
  });
});
