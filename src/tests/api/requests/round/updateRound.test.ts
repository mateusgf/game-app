import '@testing-library/jest-dom'
import api from "./../../../../api";
import updateRound from "./../../../../api/requests/round/updateRound";

jest.mock("./../../../../api", () => {
  const original = jest.requireActual("./../../../../api");
  return {
    __esModule: true,
    ...original,
    default: jest.fn(),
  }
});

describe("updateRound", () => {
  test('call api', async () => {
    updateRound({id: 1, gameId: 1, guestAction: "paper"});
    expect(api).toBeCalled();
  });
});
