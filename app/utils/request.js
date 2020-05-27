import 'whatwg-fetch';

/**
 * Parses the JSON returned by a network request
 *
 * @param  {object} response A response from a network request
 *
 * @return {object}          The parsed JSON from the request
 */
function parseJSON(response) {
  return new Promise(res =>
    response.json().then(result => {
      if (result.length !== undefined) {
        // LEGACY
        // result is array, so we can't extend it with additional data
        res(result);
        // TODO res({ data: result, status: response.status });
      } else {
        res({ ...result, status: response.status });
      }
    }),
  );
}

/**
 * Requests a URL, returning a promise
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 *
 * @return {object}           The response data
 */
export default function request(url, options) {
  return fetch(url, options).then(parseJSON);
}
