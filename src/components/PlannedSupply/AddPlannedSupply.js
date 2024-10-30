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

function AddPlannedSupply(props){
  const [open, setOpen] = useState(false);
  const [plannedSupply, setPlannedSupply] = useState({
    description: '', quantity: '', plannedDate: '', vendor: ''
  });

  const {
    dispatch,
  } = useValue();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handlePlannedSupplyChange = (event) => {
    setPlannedSupply({...plannedSupply, [event.target.name]: event.target.value})
  };

  const handleClose = () => {
    setOpen(false)
    setPlannedSupply({
        description: '', quantity: '', plannedDate: '', vendor: ''
    })
  };

  const handleSave = () => {
    props.addPlannedSupply(plannedSupply);
    handleClose();
  }

  return (
    <div>
    <Button className="shine-button" variant="contained" onClick={handleClickOpen}>
      Добавить информацию
    </Button>
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle className='dialog'>Новая информация о планируемых поставках</DialogTitle>
      <DialogContent className='dialog'>
        <Stack spacing={2} mt={1}>
        <TextField label="Описание" name="description" autoFocus
            variant="standard" value={plannedSupply.description} required
            onChange={handlePlannedSupplyChange}/>
        <TextField label="Количество товаров (шт.)" name="quantity" autoFocus
            variant="standard" value={plannedSupply.quantity} required
            onChange={handlePlannedSupplyChange}/>
        <TextField type="date" label="Планируемая дата поставки" name="plannedDate" autoFocus
            variant="standard" value={plannedSupply.plannedDate} required
            onChange={handlePlannedSupplyChange} InputProps={{
                inputProps: {
                  inputMode: 'numeric',
                },
                startAdornment: (
                  <InputAdornment position="start"> </InputAdornment>
                ),
            }}/>
        <TextField label="Поставщик" name="vendor" autoFocus
            variant="standard" value={plannedSupply.vendor} required
            onChange={handlePlannedSupplyChange} inputProps={{ style: { minWidth: '300px' } }}/>
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

export default AddPlannedSupply;