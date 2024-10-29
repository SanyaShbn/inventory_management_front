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

function AddVendor(props){
  const [open, setOpen] = useState(false);
  const [isNameError, setIsNameError] = useState(false);
  const [vendor, setVendor] = useState({
    name: '', contactDetails: '', supplyOrders: ''
  });

  const {
    dispatch,
  } = useValue();

  const handleClickOpen = () => {
    setOpen(true);
    setIsNameError(false)
  };

  const handleNameErrorChange = (event) => {
    const { value } = event.target
    const isInvalid = value.length < 2 || value[0] !== value[0].toUpperCase() || !/^[\u0400-\u04FF\s]+$/.test(value);
    setIsNameError(isInvalid)
    setVendor({...vendor, [event.target.name]: event.target.value})
  };

  const handleVendorChange = (event) => {
    setVendor({...vendor, [event.target.name]: event.target.value})
  };

  const handleClose = () => {
    setOpen(false)
    setVendor({
        name: '', contactDetails: '', supplyOrders: ''
    })
  };

//   const handleSave = () => {
//     if(vendor.name.length === 0){
//       dispatch({
//         type: 'UPDATE_ALERT',
//         payload: {
//           open: true,
//           severity: 'error',
//           message: 'Заполните обязательные поля!',
//         },});
//     }
//     else{
//       if(isNameError){
//         dispatch({
//           type: 'UPDATE_ALERT',
//           payload: {
//             open: true,
//             severity: 'error',
//             message: 'Проверьте корректность ввода данных!'
//           },});
//       }
//       else{
//         props.addVendor(vendor);
//         handleClose();
//       }
//     }
//   }

  return (
    <div>
    <Button className="shine-button" variant="contained" onClick={handleClickOpen}>
      Добавить информацию
    </Button>
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle className='dialog'>Новый поставщик</DialogTitle>
      <DialogContent className='dialog'>
        <Stack spacing={2} mt={1}>
        <TextField error={isNameError} label="Наименование" name="name" autoFocus
            variant="standard" value={vendor.name} required
            onChange={handleNameErrorChange}/>
        <TextField fullWidth label="Контактная информация" name="contactDetails" autoFocus
            variant="standard" value={vendor.contactDetails} required
            onChange={handleVendorChange} inputProps={{ style: { minWidth: '300px' } }}/>
        <TextField fullWidth label="Договоры на поставку" name="supplyOrders" autoFocus
            variant="standard" value={vendor.supplyOrders} required
            onChange={handleVendorChange} inputProps={{ style: { minWidth: '300px' } }}/>
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

export default AddVendor;