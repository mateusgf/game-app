const base = `${process.env.REACT_APP_API_URL}`;

interface IPayload {
  path: string;
  method: string;
  body?: { [key: string]: any };
  headers?: { [key: string]: any };
}

const api = (payload: IPayload) => {
  const { path, method, body, headers } = payload;
  const bodyJson = JSON.stringify(body);
  const url = `${base}/${path}`;

  const headersObj = {
    ...headers,
    "Content-Type": "application/json",
  };

  return fetch(url, { method, body: bodyJson, headers: headersObj }).then((response) =>
    handleResponse(response),
  );
};

export const handleResponse = (response: any) => {
  return response.text().then((text: string) => {
    const data = text && IsJsonString(text) && JSON.parse(text);

    if (!response.ok) {
      let error;

      if (data.message) {
        throw Error(data.message);
      }

      return Promise.reject(error);
    }

    return data;
  });
};

export const IsJsonString = (str: string) => {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
};

export default api;
