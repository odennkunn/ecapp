//actionと初期のstateをインポート
import * as Actions from './actions'
import initialState from '../store/initialState'  //初期のstate

//第一引数には初期または現在のstate、第二引数にactionがreturnした値を
export const UsersReducer = (state = initialState.users, action) => {
  switch(action.type) { //actionのタイプに応じてstateの変更内容を以下に
    case Actions.SIGN_IN:
      return {  //スプレッド構文で記述
        ...state,  //action.payloadに指定されていない値が消えないようにする
        ...action.payload
      }
    case Actions.SIGN_OUT:
      return {
        ...action.payload
      };
    case Actions.FETCH_PRODUCTS_IN_CART:
    return {
      ...state,
      cart: [...action.payload]  //スプレッド構文で配列の中に取得してきた配列を展開
    };
    case Actions.FETCH_LIKES_PRODUCTS:
    return {
      ...state,
      cart: [...action.payload]  //スプレッド構文で配列の中に取得してきた配列を展開
    };
    case Actions.FETCH_ORDERS_HISTORY:
      return {
        ...state,
        orders: [...action.payload]  //スプレッド構文で配列の中に取得してきた配列を展開
      };
    default:
      return state
  }
}