import { createStore as reduxCreateStore, combineReducers, applyMiddleware} from 'redux';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import {UsersReducer} from "../users/reducers";
import {ProductsReducer} from "../products/reducers";
import thunk from 'redux-thunk';

export default function createStore(history) {
  return reduxCreateStore(
    combineReducers({  //分割したreducerをまとめる
      router: connectRouter(history),
      users: UsersReducer,
      products: ProductsReducer
    }),
    applyMiddleware(
      routerMiddleware(history), //routerとstoreを接続するため
      thunk  //redex-thunkをmiddlewareに追加
    )
  )
}