import {createSelector} from 'reselect';

//storeで管理しているstateを参照するための関数
const usersSelector = (state) => state.users;

export const getUserId = createSelector(
  [usersSelector],
  state => state.uid
)

export const getUsername = createSelector(
  [usersSelector],
  state => state.username
)

export const getIsSignedIn = createSelector(
  [usersSelector],
  state => state.isSignedIn
)

export const getProductsInCart = createSelector(
  [usersSelector],
  state => state.cart
)

export const getOrdersHistory = createSelector(
  [usersSelector],
  state => state.orders
)

export const getUserRole = createSelector(
  [usersSelector],
  state => state.role
)

export const getUserLikes = createSelector(
  [usersSelector],
  state => state.likes
)