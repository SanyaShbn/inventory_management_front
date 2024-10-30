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

function EditCurrentExpenses(props) {

  const [open, setOpen] = useState(false);
  const [сurrentExpenses, setCurrentExpenses] = useState({
    description: '', amount: '', date: '', user: ''
  });

  const {
    dispatch,
  } = useValue();

  const handleCurrentExpensesChange = (event) => {
    setCurrentExpenses({...сurrentExpenses, [event.target.name]: event.target.value})
  };

  const handleClickOpen = () => {  
    setCurrentExpenses({
        description: props.data.row.description,
        amount: props.data.row.amount, 
        date: props.data.row.date, 
        user: props.data.row.user
       })
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
    props.updateCurrentExpenses(сurrentExpenses, props.data.id)
    handleClose();
  }

  return(
    <div>
      <IconButton onClick={handleClickOpen}>
        <EditIcon color="primary" />
      </IconButton>
      <Dialog open={open} onClose={handleClose}>
          <DialogTitle className='dialog'>Обновление информации о расходах</DialogTitle>
        <DialogContent className='dialog'>
        <Stack spacing={2} mt={1}>
          <TextField label="Описание" name="description" autoFocus
            variant="standard" value={сurrentExpenses.description} required
            onChange={handleCurrentExpensesChange}/>
          <TextField fullWidth label="Сумма расходов (бел. руб.)" name="amount" autoFocus
            variant="standard" value={сurrentExpenses.amount} required
            onChange={handleCurrentExpensesChange} inputProps={{ style: { minWidth: '300px' } }}/>
          <TextField fullWidth label="Дата списания" name="date" autoFocus
            variant="standard" value={сurrentExpenses.date} required
            onChange={handleCurrentExpensesChange} inputProps={{ style: { minWidth: '300px' } }}/>
          <TextField fullWidth label="Менеджер, ответственный за транзакцию" name="user" autoFocus
            variant="standard" value={сurrentExpenses.user} required
            onChange={handleCurrentExpensesChange} inputProps={{ style: { minWidth: '300px' } }}/>
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

export default EditCurrentExpenses;