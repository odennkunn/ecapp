import React, {useCallback, useState} from 'react';
import {TextInput, PrimaryButton, SelectBox} from '../components/UIkit';  //コンポーネント
import {signUp} from '../reducks/users/operations';  //signup関数
import {useDispatch} from 'react-redux';
import {push} from 'connected-react-router';


const SignUp = () => {

  const dispatch = useDispatch()

  //入力された値を取得
  const [username, setUsername] = useState(""),
        [email, setEmail] = useState(""),
        [password, setPassword] = useState(""),
        [confirmPassword, setConfirmPassword] = useState(""),
        [role, setRole] = useState("");

  const inputUsername = useCallback((event) => {
    setUsername(event.target.value)
  }, [setUsername])

  const inputEmail = useCallback((event) => {
    setEmail(event.target.value)
  }, [setEmail])

  const inputPassword = useCallback((event) => {
    setPassword(event.target.value)
  }, [setPassword])

  const inputConfirmPassword = useCallback((event) => {
    setConfirmPassword(event.target.value)
  }, [setConfirmPassword])

  const roles = [
    {id: 'customer', name: 'ユーザー'},
    {id: 'shop', name: 'ショップ'},
  ];

  return (
    <div className="c-section-gray">
      <div className="c-section-container">
        <h2 className="u-text__headline u-text-center">アカウント登録</h2>
        <div className="module-spacer--medium" />
        <TextInput
          fullWidth={true} label={'ユーザー名'} multiline={false} required={true}
          rows={1} value={username} type={'text'} onChange={inputUsername}
        />
        <div className="module-spacer--extra-small"/>
        <TextInput
          fullWidth={true} label={'メールアドレス'} multiline={false} required={true}
          rows={1} value={email} type={'email'} onChange={inputEmail}
        />
        <div className="module-spacer--extra-small"/>
        <TextInput
          fullWidth={true} label={'パスワード'} multiline={false} required={true}
          rows={1} value={password} type={'password'} onChange={inputPassword}
        />
        <div className="module-spacer--extra-small"/>
        <TextInput
          fullWidth={true} label={'パスワード(再確認)'} multiline={false} required={true}
          rows={1} value={confirmPassword} type={'password'} onChange={inputConfirmPassword}
        />
        <div className="module-spacer--extra-small"/>
        <SelectBox
          label={'どちらで利用するか'} required={true} options={roles} select={setRole} value={role}
        />
        <div className="module-spacer--medium" />
        <div className="center">
          <PrimaryButton
            label={'アカウントを作成する'}
            onClick={() => dispatch(signUp(username, email, password, confirmPassword, role))}
          />
          {/* 入力された値を引数で渡してsignup関数 */}
          <div className="module-spacer--medium" />
          <p  className="text-pointer" onClick={() => dispatch(push('/signin'))}>アカウントをお持ちの方はこちら</p>
        </div>
      </div>
    </div>
  )
}

export default SignUp