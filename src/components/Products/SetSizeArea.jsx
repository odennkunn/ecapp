import React, { useState, useCallback, useMemo} from 'react';
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from "@material-ui/core/IconButton";
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import {TextInput} from "../UIkit";
import {makeStyles} from "@material-ui/styles";

const useStyles = makeStyles({
  checkIcon: {
    float: 'right'
  },
  iconCell: {
    height: 48,
    width: 48
  }
})

const SetSizeArea = (props) => {

  const classes = useStyles();

  //入力する値のstateの宣言
  const [index, setIndex] = useState(0),
        [size, setSize] = useState(""),
        [quantity, setQuantity] = useState(0);

  //usecallbackを使ってパフォーマンス向上
  const inputSize = useCallback((event) => {
    setSize(event.target.value)
  }, [setSize]);

  const inputQuantity = useCallback((event) => {
    setQuantity(event.target.value)
  }, [setQuantity]);

  //追加時の関数
  const addSize = (index, size, quantity) => {
    if (size === "" || quantity === "") {
      //必須項目のバリデーション,空だったらfalse
      return false
    } else {
      if (index === props.sizes.length) {  //新しく追加するときはindexの値とlengthの値は同じになる
        props.setSizes(prevState => [...prevState, {size: size, quantity: quantity}])  //配列に要素を追加
        setIndex(index+1)//カウントアップ
        setSize("")  //次も追加できるように初期値に戻す
        setQuantity(0)
      } else {
        const newSizes = props.sizes
        newSizes[index] = {size: size, quantity: quantity}  //選択したindexのsizeなどの値を更新
        props.setSizes(newSizes)  //まるっと配列を更新
        setIndex(newSizes.length)
        setSize("")
        setQuantity(0)
      }
    }
  }

  //編集
  const editSize = (index, size, quantity) => {
    setIndex(index)
    setSize(size)
    setQuantity(quantity)
  }

  //削除関数
  const deleteSize = (deleteindex) => {
    const newSizes = props.sizes.filter((item, i) => i !== deleteindex);  //選択した行以外の部分を抽出
    props.setSizes(newSizes) //選択した行以外をset
  }


  const memoIndex = useMemo(() => {
    setIndex(props.sizes.length)
  }, [props.sizes.length]);

  return (
    <div>
      <TableContainer component={Paper} >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>サイズ</TableCell>
              <TableCell>数量</TableCell>
              <TableCell className={classes.iconCell} />
              <TableCell className={classes.iconCell} />
            </TableRow>
          </TableHead>
          <TableBody>
            {props.sizes.length > 0 && (
              props.sizes.map((item, i) => (
                <TableRow key={item.size}>
                  <TableCell>{item.size}</TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell>
                    <IconButton className={classes.IconCell} onClick={() => editSize(i, item.size, item.quantity)}>
                      <EditIcon />
                    </IconButton>
                  </TableCell>
                  <TableCell>
                    <IconButton className={classes.IconCell} onClick={() => deleteSize(i)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
        <div>
          <TextInput
            fullWidth={false} label={'サイズ'} multiline={false} required={true}
            onChange={inputSize} rows={1} value={size} type={'text'}
          />
          <TextInput
            fullWidth={false} label={'数量'} multiline={false} required={true}
            onChange={inputQuantity} rows={1} value={quantity} type={'number'}
          />
        </div>
        <IconButton className={classes.checkIcon} onClick={() => addSize(index, size, quantity)}>
          <CheckCircleIcon />
        </IconButton>
      </TableContainer>
    </div>
  )
}

export default SetSizeArea