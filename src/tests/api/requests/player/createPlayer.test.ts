import '@testing-library/jest-dom'
import api from "./../../../../api";
import createPlayer from "./../../../../api/requests/player/createPlayer";

jest.mock("./../../../../api", () => {
  const original = jest.requireActual("./../../../../api");
  return {
    __esModule: true,
    ...original,
    default: jest.fn(),
  }
});

describe("createPlayer", () => {
  test('call api', async () => {
    createPlayer("mat_host");
    expect(api).toBeCalled();
  });
});
