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

function AddCurrentExpenses(props){
  const [open, setOpen] = useState(false);
  const [сurrentExpenses, setCurrentExpenses] = useState({
    description: '', amount: '', date: '', user: ''
  });

  const {
    dispatch,
  } = useValue();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleCurrentExpensesChange = (event) => {
    setCurrentExpenses({...сurrentExpenses, [event.target.name]: event.target.value})
  };

  const handleClose = () => {
    setOpen(false)
    setCurrentExpenses({
        description: '', amount: '', date: '', user:''
    })
  };

  const handleSave = () => {
    props.AddCurrentExpenses(сurrentExpenses);
    handleClose();
  }

  return (
    <div>
    <Button className="shine-button" variant="contained" onClick={handleClickOpen}>
      Добавить информацию
    </Button>
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle className='dialog'>Новая информация о расходах</DialogTitle>
      <DialogContent className='dialog'>
        <Stack spacing={2} mt={1}>
        <TextField label="Описание" name="description" autoFocus
            variant="standard" value={сurrentExpenses.description} required
            onChange={handleCurrentExpensesChange}/>
        <TextField label="Сумма расходов (бел. руб.)" name="amount" autoFocus
            variant="standard" value={сurrentExpenses.amount} required
            onChange={handleCurrentExpensesChange}/>
        <TextField label="Дата списания" name="date" autoFocus
            variant="standard" value={сurrentExpenses.date} required
            onChange={handleCurrentExpensesChange}/>
        <TextField label="Менеджер, ответственный за транзакцию" name="user" autoFocus
            variant="standard" value={сurrentExpenses.user} required
            onChange={handleCurrentExpensesChange} inputProps={{ style: { minWidth: '400px' } }}/>
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

export default AddCurrentExpenses;