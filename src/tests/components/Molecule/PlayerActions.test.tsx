import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import PlayerActions from "../../../components/Molecule/PlayerActions";

describe("PlayerActions molecule component", () => {
  test("match snapshot", () => {

    const mockedProps = {
      playAction: jest.fn(),
      isHostPlayer: true,
      isAvailableToPlayAction: true,
    }

    const { container } = render(<PlayerActions {...mockedProps} />);
    expect(container).toMatchSnapshot();
  });

  test("rock action", async () => {

    const mockPlayAction = jest.fn();

    const mockedProps = {
      playAction: mockPlayAction,
      isHostPlayer: true,
      isAvailableToPlayAction: true,
    }

    render(<PlayerActions {...mockedProps} />);

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

  test("paper action", async () => {

    const mockPlayAction = jest.fn();

    const mockedProps = {
      playAction: mockPlayAction,
      isHostPlayer: true,
      isAvailableToPlayAction: true,
    }

    render(<PlayerActions {...mockedProps} />);

    fireEvent(
      screen.getByTestId("action-paper"),
      new MouseEvent("click", {
        bubbles: true,
        cancelable: true,
      }),
    );

    const isHostPlayer = true;
    await waitFor(() => expect(mockPlayAction).toBeCalledWith("paper", isHostPlayer));
  });

  test("scissors action", async () => {

    const mockPlayAction = jest.fn();

    const mockedProps = {
      playAction: mockPlayAction,
      isHostPlayer: true,
      isAvailableToPlayAction: true,
    }

    render(<PlayerActions {...mockedProps} />);

    fireEvent(
      screen.getByTestId("action-scissors"),
      new MouseEvent("click", {
        bubbles: true,
        cancelable: true,
      }),
    );

    const isHostPlayer = true;
    await waitFor(() => expect(mockPlayAction).toBeCalledWith("scissors", isHostPlayer));
  });

});
