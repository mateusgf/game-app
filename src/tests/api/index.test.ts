import '@testing-library/jest-dom'
import api, {IsJsonString, handleResponse} from "./../../api";

class NoErrorThrownError extends Error {}

const getError = async <TError>(call: () => unknown): Promise<TError> => {
  try {
    await call();

    throw new NoErrorThrownError();
  } catch (error: unknown) {
    return error as TError;
  }
};

const mockHandleResponse = {
  text: () => {
    return new Promise(resolve => {
      resolve("dummytext");
    })
  }
}

describe("api", () => {
  test('call api', async () => {

    jest.spyOn(global, "fetch");

    const payload = {
      path: `games`,
      method: "GET",
    };
    const callApi = await api(payload);

    // pulling data from handlers.ts
    expect(fetch).toBeCalledWith("http://localhost:8001/games", {"body": undefined, "headers": {"Content-Type": "application/json"}, "method": "GET"});
    expect(callApi).toMatchObject([{"guestNickname": "I_am_guest2", "hostNickname": "I_am_host2", "id": 14, "numberOfRounds": 1}]);
  });

  test('isJSONstring', async () => {
    const a = IsJsonString('{"id": 1}');
    expect(a).toBeTruthy();

    const b = IsJsonString('aa');
    expect(b).toBeFalsy();
  });

  test("handleResponse return correctly", async () => {
    const jsonReturnVal = '{"guestNickname": "I_am_guest2", "hostNickname": "I_am_host2", "id": 14, "numberOfRounds": 1}';

    const mockFetchReturn = jest.fn(() => Promise.resolve({
        text: () => Promise.resolve(jsonReturnVal),
        ok: true,
    }));

    // @ts-expect-error
    jest.spyOn(global, "fetch").mockImplementation(mockFetchReturn);

    const fetchCall = await fetch("http://localhost:8001/games", {"body": undefined, "headers": {"Content-Type": "application/json"}, "method": "GET"});
    const response = await handleResponse(fetchCall);

    expect(response).toMatchObject({"guestNickname": "I_am_guest2", "hostNickname": "I_am_host2", "id": 14, "numberOfRounds": 1});
  });

  test("throw an error with message set in the json body response", async () => {
    const jsonReturnVal = '{"message": "some error message"}';

    const mockFetchReturn = jest.fn(() => Promise.resolve({
        text: () => Promise.resolve(jsonReturnVal),
        ok: false,
    }));

    // @ts-expect-error
    jest.spyOn(global, "fetch").mockImplementation(mockFetchReturn);

    const fetchCall = await fetch("http://localhost:8001/games", {"body": undefined, "headers": {"Content-Type": "application/json"}, "method": "GET"});
    const error = await getError(async () => handleResponse(fetchCall));
    expect(error).not.toBeInstanceOf(NoErrorThrownError);
    expect(error).toHaveProperty('message', "some error message");
  });

  test("no error message was set to return", async () => {
    const jsonReturnVal = '';

    const mockFetchReturn = jest.fn(() => Promise.resolve({
        text: () => Promise.resolve(jsonReturnVal),
        ok: false,
    }));

    // @ts-expect-error
    jest.spyOn(global, "fetch").mockImplementation(mockFetchReturn);

    const fetchCall = await fetch("http://localhost:8001/games", {"body": undefined, "headers": {"Content-Type": "application/json"}, "method": "GET"});
    const error = await getError(async () => handleResponse(fetchCall));
    expect(error).not.toBeInstanceOf(NoErrorThrownError);
    expect(error).toBeUndefined();
  });
});
