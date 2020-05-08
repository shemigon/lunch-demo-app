export type QueryParams = {[name: string]: string | number | undefined};

const makeUrl = (path: string, params?: QueryParams) => {
  let url = `${process.env.REACT_APP_BASE_API_URL}/${path}/`;
  if (params) {
    const urlParams = Object.keys(params)
        .filter(key => !!params[key])
        .map(key => key + '=' + params[key])
        .join('&');
    if (urlParams.length) {
      url += '?' + urlParams;
    }
  }
  return encodeURI(url);
};

interface Request {
  method?: string;
  path: string;
  params?: QueryParams;
  body?: object;
}

interface ResponseData {
  data: {[key: string]: any},
  response: Response
}

type Headers = {[k: string]: string};

export function request({
                          method,
                          path,
                          params,
                          body,
                        }: Request) {
  let headers: Headers = {'Content-Type': 'application/json'};
  return new Promise<ResponseData>((resolve, reject) => {
        fetch(makeUrl(path, params), {
          method: method || 'GET',
          headers: headers,
          body: JSON.stringify(body),
        })
            .then(response => {
              if (response.status === 204) {
                return resolve();
              }
              response.json().then(json => {
                if (response.status >= 200 && response.status <= 299) {
                  return resolve({
                    data: json,
                    response,
                  });
                }
                reject(json);
              });
            })
            .catch((err) => {
              reject(err);
            });
      },
  )
      ;
}