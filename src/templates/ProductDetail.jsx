import React, { useState, useEffect, useCallback} from 'react';
import { db, FirebaseTimestamp } from '../firebase';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/styles';
import HTMLReactParser from 'html-react-parser';
import {ImageSwiper, SizeTable} from '../components/Products';
import {addProductToCart} from '../reducks/users/operations';
import { getUserRole } from '../reducks/users/selectors';


const useStyles = makeStyles((theme) => ({
  sliderBox: {
    [theme.breakpoints.down('sm')]: {
      margin: '0 auto 24px auto',
      height: 320,
      width: 320
    },
    [theme.breakpoints.up('sm')]: {
      margin: '0 auto',
      height: 400,
      width: 400
    }
  },
  detail: {
    textAlign: 'left',
    [theme.breakpoints.down('sm')]: {
      margin: '0 auto 16px auto',
      height: 'auto',
      width: 320
    },
    [theme.breakpoints.up('sm')]: {
      margin: '0 auto',
      height: 'auto',
      width: 400
    }
  },
  price: {
    fontSize: 36
  }
}));

//reactで改行表示させる関数
const returnCodeToBr = (text) => {
  if (text === "") {
    return text
  } else {
    return HTMLReactParser(text.replace(/\r?\n/g, '<br/>'))
  }
};

const ProductDetail = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const selector = useSelector((state) => state);  //stateの情報を取得
  const userRole = getUserRole(selector);
  const path = selector.router.location.pathname;  // /prouduct/idの部分を定数に
  const id = path.split('/product/')[1];  //urlのidの部分だけを取得

  const [product, setProduct] = useState(null)

  useEffect(() => {
    db.collection('products').doc(id).get()  //dbからデータを取得
      .then(doc => {
        const data = doc.data();  //取得したデータを定数に
        setProduct(data)  //取得したデータを元にstateを更新
      })
  }, []);

  //商品をカートに追加したときstateを更新
  const addProduct = useCallback((selectedSize) => {
    const timestamp = FirebaseTimestamp.now();
    dispatch(addProductToCart({
      added_at: timestamp,
      description: product.description,
      gender: product.gender,
      images:　product.images,
      name: product.name,
      price: product.price,
      productId: product.id,
      quantity: 1,
      size: selectedSize
    }))
  }, [product]);

  return (
    <section className="c-section-wrapin">
      {product && (
        <div className="p-grid__row">
          <div className={classes.sliderBox}>
            <ImageSwiper images={product.images} />
          </div>
          <div className={classes.detail}>
            <h2 className="u-text__headline">{product.name}</h2>
            <p className={classes.price}>{product.price.toLocaleString()}</p>
            <div className="module-spacer--small" />
            {userRole === 'customer' && (
              <SizeTable sizes={product.sizes} addProduct={addProduct} />
            )}
            <div className="module-spacer--small" />
            <p>{returnCodeToBr(product.description)}</p>
          </div>
        </div>
      )}
    </section>
  )
}

export default ProductDetail
