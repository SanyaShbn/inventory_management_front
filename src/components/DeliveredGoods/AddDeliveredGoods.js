import React, { useState, useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Stack from '@mui/material/Stack';
import '../../CSS/table.css';
import { useValue } from '../../context/ContextProvider';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import FormControl from '@mui/material/FormControl';
import { SERVER_URL } from '../../constants.js';
import { NumberInput } from '../../constants';

function AddDeliveredGoods(props){
  const [open, setOpen] = useState(false);
  const [deliveredGoods, setDeliveredGoods] = useState({
    productName: '', quantity: '', deliveryDate: '', vendor: '', supplyOrder: ''
  });

  const {
    dispatch,
  } = useValue();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleDeliveredGoodsChange = (event) => {
    setDeliveredGoods({...deliveredGoods, [event.target.name]: event.target.value})
  };

  const handleClose = () => {
    setOpen(false)
    setDeliveredGoods({
        productName: '', quantity: '', deliveryDate: '', vendor: '', supplyOrder: ''
    })
  };

  const handleSave = () => {
    props.addDeliveredGoods(deliveredGoods);
    handleClose();
  }

  return (
    <div>
    <Button className="shine-button" variant="contained" onClick={handleClickOpen}>
      Добавить информацию
    </Button>
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle className='dialog'>Новая информация о доставленных товарах</DialogTitle>
      <DialogContent className='dialog'>
        <Stack spacing={2} mt={1}>
        <TextField label="Наименование товара" name="productName" autoFocus
            variant="standard" value={deliveredGoods.productName} required
            onChange={handleDeliveredGoodsChange}/>
        <TextField label="Количество (шт.)" name="quantity" autoFocus
            variant="standard" value={deliveredGoods.quantity} required
            onChange={handleDeliveredGoodsChange}/>
        <TextField type="date" label="Дата приемки товара" name="deliveryDate" autoFocus
            variant="standard" value={deliveredGoods.deliveryDate} required
            onChange={handleDeliveredGoodsChange} InputProps={{
                inputProps: {
                  inputMode: 'numeric',
                },
                startAdornment: (
                  <InputAdornment position="start"> </InputAdornment>
                ),
            }}/>
        <TextField label="Поставщик" name="vendor" autoFocus
            variant="standard" value={deliveredGoods.vendor} required
            onChange={handleDeliveredGoodsChange}/>
        <TextField label="Договор на поставку" name="supplyOrder" autoFocus
            variant="standard" value={deliveredGoods.supplyOrder} required
            onChange={handleDeliveredGoodsChange} inputProps={{ style: { minWidth: '300px' } }}/>
        </Stack>
      </DialogContent>
      <DialogActions>
         <Button onClick={handleClose}>Отмена</Button>
         <Button /*</DialogActions>onClick={handleSave}*/>Добавить</Button>
      </DialogActions>
    </Dialog>            
  </div>
  );
}

export default AddDeliveredGoods;