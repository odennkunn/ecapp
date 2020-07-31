import React, { useCallback } from 'react';
import List from '@material-ui/core/List';
import {getProductsInCart} from '../reducks/users/selectors';
import { useSelector, useDispatch } from 'react-redux';
import {CartListItem} from '../components/Products'
import {GreyButton, PrimaryButton } from '../components/UIkit';
import { push } from 'connected-react-router';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
  root: {
    margin: '0 auto',
    maxWidth: 512,
    width: '100%'
  }
})

const CartList = () => {

  const dispatch = useDispatch();
  const selector = useSelector((state) => state);
  const productsInCart = getProductsInCart(selector);
  const classes = useStyles();

  //注文確認画面への関数
  const goToOrder = useCallback(() => {
    dispatch(push('/order/confirm'))
  }, []);

  //ホーム画面に戻る関数
  const backToHome = useCallback(() => {
    dispatch(push('/'))
  }, []);

  return (
    <section className="c-section-wrapin">
      <h2 className="u-text__headline">ショッピングカート</h2>
      <List className={classes.root}>
        {productsInCart.length > 0 ? (
          productsInCart.map(product => <CartListItem key={product.cartId} product={product}/>)
        ) : (
          <p>ショッピングカート内に商品がありません。</p>
        )}
      </List>
      <div className="p-grid__column">
        <div class="back-gray">
          {productsInCart.length > 0 && (
            <PrimaryButton label={'レジへ進む'} onClick={goToOrder} />
          )}
          <div className="module-spacer--extra-small" />
          <GreyButton label={"ショッピングを続ける"} onClick={backToHome} />
        </div>
      </div>
    </section>
  )
}

export default CartList