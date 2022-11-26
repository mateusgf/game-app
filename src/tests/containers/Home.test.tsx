import { render, screen, fireEvent, waitFor, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";
import Home from "../../containers/Home";
import {act} from "react-dom/test-utils";
import getPlayerByNickname from "../../api/requests/player/getPlayerByNickname";

jest.mock("../../api/requests/player/getPlayerByNickname", () => {
  const original = jest.requireActual("../../api/requests/player/getPlayerByNickname");
  return {
    __esModule: true,
    ...original,
    default: jest.fn(),
  }
});

const mockCreatePlayer = jest.fn(() => ({nickname: "I_am_host"}));
jest.mock("../../context/Player", () => ({
  ...jest.requireActual("../../context/Player"),
  usePlayer: () => {
    return {
      currentPlayer: { nickname: "droid1" },
      createPlayer: mockCreatePlayer,
    };
  },
}));

const mockCreateGame = jest.fn(() => ({id: 14, hostNickname: "I_am_host", numberOfRounds: 1}));
const mockJoinGame = jest.fn(() => ({id: 14, hostNickname: "I_am_host", numberOfRounds: 1}));
jest.mock("../../context/Game", () => ({
  ...jest.requireActual("../../context/Game"),
  useGame: () => {
    return {
      createGame: mockCreateGame,
      joinGame: mockJoinGame,
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


afterAll(() => cleanup());

describe("Home container", () => {
  test("match snapshot", () => {
    const { container } = render(<Home />);
    expect(container).toMatchSnapshot();
  });

  test("renders home", () => {
    const { container } = render(<Home />);
    const homeTitle = screen.getByText(/Rock, Paper & Scissors/i);
    const btnStartGame = screen.getByTestId("btn-start-game");
    const btnJoinGame = screen.getByTestId("btn-join-game");
    expect(btnJoinGame).toBeInTheDocument();
    expect(btnStartGame).toBeInTheDocument();
    expect(homeTitle).toBeInTheDocument();
  });

  test("renders new game form", async () => {
    const { container } = render(<Home />);
    fireEvent(
      screen.getByTestId("btn-start-game"),
      new MouseEvent("click", {
        bubbles: true,
        cancelable: true,
      }),
    );

    const form = await screen.findAllByTestId("new-game-form");
    const inputNickname = await screen.findAllByTestId("input-nickname");
    const inputNumberOfRunds = await screen.findAllByTestId("input-number-of-rounds");
    const btnStart = await screen.findAllByTestId("btn-start");
    expect(form).toBeTruthy();
    expect(inputNickname).toBeTruthy();
    expect(inputNumberOfRunds).toBeTruthy();
    expect(btnStart).toBeTruthy();
  });

  test("go to games listing", async () => {
    render(<Home />);
    fireEvent(
      screen.getByTestId("goto-listing"),
      new MouseEvent("click", {
        bubbles: true,
        cancelable: true,
      }),
    );

    await waitFor(() => expect(mockHistoryPush).toHaveBeenCalledWith("/games"));
  });

  test("create player", async () => {
    render(<Home />, {});

    fireEvent(
      screen.getByTestId("btn-start-game"),
      new MouseEvent("click", {
        bubbles: true,
        cancelable: true,
      }),
    );

    const nickNameInput = screen.getByTestId("input-nickname");
    const roundsInput = screen.getByTestId("input-number-of-rounds");

    act(() => {
      fireEvent.change(nickNameInput, {target: {value: "droid1"}});
      fireEvent.change(roundsInput, {target: {value: 1}});
    });

    act(() => {
      fireEvent(
        screen.getByTestId("btn-start"),
        new MouseEvent("click", {
          bubbles: true,
          cancelable: true,
        }),
      );
    });

    await waitFor(() => expect(mockCreatePlayer).toBeCalled());
  });

  test("create game", async () => {
    render(<Home />, {});

    fireEvent(
      screen.getByTestId("btn-start-game"),
      new MouseEvent("click", {
        bubbles: true,
        cancelable: true,
      }),
    );

    const nickNameInput = screen.getByTestId("input-nickname");
    const roundsInput = screen.getByTestId("input-number-of-rounds");

    act(() => {
      fireEvent.change(nickNameInput, {target: {value: "droid1"}});
      fireEvent.change(roundsInput, {target: {value: 1}});
    });

    act(() => {
      fireEvent(
        screen.getByTestId("btn-start"),
        new MouseEvent("click", {
          bubbles: true,
          cancelable: true,
        }),
      );
    });

    mockCreatePlayer.mockReturnValue({nickname: "I_am_host"});
    mockCreateGame.mockReturnValue({id: 14, hostNickname: "I_am_host", numberOfRounds: 14});
  

    await waitFor(() => expect(mockCreatePlayer).toBeCalled());
    await waitFor(() => expect(mockCreateGame).toBeCalled());
    await waitFor(() => expect(mockHistoryPush).toHaveBeenCalledWith({"pathname": "/game/14"}));
  });

  test("join game", async () => {
    render(<Home />, {});

    fireEvent(
      screen.getByTestId("btn-join-game"),
      new MouseEvent("click", {
        bubbles: true,
        cancelable: true,
      }),
    );

    const nickNameInput = screen.getByTestId("input-nickname");
    const gameIdInput = screen.getByTestId("input-game-id");

    act(() => {
      fireEvent.change(nickNameInput, {target: {value: "I_am_host"}});
      fireEvent.change(gameIdInput, {target: {value: 14}});
    });

    act(() => {
      fireEvent(
        screen.getByTestId("btn-join"),
        new MouseEvent("click", {
          bubbles: true,
          cancelable: true,
        }),
      );
    });

    mockJoinGame.mockReturnValue({id: 14, hostNickname: "I_am_host", numberOfRounds: 1});

    await waitFor(() => expect(getPlayerByNickname).toBeCalled());
    await waitFor(() => expect(mockJoinGame).toBeCalled());
    await waitFor(() => expect(mockHistoryPush).toHaveBeenCalledWith({"pathname": "/game/14"}));
  });

  test("join game with error", async () => {
    render(<Home />, {});

    fireEvent(
      screen.getByTestId("btn-join-game"),
      new MouseEvent("click", {
        bubbles: true,
        cancelable: true,
      }),
    );

    const nickNameInput = screen.getByTestId("input-nickname");
    const gameIdInput = screen.getByTestId("input-game-id");

    act(() => {
      fireEvent.change(nickNameInput, {target: {value: "I_am_host"}});
      fireEvent.change(gameIdInput, {target: {value: 14}});
    });

    act(() => {
      fireEvent(
        screen.getByTestId("btn-join"),
        new MouseEvent("click", {
          bubbles: true,
          cancelable: true,
        }),
      );
    });
    jest.spyOn(window, 'alert').mockImplementation(() => {});
    // @ts-expect-error
    mockJoinGame.mockReturnValue(false);

    await waitFor(() => expect(alert).toBeCalledWith("Could not join the game"));
  });
});
