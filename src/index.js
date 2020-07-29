import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';  //storeとの接続に必要
import createStore from './reducks/store/store';  //storeとの接続に必要
import {ConnectedRouter} from 'connected-react-router';  //ルーターに必要
import * as History from 'history'  //ルーターに必要
import App from './App';
import * as serviceWorker from './serviceWorker';
import {MuiThemeProvider} from '@material-ui/core';
import {theme} from './assets/theme'

const history = History.createBrowserHistory();//今までどこのパスにいたのかなどの情報
export const store = createStore(history);  //firestoreの情報を定数に

ReactDOM.render(
  <Provider store={store}>  {/*providerでラッピングすることでどこからでもstoreの情報を参照できるように*/}
    <ConnectedRouter history={history}>{/*appコンポーネント内でのブラウザの遷移を管理してくれるように*/}
      <MuiThemeProvider theme={theme} >
        <App />
      </MuiThemeProvider>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
