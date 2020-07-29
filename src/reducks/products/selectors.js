import {createSelector} from 'reselect';

const productsSelector = (state) => state.products;

export const getProducts = createSelector( //productsのstateを参照できるように
  [productsSelector],
  state => state.list
)

