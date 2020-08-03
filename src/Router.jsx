import React from 'react';
import {Switch, Route} from 'react-router'; //ルーター関係
import {SignIn, Reset, SignUp, ProductEdit, ProductList, ProductDetail, CartList, OrderConfirm, OrderHistory, OrderComplete} from './templates' //各テンプレートのインポート
import Auth from './Auth'  //authテンプレート

const Router = () => {

  return (
    // switchでurlにマッチされた最初のルーティングだけがレンダリングされる、部分一致でもコンポーネントを表示するのを防ぐ
    <Switch>
      <Route exact path={"/signup"} component={SignUp} />
      <Route exact path={"/signin"} component={SignIn} />
      <Route exact path={"/signin/reset"} component={Reset} />

      {/* auth認証後に表示したいページは以下に */}
      <Auth>
        <Route exact path={"(/)?"} component={ProductList} />
        <Route path={"/product/edit(/:id)?"} component={ProductEdit} />  {/* ()?で囲んだ文字列はあってもなくてもマッチ */}
        <Route exact path={"/product/:id"} component={ProductDetail} />
        <Route exact path={"/cart"} component={CartList} />
        <Route exact path={"/order/confirm"} component={OrderConfirm} />
        <Route exact path={"/order/history"} component={OrderHistory} />
        <Route exact path={"/order/complete"} component={OrderComplete} />
      </Auth>
    </Switch>
  )
}

export default Router