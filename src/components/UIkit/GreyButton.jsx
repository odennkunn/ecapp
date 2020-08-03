import React from 'react';
import Button from '@material-ui/core/Button';
import {makeStyles} from '@material-ui/styles';

//style変更のためのclass作成
const useStyles = makeStyles((theme) => ({
  'button': {
    backgroundColor: '#2490D0',
    fontSize: 16,
    height: 48,
    marginBottom: 16,
    width: 256,
    color: '#fff'
  }
}))

const GreyButton = (props) => {

  const classes = useStyles();

  return (
    <Button className={classes.button} variant="contained" onClick={() => props.onClick()}>
      {props.label}
    </Button>
  )
}

export default GreyButton