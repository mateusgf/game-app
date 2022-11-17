import PlayerProvider, {usePlayer} from "../../context/Player";
import {render, screen, fireEvent, cleanup, waitFor} from "@testing-library/react";
import {act} from "react-dom/test-utils";
import createPlayerAPI from "../../api/requests/player/createPlayer";

jest.mock("../../api/requests/player/createPlayer", () => {
  const original = jest.requireActual("../../api/requests/player/createPlayer");
  return {
    __esModule: true,
    ...original,
    default: jest.fn(() => {nickname: "droid1"}),
  }
});

beforeEach(() => {
  const WrapperComponent = () => {
    const {
      isLoading,
      createPlayer,
      currentPlayer,
      setCurrentPlayer,
    } = usePlayer();

    return (
      <>
        <div data-testid="value">{JSON.stringify(currentPlayer)}</div>
        <button
          data-testid="createPlayer"
          onClick={() => createPlayer("droid1")}
        />
        <button
          data-testid="setCurrentPlayer"
          onClick={() => setCurrentPlayer("droid1")}
        />
      </>
    );
  };

  const {getByTestId} = render(
    <PlayerProvider>
      <WrapperComponent />
    </PlayerProvider>
  );
});

afterEach(() => {
  cleanup();
});

describe("Player Context", () => {
  test("initial value", () => {
    const valueAsJSON = screen.getByTestId("value");

    expect(valueAsJSON.textContent).toEqual(
      `{\"nickname\":\"\"}`
    );
  });

  test("call createPlayer", async () => {
    const valueAsJSON = screen.getByTestId("value");
    act(() => {
      fireEvent.click(screen.getByTestId("createPlayer"));
    });

    await waitFor(() => expect(createPlayerAPI).toBeCalled());
  });

  test("call setCurrentPlayer", async () => {
    const valueAsJSON = screen.getByTestId("value");
    act(() => {
      fireEvent.click(screen.getByTestId("setCurrentPlayer"));
    });

    await waitFor(() => expect(valueAsJSON.textContent).toBe("\"droid1\""));
  });

});
