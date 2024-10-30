import React, { useState, useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import '../../CSS/table.css';
import { useValue } from '../../context/ContextProvider';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import FormControl from '@mui/material/FormControl';
import { SERVER_URL } from '../../constants.js';
import { NumberInput } from '../../constants';

function AddVendorInvoice(props){
  const [open, setOpen] = useState(false);
  const [vendorInvoice, setVendorInvoice] = useState({
    date: '', amount: '', vendor: ''
  });

  const {
    dispatch,
  } = useValue();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleVendorInvoiceChange = (event) => {
    setVendorInvoice({...vendorInvoice, [event.target.name]: event.target.value})
  };

  const handleClose = () => {
    setOpen(false)
    setVendorInvoice({
        date: '', amount: '', vendor: ''
    })
  };

  const handleSave = () => {
    props.addVendorInvoice(vendorInvoice);
    handleClose();
  }

  return (
    <div>
    <Button className="shine-button" variant="contained" onClick={handleClickOpen}>
      Добавить информацию
    </Button>
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle className='dialog'>Новая информация о счетах поставщиков</DialogTitle>
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
         <Button /*</DialogActions>onClick={handleSave}*/>Добавить</Button>
      </DialogActions>
    </Dialog>            
  </div>
  );
}

export default AddVendorInvoice;