import App from 'app';
import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from "react-redux";
import {BrowserRouter} from "react-router-dom";
import {configureAppStore} from "store/store";
import './index.css';
import * as serviceWorker from './serviceWorker';


export const store = configureAppStore();

const renderApp = () => ReactDOM.render(
    <React.StrictMode>
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    </React.StrictMode>,
    document.getElementById('root'),
);

if (process.env.NODE_ENV !== 'production' && module.hot) {
  module.hot.accept('./containers', renderApp);
}

renderApp();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
