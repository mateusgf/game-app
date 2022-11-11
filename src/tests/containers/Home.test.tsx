import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Home from "../../containers/Home";

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

  test("renders join game form", async () => {
    const { container } = render(<Home />);

    fireEvent(
      screen.getByTestId("btn-join-game"),
      new MouseEvent("click", {
        bubbles: true,
        cancelable: true,
      }),
    );

    const form = await screen.findAllByTestId("join-game-form");
    const inputNickname = await screen.findAllByTestId("input-nickname");
    const inputNumberOfRunds = await screen.findAllByTestId("input-game-id");
    const btnStart = await screen.findAllByTestId("btn-join");
    expect(form).toBeTruthy();
    expect(inputNickname).toBeTruthy();
    expect(inputNumberOfRunds).toBeTruthy();
    expect(btnStart).toBeTruthy();
  });
});
