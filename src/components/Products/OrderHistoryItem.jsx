import React from 'react'
import Divider from '@material-ui/core/Divider'
import {TextDetail} from '../UIkit'
import {OrderedProducts} from './index'

//日付表示の設定
const datetimeToString = (date) => {
  return date.getFullYear() + '-'
    + ('00' + (date.getMonth() + 1)).slice(-2) + '-'
    + ('00' + date.getDate()).slice(-2) + ''
    + ('00' + date.getHours()).slice(-2)+ ':'
    + ('00' + date.getMinutes()).slice(-2) + ':'
    + ('00' + date.getSeconds()).slice(-2)
}

const dateToString = (date) => {
  return date.getFullYear() + '-'
  + ('00' + (date.getMonth() + 1)).slice(-2) + '-'
  + ('00' + date.getDate()).slice(-2)
}

const OrderHistoryItem = (props) => {

  const order = props.order;  //注文した商品の情報を定数に
  const price = '¥' + order.amount.toLocaleString();
  const orderedDatetime = datetimeToString(order.updated_at.toDate());  //timestamp型のものを日付型にして関数に渡す、その結果を定数に
  const shippingDate = dateToString(order.shipping_date.toDate());  //timestamp型のものを日付型にして関数に渡す、その結果を定数に

  return (
    <div>
      <div className="module-spacer--small" />
      <TextDetail label={'注文ID'} value={order.id} />
      <TextDetail label={'注文日時'} value={orderedDatetime} />
      <TextDetail label={'発送予定日'} value={shippingDate} />
      <TextDetail label={'注文金額'} value={price} />
      {order.products.length > 0 && (
        <OrderedProducts products={order.products} />
      )}
      <div className="module-spacer--extra--extra--small" />
      <Divider />
    </div>
  )
}

export default OrderHistoryItem