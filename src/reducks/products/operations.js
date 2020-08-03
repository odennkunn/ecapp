import {FirebaseTimestamp, db} from '../../firebase';
import {push} from 'connected-react-router';
import {deleteProductAction, fetchProductsAction} from './actions';


const productsRef = db.collection('products')  //dbのproductsのデータ全体

//一覧表示の関数
export const fetchProducts = (gender, category) => {
  return async (dispatch) => {
    let query = productsRef.orderBy('updated_at', 'desc');
        query = (gender !== "") ? query.where('gender', '==', gender) : query;  //genderに値が入っていれば、queryに持っているgenderと同じクエリを返す条件分を加える
        query = (category !== "") ? query.where('category', '==', category) : query;

      query.get()  //productからデータを取得、並び替え
        .then(snapshots => {
          const productList = []  //配列を用意
          snapshots.forEach(snapshot => {
            const product = snapshot.data();  //定数にデータ一つ一つを入れる
            productList.push(product) //配列型で返す
          })
          dispatch(fetchProductsAction(productList))
      })
  }
}

//商品削除
export const deleteProduct = (id) => {
  return async(dispatch, getState) => {
    productsRef.doc(id).delete()  //選択した商品をdbから削除
      .then(() => {
        const prevProducts = getState().products.list;  //現在のproductsの配列の情報を定数に
        const nextProducts = prevProducts.filter(product => product.id !== id)  //選択したidと一致しないすべての商品(削除しない商品)を定数に
        dispatch(deleteProductAction(nextProducts))
      })
  }
}

//商品登録
export const saveProduct = (id, name, description, category, gender, price, images, sizes) => {
  return async (dispatch) => {

    if (name === "" || description === "" || category === "" || gender === "" || price === "" || sizes === "") {
      alert('必須項目が未入力です')
      return false
    }

    const timestamp = FirebaseTimestamp.now()

    //firestoreに格納するデータの宣言
    const data = {
      category: category,
      description: description,
      gender: gender,
      name: name,
      images: images,
      price: parseInt(price, 10),  //数値型10真数に変換
      sizes: sizes,
      updated_at: timestamp
    }

    //新規登録時のみ
    if (id === "") {
      const ref = productsRef.doc()
       id = ref.id  //自動採番したidを定数に
      data.id = id  //idを追加
      data.created_at = timestamp  //created_atを追加
    }

    //自動採番されたidにそってデータを登録
    return productsRef.doc(id).set(data, {merge: true})  //merge trueを指定することで変更点があった部分のみを上書きする形になる
      .then(() => {
        alert('商品の登録が完了しました。')
        dispatch(push('/'))
      }).catch((error) => {
        throw new Error(error)
      })
  }
}

//注文処理
export const orderProduct = (productsInCart, amount) => {
  return async (dispatch, getState) => {
    const uid = getState().users.uid;  //useridの取得
    const userRef = db.collection('users').doc(uid);  //user情報の取得
    const timestamp = FirebaseTimestamp.now();  //現在の時間の「取得

    let products = [],
        soldOutProducts = [];

    //firebaseトランザクション、バッジ宣言
    const batch = db.batch();

    for (const product of productsInCart) {  //カート内情報を定数に
      const snapshot = await productsRef.doc(product.productId).get();  //カート内の商品一つ一つのidを元に情報取得
      const sizes = snapshot.data().sizes;  //一つの商品のサイズデータだけ取得

      //購入した商品の在庫数を減らす
      const updatedSizes = sizes.map(size => {
        if (size.size === product.size) {
          if (size.quantity === 0) {  //在庫が0だったとき
            soldOutProducts.push(product.name);
            return size
          }
          return {  //在庫があった場合
            size: size.size,  //変更なし
            quantity: size.quantity - 1　　//量を減らす
          }
        } else {
          return size
        }
      });

      //上で定義した定数に情報を入れる
      products.push({
        id: product.productId,
        images: product.images,
        name: product.name,
        price: product.price,
        size: product.size
      });

      //数量の変更を実行
      batch.update(
        productsRef.doc(product.productId),
        {sizes: updatedSizes}
      );

      //買った商品はカート内から削除
      batch.delete(
        userRef.collection('cart').doc(product.cartId)
      )
    }

    //商品在庫がない場合の処理
    if (soldOutProducts.length > 0) {
      const errorMessage = (soldOutProducts.length > 1) ?  //在庫切れの商品が複数だったら
                            soldOutProducts.join('と') :
                            soldOutProducts[0];
      alert('大変申し訳ありません。' + errorMessage + 'が在庫切れとなったため、注文処理を中断しました。')
      return false
    } else {  //在庫があり注文処理ができるとき
      batch.commit()
        .then(() => {
          const orderRef = userRef.collection('orders').doc();//新たにuserのサブコレクションを作成
          const date = timestamp.toDate()  //タイムスタンプから今日の日付を取得
          const shippingDate = FirebaseTimestamp.fromDate(new Date(date.setDate(date.getDate() + 3)))  //今日の日付から三日間足した値

          //定数に注文した情報を入れる
          const history = {
            amount: amount,
            created_at: timestamp,
            id: orderRef.id,
            products: products,
            shipping_date: shippingDate,
            updated_at: timestamp
          }

          orderRef.set(history)  //上で作成したサブコレクションにデータを入れる

          alert('注文が完了しました。')
          dispatch(push('/order/complete'))

        }).catch(() => {
          alert('注文処理に失敗しました。通信環境確認の上、もう一度お試しください。')
          return false
        })
    }
  }
}