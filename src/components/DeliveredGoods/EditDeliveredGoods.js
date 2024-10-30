import React, { useState, useEffect } from 'react';
import { SERVER_URL } from '../../constants.js';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import { NumberInput } from '../../constants';
import { useValue } from '../../context/ContextProvider';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import FormControl from '@mui/material/FormControl';

function EditDeliveredGoods(props) {

  const [open, setOpen] = useState(false);
  const [deliveredGoods, setDeliveredGoods] = useState({
    productName: '', quantity: '', deliveryDate: '', vendor: '', supplyOrder: ''
});

  const {
    dispatch,
  } = useValue();

  const handleDeliveredGoodsChange = (event) => {
    setDeliveredGoods({...deliveredGoods, [event.target.name]: event.target.value})
  };

  const handleClickOpen = () => {  
    setDeliveredGoods({
        productName: props.data.row.productName,
        quantity: props.data.row.quantity, 
        deliveryDate: props.data.row.deliveryDate, 
        vendor: props.data.row.vendor,
        supplyOrder: props.data.row.supplyOrder
       })
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
    props.updateDeliveredGoods(deliveredGoods, props.data.id)
    handleClose();
  }

  return(
    <div>
      <IconButton onClick={handleClickOpen}>
        <EditIcon color="primary" />
      </IconButton>
      <Dialog open={open} onClose={handleClose}>
          <DialogTitle className='dialog'>Обновление информации о доставленных товарах</DialogTitle>
        <DialogContent className='dialog'>
        <Stack spacing={2} mt={1}>
        <TextField label="Наименование товара" name="productName" autoFocus
            variant="standard" value={deliveredGoods.productName} required
            onChange={handleDeliveredGoodsChange}/>
        <TextField label="Количество (шт.)" name="quantity" autoFocus
            variant="standard" value={deliveredGoods.quantity} required
            onChange={handleDeliveredGoodsChange}/>
        <TextField label="Дата приемки товара" name="deliveryDate" autoFocus
            variant="standard" value={deliveredGoods.deliveryDate} required
            onChange={handleDeliveredGoodsChange}/>
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
            <Button onClick={handleSave}>Сохранить</Button>
          </DialogActions>
        </Dialog>            
    </div>
  );  
}

export default EditDeliveredGoods;