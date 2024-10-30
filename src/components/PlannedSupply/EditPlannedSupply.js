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
import InputAdornment from '@mui/material/InputAdornment';
import { NumberInput } from '../../constants';
import { useValue } from '../../context/ContextProvider';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import FormControl from '@mui/material/FormControl';

function EditPlannedSupply(props) {

  const [open, setOpen] = useState(false);
  const [plannedSupply, setPlannedSupply] = useState({
    description: '', quantity: '', plannedDate: '', vendor: ''
  });

  const {
    dispatch,
  } = useValue();

  const handlePlannedSupplyChange = (event) => {
    setPlannedSupply({...plannedSupply, [event.target.name]: event.target.value})
  };

  const handleClickOpen = () => {  
    setPlannedSupply({
        description: props.data.row.description,
        quantity: props.data.row.quantity, 
        plannedDate: props.data.row.plannedDate, 
        vendor: props.data.row.vendor
       })
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
    props.updatePlannedSupply(plannedSupply, props.data.id)
    handleClose();
  }

  return(
    <div>
      <IconButton onClick={handleClickOpen}>
        <EditIcon color="primary" />
      </IconButton>
      <Dialog open={open} onClose={handleClose}>
          <DialogTitle className='dialog'>Обновление информации о планируемых поставках</DialogTitle>
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
            <Button onClick={handleSave}>Сохранить</Button>
          </DialogActions>
        </Dialog>            
    </div>
  );  
}

export default EditPlannedSupply;