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

function AddVendorCredit(props){
  const [open, setOpen] = useState(false);
  const [vendorCredit, setVendorCredit] = useState({
    amount: '', creditDate: '', dueDate: '', vendor: ''
  });

  const {
    dispatch,
  } = useValue();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleVendorCreditChange = (event) => {
    setVendorCredit({...vendorCredit, [event.target.name]: event.target.value})
  };

  const handleClose = () => {
    setOpen(false)
    setVendorCredit({
        amount: '', creditDate: '', dueDate: '', vendor: ''
    })
  };

  const handleSave = () => {
    props.addVendorCredit(vendorCredit);
    handleClose();
  }

  return (
    <div>
    <Button className="shine-button" variant="contained" onClick={handleClickOpen}>
      Добавить информацию
    </Button>
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle className='dialog'>Новая информация о кредитах по оплате</DialogTitle>
      <DialogContent className='dialog'>
        <Stack spacing={2} mt={1}>
        <TextField label="Сумма (бел. руб.)" name="amount" autoFocus
            variant="standard" value={vendorCredit.amount} required
            onChange={handleVendorCreditChange}/>
        <TextField type="date" label="Дата выставления кредита" name="creditDate" autoFocus
            variant="standard" value={vendorCredit.creditDate} required
            onChange={handleVendorCreditChange} InputProps={{
                inputProps: {
                  inputMode: 'numeric',
                },
                startAdornment: (
                  <InputAdornment position="start"> </InputAdornment>
                ),
            }}/>
        <TextField type="date" label="Дата истечения отсрочки" name="dueDate" autoFocus
            variant="standard" value={vendorCredit.dueDate} required
            onChange={handleVendorCreditChange} InputProps={{
                inputProps: {
                  inputMode: 'numeric',
                },
                startAdornment: (
                  <InputAdornment position="start"> </InputAdornment>
                ),
            }}/>
        <TextField label="Поставщик, выдавший кредит" name="vendor" autoFocus
            variant="standard" value={vendorCredit.vendor} required
            onChange={handleVendorCreditChange} inputProps={{ style: { minWidth: '400px' } }}/>
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

export default AddVendorCredit;