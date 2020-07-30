import React, {useCallback, useState} from 'react';
import {TextInput, PrimaryButton} from '../components/UIkit';  //コンポーネント
import {signIn} from '../reducks/users/operations';  //signin関数
import {useDispatch} from 'react-redux';
import {push} from 'connected-react-router';
import PersonIcon from '@material-ui/icons/Person';

const SignIn = () => {

  const dispatch = useDispatch();

  //入力されたemailとpasswordを取得
  const [email, setEmail] = useState(""),
        [password, setPassword] = useState("");

  const inputEmail = useCallback((event) => {
    setEmail(event.target.value)
  }, [setEmail])

  const inputPassword = useCallback((event) => {
    setPassword(event.target.value)
  }, [setPassword])

  return (
    <div className="c-section-gray">
      <div className="c-section-container">
        <h2 className="u-text__headline u-text-center">ログイン</h2>
        <div className="module-spacer--medium" />
        <TextInput
          fullWidth={true} label={'メールアドレス'} multiline={false} required={true}
          rows={1} value={email} type={'email'} onChange={inputEmail}
        />
        <TextInput
          fullWidth={true} label={'パスワード'} multiline={false} required={true}
          rows={1} value={password} type={'password'} onChange={inputPassword}
        />
        <div className="module-spacer--medium" />
        <div className="center">
          <PrimaryButton
            label={'ログイン'}
            onClick={() => dispatch(signIn(email, password))}
          />
          {/* emailとpasswordを引数で渡してsignin関数へ*/}
          <div className="module-spacer--medium" />
          <p className="text-pointer" onClick={() => dispatch(push('/signup'))}>アカウントをお持ちでない方はこちら</p>
          <p className="text-pointer" onClick={() => dispatch(push('/signin/reset'))}>パスワードを忘れた方はこちら</p>
        </div>
      </div>
    </div>
  )
}

export default SignIn