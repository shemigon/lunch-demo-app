import {configureStore, getDefaultMiddleware} from "@reduxjs/toolkit";
import {rootReducer, RootState} from "store/reducers";


export function configureAppStore(preloadedState?: RootState) {
  const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware(),
    preloadedState,
  });

  if (process.env.NODE_ENV !== 'production' && module.hot) {
    module.hot.accept('./reducers', () => store.replaceReducer(rootReducer));
  }

  return store;
}