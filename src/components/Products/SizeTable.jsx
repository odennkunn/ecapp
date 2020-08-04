import React from 'react';
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import IconButton from "@material-ui/core/IconButton";
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import {makeStyles} from "@material-ui/styles";

const useStyles = makeStyles({
  iconCell: {
    height: 48,
    width: 48,
    padding: 0
  }
});

const SizeTable = (props) => {

  const classes = useStyles();
  const sizes = props.sizes;

  return (
    <TableContainer>
      <Table>
        <TableBody>
          {sizes.length > 0 && (   //サイズ登録があれば
            sizes.map(size => (
              <TableRow key={size.size}>
                <TableCell component='th' scope='row'>
                  {size.size}
                </TableCell>
                <TableCell>
                  残り{size.quantity}点
                </TableCell>
                <TableCell className={classes.iconCell}>
                  {size.quantity > 0 ? (  //商品の残りの数量で条件分岐
                    <IconButton onClick={() => props.addProduct(size.size)}>
                      <ShoppingCartIcon />
                    </IconButton>
                  ) : (
                    <div className="sold">売り切れ</div>
                  )}
                </TableCell>
                <TableCell className={classes.iconCell}>
                  <IconButton>
                    <FavoriteBorderIcon/>
                  </IconButton>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default SizeTable