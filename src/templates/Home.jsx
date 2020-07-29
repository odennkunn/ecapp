import React from 'react';
import {getUserId, getUsername} from '../reducks/users/selectors';
import { useSelector, useDispatch } from 'react-redux';
import {signOut} from '../reducks/users/operations'


const Home = () => {
  const dispatch = useDispatch()
  const selector = useSelector(state => state);  //storeからstateを参照できるように
  const uid = getUserId(selector)
  const username = getUsername(selector)  //.useridとusernameを定数に

  return (
    <div>
      <h2>Home</h2>
      <p>{uid}</p>
      <p>{username}</p>
      <button onClick={() => dispatch(signOut())}>サインアウト</button>
    </div>
  )
}

export default Home