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

function EditFacility(props) {
  const [open, setOpen] = useState(false);
  const [isNameError, setIsNameError] = useState(false);
  const [vendor, setVendor] = useState({
    name: '', contactDetails: '', supplyOrders: ''
  });

  const {
    dispatch,
  } = useValue();

  const handleNameErrorChange = (event) => {
    const { value } = event.target;
    const isInvalid = value.length < 2 || value[0] !== value[0].toUpperCase() || !/^[\u0400-\u04FF\s]+$/.test(value);
    setIsNameError(isInvalid);
    setVendor({...vendor, [event.target.name]: event.target.value});
  };

  const handleVendorChange = (event) => {
    setVendor({...vendor, [event.target.name]: event.target.value})
  };

  const handleClickOpen = () => {  
    setVendor({
        name: props.data.row.name,
        contactDetails: props.data.row.contactDetails, 
        supplyOrders: props.data.row.supplyOrders, 
       })
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
    setIsNameError(false)
  };

  const handleSave = () => {
    if(vendor.name.length === 0){
      dispatch({
        type: 'UPDATE_ALERT',
        payload: {
          open: true,
          severity: 'error',
          message: 'Заполните обязательные поля!',
        },});
    }
    else{
      if(isNameError){
        dispatch({
          type: 'UPDATE_ALERT',
          payload: {
            open: true,
            severity: 'error',
            message: 'Проверьте корректность ввода данных!'
          },});
      }
      else{
        props.updateVendor(vendor, props.data.id)
        handleClose();
      }
    }
  }

  return(
    <div>
      <IconButton onClick={handleClickOpen}>
        <EditIcon color="primary" />
      </IconButton>
      <Dialog open={open} onClose={handleClose}>
          <DialogTitle className='dialog'>Обновление информации о поставщике</DialogTitle>
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
            <Button onClick={handleSave}>Сохранить</Button>
          </DialogActions>
        </Dialog>            
    </div>
  );  
}

export default EditFacility;