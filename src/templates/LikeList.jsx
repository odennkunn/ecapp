import React from 'react';
import {useSelector} from 'react-redux';
import {getUserLikes} from '../reducks/users/selectors';
import {ProductCard} from '../components/Products/';


const LikeList = () => {

  const selector = useSelector((state) => state); //storeのstate全体
  const likes = getUserLikes(selector);


  return (
    <section className="c-section-wrapin">
      <h2 className="list-h">お気に入り商品</h2>
      <div className="p-grid__row">
        {likes.length > 0 && (  //商品が一つ以上登録されているとき
          likes.map(product => (  //mapで商品一つ一つを回して、productcardに渡す
            <ProductCard
              key={product.LikesId} id={product.productId} name={product.name}
              images={product.images} price={product.price}
            />
          ))
        )}
      </div>
    </section>
  )
}

export default LikeList