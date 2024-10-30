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

function AddProcurementRequest(props){
  const [open, setOpen] = useState(false);
  const [procurementRequest, setProcurementRequest] = useState({
    description: '', amount: '', requestDate: '', user: '', vendor: ''
  });

  const {
    dispatch,
  } = useValue();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleProcurementRequestChange = (event) => {
    setProcurementRequest({...procurementRequest, [event.target.name]: event.target.value})
  };

  const handleClose = () => {
    setOpen(false)
    setProcurementRequest({
        description: '', amount: '', requestDate: '', user:'', vendor: ''
    })
  };

  const handleSave = () => {
    props.addProcurementRequest(procurementRequest);
    handleClose();
  }

  return (
    <div>
    <Button className="shine-button" variant="contained" onClick={handleClickOpen}>
      Добавить информацию
    </Button>
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle className='dialog'>Информация о новой заявке на обеспечение</DialogTitle>
      <DialogContent className='dialog'>
        <Stack spacing={2} mt={1}>
        <TextField label="Описание товара" name="description" autoFocus
            variant="standard" value={procurementRequest.description} required
            onChange={handleProcurementRequestChange}/>
        <TextField label="Требуемое количество (шт.)" name="amount" autoFocus
            variant="standard" value={procurementRequest.amount} required
            onChange={handleProcurementRequestChange}/>
        <TextField label="Дата получения заявки" name="requestDate" autoFocus
            variant="standard" value={procurementRequest.requestDate} required
            onChange={handleProcurementRequestChange}/>
        <TextField label="Сотрудник отдела закупок, сформировавший заявку" name="user" autoFocus
            variant="standard" value={procurementRequest.user} required
            onChange={handleProcurementRequestChange} inputProps={{ style: { minWidth: '400px' } }}/>
        <TextField label="Поставщик" name="vendor" autoFocus
            variant="standard" value={procurementRequest.vendor} required
            onChange={handleProcurementRequestChange}/>
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

export default AddProcurementRequest;