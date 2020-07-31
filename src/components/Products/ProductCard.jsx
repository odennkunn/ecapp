import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import NoImage from '../../assets/img/no_image.png'
import {push} from 'connected-react-router';
import {useDispatch, useSelector} from 'react-redux';
import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import {deleteProduct} from '../../reducks/products/operations';
import { getUserRole } from '../../reducks/users/selectors';

const useStyles = makeStyles((theme) => ({
  root: {
    [theme.breakpoints.down('sm')]: {
      margin: 8,
      width: 'calc(50% - 16px)',
      cursor: 'pointer'
    },
    [theme.breakpoints.up('md')]: {
      margin: 16,
      width: 'calc(33.3333% - 32px)',
      cursor: 'pointer'
    }
  },
  content: {
    display: 'flex',
    padding: '16px 8px',
    textAlign: 'left',
    '&:last-child': {
      paddingBottom: 16
    }
  },
  media: {
    height: 0,
    paddingTop: '100%'
  },
  price: {
    color: '#323232',
    fontSize: 16
  }
}));


const ProductCard = (props) => {

  const classes = useStyles();
  const dispatch = useDispatch();
  const selector = useSelector((state) => state);
  const userRole = getUserRole(selector);

  const [anchorEl, setAnchorEl] = useState(null);  //メニュー開閉のstate 初期値はnullで閉じている

  const handleClick = (event) => {  //メニュー開閉 stateをnullから変更
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {  //メニュー開閉 stateをnullに変更
    setAnchorEl(null);
  };

  const images = (props.images.length > 0) ? props.images : [{path: NoImage}];
  const price = props.price.toLocaleString();  //db内のpriceは数値型なので3桁区切りにできるよう変換

  return (
    <Card className={classes.root}>
      <CardMedia
        image={images[0].path} className={classes.media}
        title="" onClick={() => dispatch(push('/product/' + props.id))}
      />
      <CardContent className={classes.content}>
        <div onClick={() => dispatch(push('/product/' + props.id))} >
          <Typography color="textSecondary" component="p">{props.name}</Typography>
          <Typography component="p" className={classes.price}>¥{price}</Typography>
        </div>
        {userRole === 'shop' && (
          <>
          <IconButton >
            <MoreVertIcon onClick={handleClick}/>
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem
              onClick={() => {
                dispatch(push('/product/edit' + props.id))  //編集ページへ
                handleClose()
              }}
            >
              編集する
            </MenuItem>
            <MenuItem
              onClick={() => {
                dispatch(deleteProduct(props.id))  //削除関数が動く
                handleClose()
              }}
            >
              削除する
            </MenuItem>
          </Menu>
          </>
        )}
      </CardContent>
    </Card>
  )
}

export default ProductCard