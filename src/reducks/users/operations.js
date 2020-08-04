import {signInAction, signOutAction, fetchProductsInCartAction, fetchOrdersHistoryAction} from './actions';
import {push} from 'connected-react-router';
import {auth, FirebaseTimestamp, db} from '../../firebase/index';


//authをリッスンするための関数
export const listenAuthState = () => {
  return async (dispatch) => {
    return auth.onAuthStateChanged(user => {
      if (user) {
        const uid = user.uid

        db.collection('users').doc(uid).get()
          .then(snapshot => {
            const data = snapshot.data()

            dispatch(signInAction({
              isSignedIn: true,
              role: data.role,
              uid: uid,
              username: data.username
            }))
          })
      } else {
        dispatch(push('/signin'))
      }
    })
  }
}

//サインイン時
export const signIn = (email, password) => {
  return async(dispatch) => {
    //validation
    if (email === "" || password === "") {
      alert('必須項目が未入力です')
      return false
    }

    //firebaseメソッド
    auth.signInWithEmailAndPassword(email, password)
      .then(result => {
        const user = result.user //サインインするuserの情報を全て定数に

        if (user) { //userが存在していたら
          const uid = user.uid  //uidを定数に

          db.collection('users').doc(uid).get()
            .then(snapshot => {
              const data = snapshot.data()  //サインインするuserのデータを取得

              dispatch(signInAction({  //actionで変更
                isSignedIn: true,
                role: data.role,
                uid: uid,
                username: data.username
              }))

              dispatch(push('/'))  //ログイン後のページ遷移
            })
        }
      }).catch(() => {
        alert('サインインに失敗しました。もう一度登録アドレス、パスワードを確認の上お試しください。')
      })
  }
}

//アカウント作成
export const signUp = (username, email, password, confirmPassword, role) => {
  return async (dispatch) => {
    //validation
    if (username === "" || email === "" || password === "" || confirmPassword === "" || role === "") {
      alert('必須項目が未入力です')
      return false
    }

    if (password !== confirmPassword) {
      alert('確認用パスワードが一致しません。もう一度ご入力ください')
      return false
    }

    return auth.createUserWithEmailAndPassword(email, password)
      .then (result => {
        const user = result.user

        if (user) {
          const uid = user.uid
          const timestamp = FirebaseTimestamp.now()  //作成時のtimestampを定数に

          const userInitialData = {  //user作成時のデータ
            created_at: timestamp,
            email: email,
            role: role,
            uid: uid,
            updated_at: timestamp,
            username: username
          }

          db.collection('users').doc(uid).set(userInitialData)  //firestoreに保存
            .then(() => {
              alert('アカウントが作成できました!')
              dispatch(push('/'))  //作成後のページ遷移
            })
        }
      })
  }
}

//サインアウト
export const signOut = () => {
  return async (dispatch) => {
    auth.signOut()  //サインアウト
      .then(() => {
        dispatch(signOutAction());  //actionでサインインuserのstateを変更依頼
        dispatch(push('/signin'))  //上記アクション後のページ遷移
      })
  }
}


//パスワード忘れたとき
export const resetPassword = (email) => {
  return async (dispatch) => {
    //validation
    if (email === "") {
      alert('必須項目が未入力です')
      return false
    } else {
      //パスワード忘れたときのメソッド
      auth.sendPasswordResetEmail(email)
        .then(() => {
          alert('入力されたアドレスにパスワードリセット用のメールを送信しました。')
          dispatch(push('/signin'))  //ページ遷移
        }).catch(() => {  //通信環境が悪いなどの失敗時
          alert('パスワードリセットに失敗しました。')
        })
    }
  }
}

//商品カートに追加したときの関数
export const addProductToCart = (addedProduct) => {
  return async(dispatch, getState) => {
    const uid = getState().users.uid;  //useridを取得
    const userRole = getState().users.role;
    const cartRef = db.collection('users').doc(uid).collection('cart').doc()  //idを元に取得したuserの中のcartデータを取得
    if (userRole === 'customer') {
      addedProduct['cartId'] = cartRef.id;  //cartidをフィールドに持たせる
      await cartRef.set(addedProduct);
      alert('商品をカートに追加しました。')
      dispatch(push('/'))
    } else {
      return false
    }
  }
}

//cartの情報を更新する関数
export const fetchProductsInCart = (products) => {
  return async (dispatch, getState) => {
    const userRole = getState().users.role;
    if (userRole === 'customer') {
      dispatch(fetchProductsInCartAction(products))  //actionの呼び出し
    } else {
      return false
    }
  }
};

//注文履歴
export const fetchOrdersHistory = () => {
  return async (dispatch, getState) => {
    const uid = getState().users.uid;  //useridの取得
    const list = [];

    db.collection('users').doc(uid)
      .collection('orders')
      .orderBy('updated_at', 'desc')
      .get()  //userの中のordersコレクションを並び替えて取得
      .then((snapshots) => {
        snapshots.forEach(snapshot => {  //取得してきたデータを一つ一つ処理
          const data = snapshot.data()
          list.push(data)  //一つ一つのデータを配列に入れる
        })
        dispatch(fetchOrdersHistoryAction(list))
      })
  }
}