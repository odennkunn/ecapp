import React, {useCallback, useMemo} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {getProductsInCart} from "../reducks/users/selectors";
import {makeStyles} from "@material-ui/core/styles";
import {CartListItem} from "../components/Products";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import {PrimaryButton, TextDetail} from "../components/UIkit";
import { orderProduct } from '../reducks/products/operations';

const useStyles = makeStyles((theme) => ({
  detailBox: {
    margin: '0 auto',
    [theme.breakpoints.down('sm')]: {
      width: 320
    },
    [theme.breakpoints.up('sm')]: {
      width: 512
    }
  },
  orderBox: {
    border: '1px solid rgba(0,0,0,0.2)',
    borderRadius: 4,
    boxShadow: '0 4px 2px 2px rgba(0,0,0,0.2)',
    height: 256,
    margin: '24px auto 16px auto',
    padding: 16,
    width: 288
  }
}));

const OrderConfirm = () => {

  const classes = useStyles();
  const dispatch = useDispatch();
  const selector = useSelector((state) => state);
  const productsInCart = getProductsInCart(selector)  //userのカード情報を取得

  //商品の合計金額の算出
  const subtotal = useMemo(() => {  //第二引数のproductsInCartの値が変わるたびにこの関数が実行される
    return productsInCart.reduce((sum, product) => sum += product.price, 0)  //sumに合計金額が蓄積される、0は初期値
  }, [productsInCart]);

  //送料
  const shippingFee = (subtotal >= 10000) ? 0 : 210;
  //消費税
  const tax = subtotal * 0.1;
  //合計金額
  const total = subtotal + shippingFee + tax;

  const order = useCallback(() => {
    dispatch(orderProduct(productsInCart, total))
  }, [productsInCart, total]);

  return (
    <section className="c-section-wrapin">
      <h2 className="u-text__headline">注文の確認</h2>
      <div className="p-grid__row">
        <div className={classes.detailBox}>
          <List>
          {productsInCart.length > 0 && (  //カートに商品が一つでもあったら
            productsInCart.map(product => <CartListItem product={product} key={product.cartId} />)
          )}
          </List>
        </div>
        <div className={classes.orderBox}>
          <TextDetail label={'商品合計'} value={'¥' + subtotal.toLocaleString()} />
          <TextDetail label={'消費税'} value={'¥' + tax} />
          <TextDetail label={'送料'} value={'¥' + shippingFee.toLocaleString()} />
          <Divider />
          <TextDetail label={'合計(税込み)'} value={'¥' + total.toLocaleString()} />
          <PrimaryButton label={'注文する'} onClick={order} />
        </div>
      </div>
    </section>
  )
}

export default OrderConfirm