import '@testing-library/jest-dom'
import api from "./../../../../api";
import joinGame from "./../../../../api/requests/game/joinGame";

jest.mock("./../../../../api", () => {
  const original = jest.requireActual("./../../../../api");
  return {
    __esModule: true,
    ...original,
    default: jest.fn(),
  }
});

describe("joinGame", () => {
  test('call api', async () => {
    joinGame(123, "mat_guest");
    expect(api).toBeCalled();
  });
});
