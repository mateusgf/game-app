import '@testing-library/jest-dom'
import api from "./../../../../api";
import getPlayerByNickname from "./../../../../api/requests/player/getPlayerByNickname";

jest.mock("./../../../../api", () => {
  const original = jest.requireActual("./../../../../api");
  return {
    __esModule: true,
    ...original,
    default: jest.fn(),
  }
});

describe("getPlayerByNickname", () => {
  test('call api', async () => {
    getPlayerByNickname("mat_host");
    expect(api).toBeCalled();
  });
});
