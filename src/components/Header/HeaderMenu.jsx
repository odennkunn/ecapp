import React, { useEffect } from 'react';
import IconButton from "@material-ui/core/IconButton";
import {Badge} from "@material-ui/core";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import MenuIcon from "@material-ui/icons/Menu";
import {getProductsInCart, getUserRole} from '../../reducks/users/selectors';
import { useSelector, useDispatch } from 'react-redux';
import { db } from '../../firebase';
import {fetchProductsInCart} from '../../reducks/users/operations';
import {getUserId} from '../../reducks/users/selectors';
import { push } from 'connected-react-router';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  menuIcon: {
    color: '#fff'
  }
});

const HeaderMenu = (props) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const selector = useSelector((state) => state);
  const userRole = getUserRole(selector);
  const uid = getUserId(selector);  //useridの取得
  let productsInCart = getProductsInCart(selector);  //card内情報の取得

  useEffect(() => {
    const unsubscribe = db.collection('users').doc(uid).collection('cart')  //userのcardの情報を取得して定数に
      .onSnapshot(snapshots => {
        snapshots.docChanges().forEach(change => {
          const product = change.doc.data();  //変更を加えるカート内の情報を取得
          const changeType = change.type;  //added、modified、removeのタイプを変数に
          switch (changeType) {
            case 'added':  //追加したとき
              productsInCart.push(product)  //pushで追加
              break;
            case 'modified':  //変更されたとき
              const index = productsInCart.findIndex(product => product.id === change.doc.id)  //productsincartの中で何番目のproductが変更されるのか特定
              productsInCart[index] = product  //特定したらそれを上書き
            case 'removed':  //削除するとき
              productsInCart = productsInCart.filter(product => product.cartId !== change.doc.id)  //削除するproductIdと一致しないものを抽出、新たに配列を作成
              break;
            default:
              break;
          }
        })
        dispatch(fetchProductsInCart(productsInCart))  //usersのカート情報を更新する、変更が加わったproductsincartを引数で渡す
      })
      return () => unsubscribe()  //クリーンアップ関数に最初に設定した定数を入れてリスナーを解除するようにしないと、リスナーが増え続けてしまうため記述
  }, []);

  return (
    <>
    {userRole === 'customer' && (
      <>
        <IconButton onClick={() => dispatch(push('/cart'))}>
          <Badge badgeContent={productsInCart.length} color="secondary">  {/* カート数字表示 */}
            <ShoppingCartIcon className={classes.menuIcon} />
          </Badge>
        </IconButton>
        <IconButton onClick={() => dispatch(push('/like'))}>
          <FavoriteBorderIcon className={classes.menuIcon} />
        </IconButton>
      </>
    )}
      <IconButton onClick={(event) => props.handleDrawerToggle(event)}>
        <MenuIcon className={classes.menuIcon} />
      </IconButton>
    </>
  )
};

export default HeaderMenu