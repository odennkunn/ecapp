import React, { useCallback } from 'react';
import {getUserLikes} from '../reducks/users/selectors';
import {ProductCard} from '../components/Products/';
import { useSelector, useDispatch } from 'react-redux';
import { push } from 'connected-react-router';
import {GreyButton} from '../components/UIkit';

const LikeList = () => {

  const dispatch = useDispatch();
  const selector = useSelector((state) => state); //storeのstate全体
  const likes = getUserLikes(selector);

  //ホーム画面に戻る関数
  const backToHome = useCallback(() => {
    dispatch(push('/'))
  }, []);


  return (
    <section className="c-section-wrapin">
      <h2 className="list-h">お気に入り商品</h2>
        {likes.length > 0 ? (  //商品が一つ以上登録されているとき
          <div className="p-grid__row">
            {likes.map(product => (  //mapで商品一つ一つを回して、productcardに渡す
              <ProductCard
                key={product.LikesId} id={product.productId} name={product.name}
                images={product.images} price={product.price}
              />
            ))}
          </div>
        ) : (
          <>
            <p className="center">お気に入りした商品はありません</p>
            <div className="p-grid__column">
              <div className="back-gray">
                <GreyButton label={"ショッピングを続ける"} onClick={backToHome} />
              </div>
            </div>
          </>
        )}
    </section>
  )
}

export default LikeList