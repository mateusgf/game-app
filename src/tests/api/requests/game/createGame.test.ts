import '@testing-library/jest-dom'
import api from "./../../../../api";
import createGame from "./../../../../api/requests/game/createGame";

jest.mock("./../../../../api", () => {
  const original = jest.requireActual("./../../../../api");
  return {
    __esModule: true,
    ...original,
    default: jest.fn(),
  }
});

describe("createGame", () => {
  test('call api', async () => {
    createGame("mat_host", 1);
    expect(api).toBeCalled();
  });
});
