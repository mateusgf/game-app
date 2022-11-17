import Game from "../../containers/Game";
import {render, screen, waitFor} from "../testUtils/testingLibraryUtils";
import { usePlayer } from "../../context/Player";

jest.mock("../../api/requests/player/createPlayer", () => {
  const original = jest.requireActual("../../api/requests/player/createPlayer");
  return {
    __esModule: true,
    ...original,
    default: jest.fn(),
  }
});

jest.mock("../../context/Player", () => ({
  ...jest.requireActual("../../context/Player"),
  usePlayer: jest.fn(),
}));

const mockHistoryPush = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}));

describe("GameContext", () => {
  test("should show game header with ID and number of rounds", async () => {
    const mockPlayerFunc = jest.fn(() => {
      return {
        currentPlayer: { nickname: "I_am_guest" },
        createPlayer: jest.fn(() => { nickname: "droid1" }),
      };
    });
    // @ts-expect-error
    usePlayer.mockImplementation(mockPlayerFunc);

    const mockedProps = {
      match: { params: { id: 14 } },
    };
    // @ts-expect-error
    render(<Game {...mockedProps} />, {});

    const gameHeader = await screen.findByTestId("game-id-header");
    await waitFor(() => expect(gameHeader).toHaveTextContent("Game ID: 14 | Rounds: 4"))
  });
  
  test("should show a label stating that all rounds ended", async () => {
    const mockPlayerFunc = jest.fn(() => {
      return {
        currentPlayer: { nickname: "I_am_guest" },
        createPlayer: jest.fn(() => { nickname: "droid1" }),
      };
    });
    // @ts-expect-error
    usePlayer.mockImplementation(mockPlayerFunc);
    const mockedProps = {
      match: { params: { id: 15 } },
    };
    // @ts-expect-error
    render(<Game {...mockedProps} />, {});
  
    const endedRoundsLabel = await screen.findByTestId("all-rounds-ended-label");
    await waitFor(() => expect(endedRoundsLabel).toHaveTextContent("All rounds ended"));
  });

  test("should show game header with ID and number of rounds", async () => {
    const mockPlayerFunc = jest.fn(() => {
      return {
        currentPlayer: { nickname: "I_am_guest" },
        createPlayer: jest.fn(() => { nickname: "droid1" }),
      };
    });
    // @ts-expect-error
    usePlayer.mockImplementation(mockPlayerFunc);
    const mockedProps = {
      match: { params: { id: 14 } },
    };
    // @ts-expect-error
    render(<Game {...mockedProps} />, {});

    const winnerLastRoundLabel = await screen.findByTestId("winner-last-round-message");
    await waitFor(() => expect(winnerLastRoundLabel).toHaveTextContent("Winner of last turn was: I_am_host"))
  });

  test("should show a message that the turn is waiting for opponent to play", async () => {
    const mockPlayerFunc = jest.fn(() => {
      return {
        currentPlayer: { nickname: "I_am_guest" },
        createPlayer: jest.fn(() => { nickname: "droid1" }),
      };
    });
    // @ts-expect-error
    usePlayer.mockImplementation(mockPlayerFunc);
    const mockedProps = {
      match: { params: { id: 14 } },
    };
    // @ts-expect-error
    render(<Game {...mockedProps} />, {});

    const winnerLastRoundLabel = await screen.findByTestId("waiting-opponent-label");
    await waitFor(() => expect(winnerLastRoundLabel).toHaveTextContent("Waiting for opponent to play"))
  });

  test("should go to home route when there is not player selected", async () => {
    const mockPlayerFunc = jest.fn(() => {
      return {
        currentPlayer: { nickname: null },
      };
    });
    // @ts-expect-error
    usePlayer.mockImplementation(mockPlayerFunc);
    const mockedProps = {
      match: { params: { id: 14 } },
    };
    // @ts-expect-error
    render(<Game {...mockedProps} />, {});

    await waitFor(() => expect(mockHistoryPush).toHaveBeenCalledWith("/"));
  });
});


