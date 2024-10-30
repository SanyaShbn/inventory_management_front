import React, { useState, useEffect } from 'react';
import { SERVER_URL } from '../../constants.js';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import { NumberInput } from '../../constants';
import { useValue } from '../../context/ContextProvider';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import FormControl from '@mui/material/FormControl';

function EditVendorCredit(props) {

  const [open, setOpen] = useState(false);
  const [vendorCredit, setVendorCredit] = useState({
    amount: '', creditDate: '', dueDate: '', vendor: ''
  });

  const {
    dispatch,
  } = useValue();

  const handleVendorCreditChange = (event) => {
    setVendorCredit({...vendorCredit, [event.target.name]: event.target.value})
  };

  const handleClickOpen = () => {  
    setVendorCredit({
        amount: props.data.row.amount,
        creditDate: props.data.row.creditDate,
        dueDate: props.data.row.dueDate, 
        vendor: props.data.row.vendor
       })
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
    props.updateVendorCredit(vendorCredit, props.data.id)
    handleClose();
  }

  return(
    <div>
      <IconButton onClick={handleClickOpen}>
        <EditIcon color="primary" />
      </IconButton>
      <Dialog open={open} onClose={handleClose}>
          <DialogTitle className='dialog'>Обновление информации о кредитах по оплате</DialogTitle>
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
            <Button onClick={handleSave}>Сохранить</Button>
          </DialogActions>
        </Dialog>            
    </div>
  );  
}

export default EditVendorCredit;