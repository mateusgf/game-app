import React from "react";
import { render, screen, fireEvent, waitFor, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";
import Game from "../../containers/Game";

jest.useFakeTimers();

jest.mock("../../context/Player", () => ({
  ...jest.requireActual("../../context/Player"),
  usePlayer: () => {
    return {
      currentPlayer: { nickname: "I_am_host" },
      createPlayer: jest.fn(() => { nickname: "I_am_host" }),
    };  
  },
}));

const mockHistoryPush = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}));

const mockCreateGame = jest.fn();

const mockCurrentGame = {
  id: 14,
  hostNickname: "I_am_host",
  guestNickname: "I_am_guest",
  numberOfRounds: 4,
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

const mockCreateRound = jest.fn(() => mockGameRounds);
const mockFetchRoundsByGameId = jest.fn(() => mockGameRounds);
const mockShouldClearRoundsFetch = jest.fn(() => true);
const mockGetBestOfRounds = jest.fn(() => ({I_am_host: 1, I_am_guest: 0}));
const mockPlayAction = jest.fn(() => null);

jest.mock("../../context/Game", () => ({
  ...jest.requireActual("../../context/Game"),
  useGame: () => ({
    createGame: mockCreateGame,
    currentGame: mockCurrentGame,
    gameRounds: mockGameRounds,
    getGameById: jest.fn(() => mockCurrentGame),
    createRound: mockCreateRound,
    fetchRoundsByGameId: mockFetchRoundsByGameId,
    shouldClearRoundsFetch: mockShouldClearRoundsFetch,
    getBestOfRounds: mockGetBestOfRounds,
    playAction: mockPlayAction,
  }),
}));

afterEach(() => {
  cleanup();
});


describe("Game container", () => {
  test("match snapshot", () => {
    const mockedProps = {
      match: { params: { id: 14 } },
    };
    // @ts-expect-error
    const { container } = render(<Game {...mockedProps} />);
    expect(container).toMatchSnapshot();
  });

  test("renders home", () => {
    const mockedProps = {
      match: { params: { id: 14 } },
    };
    // @ts-expect-error
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

  test("call fetchRoundsByGameId", async () => {

    const mockedProps = {
      match: { params: { id: 14 } },
    };
    // @ts-expect-error
    render(<Game {...mockedProps} />);

    await waitFor(() => expect(mockFetchRoundsByGameId).toBeCalledWith(14));
  });

  test("call getBestOfRounds", async () => {
    const mockedProps = {
      match: { params: { id: 14 } },
    };
    // @ts-expect-error
    render(<Game {...mockedProps} />);
    
    await waitFor(() => expect(mockGetBestOfRounds).toBeCalled());

    jest.spyOn(global, "setTimeout");
    await waitFor(() => expect(setTimeout).toBeCalled());
  });

  test("call playAction", async () => {
    const mockedProps = {
      match: { params: { id: 14 } },
    };
    // @ts-expect-error
    render(<Game {...mockedProps} />);

    fireEvent(
      screen.getByTestId("action-rock"),
      new MouseEvent("click", {
        bubbles: true,
        cancelable: true,
      }),
    );
    
    const isHostPlayer = true;
    await waitFor(() => expect(mockPlayAction).toBeCalledWith("rock", isHostPlayer));
  });
});
