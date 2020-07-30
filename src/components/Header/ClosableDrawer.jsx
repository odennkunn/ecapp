import React, { useState, useCallback } from 'react';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import {makeStyles} from '@material-ui/core/styles';
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import AddCircleIcon from '@material-ui/icons/AddCircle';
import HistoryIcon from '@material-ui/icons/History';
import PersonIcon from '@material-ui/icons/Person';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import {TextInput} from "../UIkit";
import { push } from 'connected-react-router';
import { useDispatch, useSelector } from 'react-redux';
import {signOut} from '../../reducks/users/operations';
import { useEffect } from 'react';
import { db } from '../../firebase';
import { getUserRole } from '../../reducks/users/selectors';

const useStyles = makeStyles((theme) => ({
  drawer: {
    [theme.breakpoints.up('sm')]: {
      flexShrink: 0,
      width: 256
    }
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: 256
  },
  searchField: {
    alignItems: 'center',
    display: 'flex',
    marginLeft: 32
  }
}));

const ClosableDrawer = (props) => {

  const classes = useStyles();
  const selector = useSelector((state) => state);
  const userRole = getUserRole(selector);
  const {container} = props;
  const dispatch = useDispatch();

  const [keyword, setKeyword] = useState('');  //検索ワード部分のstate宣言

  const inputKeyword = useCallback((event) => {  //パフォーマンス向上
    setKeyword(event.target.value)
  }, [setKeyword]);

  //ドロワーメニュー内のアイテムを選択した際の関数
  const selectMenu = (event, path) => {
    dispatch(push(path));  //クリックした際にページ遷移
    props.onClose(event)  //メニュー閉じる
  }

  const [filters, setFilters] = useState([
    {func: selectMenu, label: 'すべて', id: 'all', value: '/'},
    {func: selectMenu, label: 'メンズ', id: 'male', value: '/?gender=male'},
    {func: selectMenu, label: 'レディース', id: 'female', value: '/?gender=female'}
  ])

  //カテゴリー表示
  useEffect(() => {
    db.collection('categories')
      .orderBy('order', 'asc')
      .get()
      .then(snapshots => {
        const list = []
        snapshots.forEach(snapshot => {
          const category = snapshot.data()
          list.push({func: selectMenu, label: category.name, id: category.id, value: `/?category=${category.id}`})
        })
        setFilters(prevState => [...prevState, ...list])  //上で記述してあるものとlistを合わせたものをset
      })
  }, [])

  return (
    <nav className={classes.drawer}>
      <Drawer
        container={container} variant="temporary"
        anchor="right" open={props.open}
        onClose={(e) => props.onClose(e)}
        classes={{paper: classes.drawerPaper}}
        ModalProps={{keepMounted: true}}
      >
        <div
          onClose={(e) => props.onClose(e)}
          onKeyDown={(e) => props.onClose(e)}
        >
          <div className={classes.searchField}>
            <TextInput
              fullWidth={false} label={'キーワードを検索'}　multiline={false}
              onChange={inputKeyword} required={false} rows={1}　value={keyword} type={'text'}
            />
            <IconButton >
              <SearchIcon />
            </IconButton>
          </div>
          <Divider />
          <List>
            {userRole === 'customer' ? (
              <ListItem button key='history' onClick={() => dispatch(push('/order/history'))}>
                <ListItemIcon>
                  <HistoryIcon />
                </ListItemIcon>
                <ListItemText primary={'注文履歴'} />
              </ListItem>
            ) : (
              <ListItem button key='register' onClick={() => dispatch(push('/product/edit'))}>
                <ListItemIcon>
                  <AddCircleIcon />
                </ListItemIcon>
                <ListItemText primary={'商品登録'} />
              </ListItem>
            )}
            <ListItem button key='profile' onClick={() => console.log(userRole)}>
              <ListItemIcon>
                <PersonIcon />
              </ListItemIcon>
              <ListItemText primary={'プロフィール'} />
            </ListItem>
            <ListItem button key='logout' onClick={() => dispatch(signOut())}>
              <ListItemIcon>
                <ExitToAppIcon />
              </ListItemIcon>
              <ListItemText primary={'ログアウト'} />
            </ListItem>
          </List>
          <Divider/>
          <List>
            {filters.map(filter => (
              <ListItem button key={filter.id} onClick={(e) => filter.func(e, filter.value)}>
                <ListItemText primary={filter.label} />
              </ListItem>
            ))}
          </List>
        </div>
      </Drawer>
    </nav>
  )
}

export default ClosableDrawer