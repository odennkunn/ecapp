import React, { useState } from 'react';
import Swiper from 'react-id-swiper';
import NoImage from '../../assets/img/no_image.png'
import 'swiper/css/swiper.css';

//swiperのオプション設定など
const ImageSwiper = (props) => {
  const [params] = useState({
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',  //スライドのドット表示の有無
      clickable: true,  //ドットクリックでスライドするか
      dynamicBullets: true  //選択中のドット大きくなる
    },
    //前後矢印表示
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    },
    loop: true  //無限にスライドさせる
  });

  const images = props.images

  return (
    <Swiper {...params} >
      {images.length === 0 ? (  //画像がなかったら
        <div className="p-media__thumb">
          <img src={NoImage} alt="no image"/>
        </div>
      ) : (
        images.map(image => (
          <div className="p-media__thumb">
            <img src={image.path} alt="商品画像" />
          </div>
        ))
      )}
    </Swiper>
  )
};

export default ImageSwiper