import React, {useCallback, useState} from 'react';
import {TextInput, PrimaryButton} from '../components/UIkit';  //コンポーネント
import {resetPassword} from '../reducks/users/operations';  //パスワードリセット関数
import {useDispatch} from 'react-redux';
import {push} from 'connected-react-router';

const Reset = () => {

  const dispatch = useDispatch();

  const [email, setEmail] = useState("");

  //入力された値を取得
  const inputEmail = useCallback((event) => {
    setEmail(event.target.value)
  }, [setEmail])

  return (
    <div className="c-section-gray">
      <div className="c-section-container">
        <h2 className="u-text__headline u-text-center">パスワードのリセット</h2>
        <div className="module-spacer--medium" />
        <TextInput
          fullWidth={true} label={'メールアドレス'} multiline={false} required={true}
          rows={1} value={email} type={'email'} onChange={inputEmail}
        />
        <div className="module-spacer--medium" />
        <div className="center">
          <PrimaryButton
            label={'パスワードをリセットする'}
            onClick={() => dispatch(resetPassword(email))}
          />  {/* 引数にemailを渡してoperationsの関数へ */}
          <div className="module-spacer--medium" />
          <p className="text-pointer" onClick={() => dispatch(push('/signin'))}>ログイン画面に戻る</p>
        </div>
      </div>
    </div>
  )
}

export default Reset