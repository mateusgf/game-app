import { camelCase, isArray, transform, isObject } from "lodash";

const base = `${process.env.REACT_APP_API_URL}`;

interface IPayload {
  path: string;
  method: string;
  body?: { [key: string]: any };
  headers?: { [key: string]: any };
  transformToCamelCase?: boolean;
}

const api = (payload: IPayload) => {
  const { path, method, body, headers, transformToCamelCase = true } = payload;
  const bodyJson = JSON.stringify(body);
  const url = `${base}/${path}`;

  const headersObj = {
    ...headers,
    "Content-Type": "application/json",
  };

  return fetch(url, { method, body: bodyJson, headers: headersObj }).then((response) =>
    handleResponse(response, transformToCamelCase),
  );
};

export const handleResponse = (response: any, transformToCamelCase: boolean) => {
  return response.text().then((text: string) => {
    const data = text && IsJsonString(text) && JSON.parse(text);

    if (!response.ok) {
      let error;

      if (data.message) {
        throw Error(data.message);
      }

      return Promise.reject(error);
    }

    return transformToCamelCase ? camelize(data) : data;
  });
};

const IsJsonString = (str: string) => {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
};

// const camelize = (obj: any) => _.transform(obj, (acc, value, key, target) => {
//   const camelKey = _.isArray(target) ? key : _.camelCase(key as string);

//   //@ts-expect-error
//   acc[camelKey] = _.isObject(value) ? camelize(value) : value;
// });

const camelize = (obj: Record<string, unknown>) =>
  transform(
    obj,
    (result: Record<string, unknown>, value: unknown, key: string, target) => {
      const camelKey = isArray(target) ? key : camelCase(key);
      result[camelKey] = isObject(value)
        ? camelize(value as Record<string, unknown>)
        : value;
    },
  );

export default api;
