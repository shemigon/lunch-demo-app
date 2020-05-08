import {RootState} from "store/reducers";


type Callback = (resolve: (value?: any | PromiseLike<any>) => void, reject: (reason?: any) => void, state?: RootState) => void;

export function requestWrapper(callback: Callback) {
  return function (state?: RootState) {
    return new Promise((resolve, reject) => {
      return callback(resolve, reject, state);
    });
  };
}