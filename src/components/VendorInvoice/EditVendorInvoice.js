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

function EditVendorInvoice(props) {

  const [open, setOpen] = useState(false);
  const [vendorInvoice, setVendorInvoice] = useState({
    date: '', amount: '', vendor: ''
  });

  const {
    dispatch,
  } = useValue();

  const handleVendorInvoiceChange = (event) => {
    setVendorInvoice({...vendorInvoice, [event.target.name]: event.target.value})
  };

  const handleClickOpen = () => {  
    setVendorInvoice({
        date: props.data.row.date,
        amount: props.data.row.amount, 
        vendor: props.data.row.vendor
       })
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
    props.updateVendorInvoice(vendorInvoice, props.data.id)
    handleClose();
  }

  return(
    <div>
      <IconButton onClick={handleClickOpen}>
        <EditIcon color="primary" />
      </IconButton>
      <Dialog open={open} onClose={handleClose}>
          <DialogTitle className='dialog'>Обновление информации о счетах поставщиков</DialogTitle>
        <DialogContent className='dialog'>
        <Stack spacing={2} mt={1}>
        <TextField label="Дата выставления счета" name="date" autoFocus
            variant="standard" value={vendorInvoice.date} required
            onChange={handleVendorInvoiceChange}/>
        <TextField label="Сумма (бел. руб.)" name="amount" autoFocus
            variant="standard" value={vendorInvoice.amount} required
            onChange={handleVendorInvoiceChange}/>
        <TextField label="Поставщик" name="vendor" autoFocus
            variant="standard" value={vendorInvoice.vendor} required
            onChange={handleVendorInvoiceChange} inputProps={{ style: { minWidth: '300px' } }}/>
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

export default EditVendorInvoice;