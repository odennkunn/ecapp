import React, { useState, useCallback } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { useSelector, useDispatch } from 'react-redux';
import {getIsSignedIn} from '../../reducks/users/selectors';
import { push } from 'connected-react-router';
import {HeaderMenu, ClosableDrawer} from './index';

const useStyles = makeStyles({
  root: {
    flexGrow: 1
  },
  menuBar: {
    backgroundColor: '#323232',
    color: '#fff',
    boxShadow: 'none'
  },
  toolBar: {
    margin: '0 auto',
    maxWidth: 1024,
    width: '100%'
  },
  iconButtons: {
    margin: '0 0 0 auto'
  },
  logo: {
    fontSize: '1.5rem',
    cursor: 'pointer'
  }
});

const Header = () => {

  const classes = useStyles();
  const selector = useSelector((state) => state);
  const isSignedIn = getIsSignedIn(selector);  //ログイン状態の条件分岐でロゴ表示を変えるため使用
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);  //drawerメニュー開閉のstate宣言

  //drawerメニュー開閉
  const handleDrawerToggle = useCallback((event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {  //キーダウン、shift、tab以外の操作であればドロワーのstateを反転
      return;
    }
    setOpen(!open)
  }, [setOpen, open])

  return (
    <div className={classes.root} >
      <AppBar position="fixed" className={classes.menuBar}>
        <Toolbar className={classes.toolBar}>
          <p width="128px" className={classes.logo} onClick={() => dispatch(push('/'))}>LOGO</p>
          {isSignedIn && (
            <div className={classes.iconButtons}>
              <HeaderMenu handleDrawerToggle={handleDrawerToggle} />
            </div>
          )}
        </Toolbar>
      </AppBar>
      <ClosableDrawer open={open} onClose={handleDrawerToggle} />
    </div>
  )
}

export default Header