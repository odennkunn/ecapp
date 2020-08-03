import React, { useEffect } from 'react';
import {ProductCard} from '../components/Products/';
import { useDispatch, useSelector } from 'react-redux';
import {fetchProducts} from '../reducks/products/operations';
import {getProducts} from '../reducks/products/selectors';

const ProductList = () => {

  const dispatch = useDispatch();
  const selector = useSelector((state) => state); //storeのstate全体
  const products = getProducts(selector);  //productsの情報を定数に

  const query = selector.router.location.search;  //urlのクエリ部分を定数に
  const gender = /^\?gender=/.test(query) ? query.split('?gender=')[1] : "";  //クエリ部分が正規表現とマッチするか検証、検証後=の後の部分を定数に
  const category = /^\?category=/.test(query) ? query.split('?category=')[1] : "";

  useEffect(() => {
    dispatch(fetchProducts(gender, category))
  }, [query]);

  return (
    <section className="c-section-wrapin">
      <h2 className="list-h">新着商品</h2>
      <div className="p-grid__row">
        {products.length > 0 && (  //商品が一つ以上登録されているとき
          products.map(product => (  //mapで商品一つ一つを回して、productcardに渡す
            <ProductCard
              key={product.id} id={product.id} name={product.name}
              images={product.images} price={product.price}
            />
          ))
        )}
      </div>
    </section>
  )
}

export default ProductList