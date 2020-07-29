import React, { useEffect } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { getIsSignedIn } from './reducks/users/selectors';
import { listenAuthState } from './reducks/users/operations';

//childrenはauthコンポーネント以下のコンポーネントを指す
const Auth = ({children}) => {
  const dispatch = useDispatch();
  const selector = useSelector((state) => state);
  const isSignedIn = getIsSignedIn(selector);  //userがサインインしてるかのstate

  //Didmount時
  useEffect(() => {
    if (!isSignedIn) {
      dispatch(listenAuthState())  //サインインしていなければauth認証
    }
  }, []);

  if (!isSignedIn) {
    return <></>  //サインインしていないとき
  } else {
    return children  //サインインしているとき
  }
}

export default Auth