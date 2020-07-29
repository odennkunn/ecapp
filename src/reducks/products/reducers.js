//actionと初期のstateをインポート
import * as Actions from './actions'
import initialState from '../store/initialState'  //初期のstate

//第一引数には初期または現在のstate、第二引数にactionがreturnした値を
export const ProductsReducer = (state = initialState.products, action) => {
  switch(action.type) { //actionのタイプに応じてstateの変更内容を以下に
      case Actions.FETCH_PRODUCTS:
        return {
          ...state,
          list: [...action.payload]  //スプレッドで配列を展開して、再度配列に入れることで、storeで持っているメモリ情報が書き換わる→コンポーネント側でも変更を検知できる
        }
        case Actions.DELETE_PRODUCT:  //商品削除アクション
        return {
          ...state,
          list: [...action.payload]  //スプレッドで配列を展開して、再度配列に入れることで、storeで持っているメモリ情報が書き換わる→コンポーネント側でも変更を検知できる
        }
      default:
          return state
  }
}