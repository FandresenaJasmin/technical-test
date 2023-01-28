interface FetchOptions extends RequestInit {
  // number of retries before returning the error
  retries?: number;

  // timeout in milliseconds to not exceed to receive a response from server
  timeout?: number;
}

enum ERROR_TYPE {
  TIME_OUT = 'TIME_OUT',
}

/**
 * Execute fetch with additional options, inlcuding retries and timeout
 *
 * @param url: URL to call
 * @param o FetchOptions: options to pass to fetch, including retries and timeout
 *
 * @todo:
 * - implement retries flow: when the request fails, the retry flow is executed.
 *    When attempts are exhausted, the entire process should result into failure
 *    by keeping the original error
 * - timeout flow: when the response is not received within the timeout,
 *    the request is aborted, and the retry flow is executed
 *
 * You can find an example of usage at `src/app/fetch/pages.tsx`
 * It makes an API call to /api/mayfail, which may fail over calls and duration varies from 0 to 2 seconds
 *
 * So for better testing, you can change the `retries` and `timeout` values to have a value under 2 seconds
 *
 * @param url
 * @param o
 * @returns
 */
export default async function fetchEnhanced(url: string, o: FetchOptions): Promise<Response> {
  const { retries = 0, timeout = 0, ...options } = o || {};
  console.log('additional options', { retries, timeout });
  let result: Promise<Response>;
  let retryLeft = 1;
  while (retryLeft <= retries) {
    try {
      result = await timedOutAbortableFetch(timeout, url);
      if (result.ok) {
        retryLeft = retries;
        break;
      }
    } catch (e) {
      console.error(`FetchEnhanced , retry n° : ${retryLeft} , ${retries}`);
      retryLeft++;

      let errorResponse: any;
      let maxRetriesExededErrorMessage = 'Maximum retries reached !, last error :';
      let errorMessage = e;
      if (e === ERROR_TYPE.TIME_OUT) {
        errorMessage = 'Request Timeout';
      }
      errorResponse = {
        status: 408,
        statusText: retryLeft > retries ? `${maxRetriesExededErrorMessage} ${errorMessage}` : errorMessage,
      } as Response;

      result = Promise.resolve(errorResponse);
    }
  }

  return result;
}

const timedOutAbortableFetch = (timeout: number, url: string): Promise<Response> => {
  const ac = new AbortController();
  ac.signal.addEventListener(
    'abort',
    () => {
      //onAbort
    },
    { once: true }
  );
  let cancellerTimeout: Promise<Response> = new Promise((resolve, reject) => {
    let id = setTimeout(() => {
      clearTimeout(id);
      ac.abort();
      reject(ERROR_TYPE.TIME_OUT);
    }, timeout);
  });

  // Returns a race between our timeout and the passed in promise
  return Promise.race([
    fetch(url, { signal: ac.signal })
      .then((response) => {
        if (response.ok) {
          return Promise.resolve(response);
        }

        return Promise.reject(new Error(`HTTP Error ${response.status}: ${response.statusText}`));
      })
      .catch((e) => Promise.reject(e))
      .finally(() => Promise.resolve()),
    cancellerTimeout,
  ]);
};
