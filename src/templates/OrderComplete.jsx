import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {GreyButton} from '../components/UIkit';
import { push } from 'connected-react-router';
import {fetchOrdersHistory} from '../reducks/users/operations';
import { getOrdersHistory } from '../reducks/users/selectors';
import { useEffect } from 'react';


const CartList = () => {

  const dispatch = useDispatch();
  const selector = useSelector((state) => state);
  const orders = getOrdersHistory(selector);
  const ids = orders.map(order => order.id)


  //ホーム画面に戻る関数
  const backToHome = useCallback(() => {
    dispatch(push('/'))
  }, []);

  useEffect(() => {
    dispatch(fetchOrdersHistory())
  }, [])

  return (
    <section className="c-section-wrapin">
      <h2 className="u-text__headline">ご注文ありがとうございます！</h2>
      <span>注文ID：</span>
      <span>{ids[0]}</span>
      <div className="p-grid__column">
        <div className="back-gray">
          <div className="module-spacer--extra-small" />
          <GreyButton label={"トップページに戻る"} onClick={backToHome} />
        </div>
      </div>
    </section>
  )
}

export default CartList