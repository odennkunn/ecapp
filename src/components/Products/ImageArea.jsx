import React, { useCallback } from 'react';
import {storage} from "../../firebase/index"
import IconButton from '@material-ui/core/IconButton';
import AddPhotoAlternateIcon from '@material-ui/icons/AddPhotoAlternate';
import { makeStyles } from '@material-ui/core';
import ImagePreview from './ImagePreview';

const useStyles = makeStyles({
  icon: {
    height: 48,
    width: 48
  }
})


const ImageArea = (props) => {

  const classes = useStyles();

  //画像削除用
  const deleteImage = useCallback(async (id) => {
    const ret = window.confirm('この画像を削除しますか');
    //削除しないを選択したらfalseで戻る
    if (!ret) {
      return false
    //はいを選択したら
    } else {
      const newImages = props.images.filter(image => image.id !== id); //削除したい選択された画像idと一致しない画像のみを抽出し定数に
      props.setImages(newImages);  //stateを更新
      return storage.ref('image').child(id).delete()  //選択した画像をcloudstorageから削除
    }
  }, [props.images])

  //画像アップロード
  const uploadImage = useCallback((event) => {
    const file = event.target.files;  //登録された画像を定数に
    let blob = new Blob(file, { type: 'image/jpeg' }); //画像タイプを指定してblobを生成、定数に

    //ランダムな16文字の英数字を生成し、filenameに
    //firestore内で画像名が被るとエラーを起こすため
    const S = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    const N = 16;
    const fileName = Array.from(crypto.getRandomValues(new Uint32Array(N))).map((n)=>S[n%S.length]).join('')

    const uploadRef = storage.ref('images').child(fileName);  //storeのimageディレクトリを取得し定数に
    const uploadTask = uploadRef.put(blob);  //storeに保存

    //画像保存できたとき
    uploadTask.then(() => {
      uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {  //画像のURLが取得できたら
        const newImage = {id: fileName, path: downloadURL};  //画像にurlをセットし、表示できるように
        props.setImages((prevState => [...prevState, newImage]))  //画像を複数枚セットする場合
      });
    })
  }, [props.setImages]);  //props.setImagesの値が変更された場合のみこの関数が実行されることでパフォーマンス向上

  return (
    <div>
      <div className="p-grid__list-images">
        {props.images.length > 0 && (
          props.images.map(image => <ImagePreview id={image.id} path={image.path} key={image.id} delete={deleteImage} />)
        )}
      </div>
      <div className="u-text-right">
        <span>商品を登録する</span>
        <IconButton className={classes.icon}>
          <label>
            <AddPhotoAlternateIcon />
            <input
              className="u-display-none" type="file" id="image"
              onChange={(event) => uploadImage(event)}
            />
          </label>
        </IconButton>
      </div>
    </div>
  )
}

export default ImageArea