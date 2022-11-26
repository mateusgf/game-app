import '@testing-library/jest-dom'
import api from "./../../../../api";
import createRound from "./../../../../api/requests/round/createRound";

jest.mock("./../../../../api", () => {
  const original = jest.requireActual("./../../../../api");
  return {
    __esModule: true,
    ...original,
    default: jest.fn(),
  }
});

describe("createRound", () => {
  test('call api', async () => {
    createRound({gameId: 1, hostAction: "paper"});
    expect(api).toBeCalled();
  });
});
