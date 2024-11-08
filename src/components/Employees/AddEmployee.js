import React, { useState } from 'react';
import '../../CSS/table.css';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Stack from '@mui/material/Stack';
import { MenuItem, FormControl, InputLabel } from '@mui/material';
import Select from '@mui/material/Select';
import {
  usePhoneInput
} from 'react-international-phone';
import { PhoneNumberUtil } from 'google-libphonenumber';
import { useValue } from '../../context/ContextProvider';

function AddEmployee(props){
  const [open, setOpen] = useState(false);
  const [isEmailError, setIsEmailError] = useState(false);
  const [isNameError, setIsNameError] = useState(false);
  const [isSurNameError, setIsSurNameError] = useState(false);
  const [isPatrSurNameError, setIsPatrSurNameError] = useState(false);
  const [isBirthDateError, setIsBirthDateError] = useState(false);
  const [employee, setEmployee] = useState({
    firstName: '', surName: '', patrSurName: '', email: '', 
    phoneNumber: '', birthDate:'', post: '', role: ''
  });
  const handleEmailErrorChange = (event) => {
    const { value } = event.target;
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z]+\.[A-Za-z]{2,}$/;
    const cyrillicPattern = /[А-Яа-яЁё]/; 
    const isCyrillic = cyrillicPattern.test(value);
    setIsEmailError(!emailRegex.test(value) || isCyrillic);
    setEmployee({...employee, [event.target.name]: value});
  };
  const handleNameErrorChange = (event) => {
    const { value } = event.target;
    const isInvalid = value.length < 2 || value[0] !== value[0].toUpperCase() || !/^[\u0400-\u04FF]+$/.test(value);
    setIsNameError(isInvalid);
    setEmployee({...employee, [event.target.name]: event.target.value});
  };
  const handleSurNameErrorChange = (event) => {
    const { value } = event.target;
    const isInvalid = value.length < 2 || value[0] !== value[0].toUpperCase() || !/^[\u0400-\u04FF]+$/.test(value);
    setIsSurNameError(isInvalid);
    setEmployee({...employee, [event.target.name]: event.target.value});
  };
  const handlePatrSurNameErrorChange = (event) => {
    const { value } = event.target;
    const isInvalid = value.length < 2 || value[0] !== value[0].toUpperCase() || !/^[\u0400-\u04FF]+$/.test(value);
    setIsPatrSurNameError(isInvalid);
    setEmployee({...employee, [event.target.name]: event.target.value});
  };
  const handleBirthDateErrorChange = (event) => {
    const { value } = event.target;
    const birthDate = new Date(value);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    const isInvalid = age < 18;

    setIsBirthDateError(isInvalid);
    setEmployee({...employee, [event.target.name]: event.target.value});
  };
  const {
    dispatch,
  } = useValue();

  const {
    inputValue,
    phone,
    handlePhoneValueChange,
  } = usePhoneInput({
    defaultCountry: 'by',
    forceDialCode: true,
  });

  const phoneUtil = PhoneNumberUtil.getInstance();

  const isPhoneValid = (phone) => {
    try {
      return phoneUtil.isValidNumber(phoneUtil.parseAndKeepRawInput(phone));
    } catch (error) {
      return false;
    }
  };
  const isValid = isPhoneValid(phone);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEmployee({
      firstName: '', surName: '', patrSurName: '', email: '', 
      phoneNumber: '', birthDate:'', post: '', role:'', status: ''
    })
    setIsEmailError(false)
    setIsNameError(false)
    setIsSurNameError(false)
    setIsPatrSurNameError(false)
    setIsBirthDateError(false)
  };

  const handleSave = () => {
    if(employee.firstName.length === 0 | employee.surName.length === 0 | employee.patrSurName.length === 0
      | employee.email.length === 0 | employee.post.length === 0 | employee.birthDate.length === 0){
      dispatch({
        type: 'UPDATE_ALERT',
        payload: {
          open: true,
          severity: 'error',
          message: 'Заполните обязательные поля',
        },});
    }
    else{
    if(!isValid | isEmailError | isNameError | isSurNameError | isPatrSurNameError | isBirthDateError){
      dispatch({
        type: 'UPDATE_ALERT',
        payload: {
          open: true,
          severity: 'error',
          message: 'Проверьте корректность ввода данных',
        },});
    }
    else{
    switch (employee.post) {
      case 'Сотрудник отдела закупок':
        employee.role = "PURCHASING_DEPARTMENT_EMPLOYEE";
        break;
      case 'Менеджер по закупкам':
        employee.role = "PURCHASES_MANAGER";
        break;
      case 'Финансовый менеджер':
        employee.role= "FINANCIAL_MANAGER";
        break;
      default:
        employee.role = "PURCHASING_DEPARTMENT_EMPLOYEE";
    }
    employee.status = "disabled"
    employee.phoneNumber = phone
    props.addEmployee(employee);
    handleClose();
    }
  }
  }

  const handleChange = (event) => {
    setEmployee({...employee, [event.target.name]: event.target.value});
  }
  return (
    <div>
    <Button className="shine-button" variant="contained" onClick={handleClickOpen}>
      Добавить информацию
    </Button>
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle className='dialog'>Новый сотрудник</DialogTitle>
      <DialogContent className='dialog'>
        <Stack spacing={2} mt={1}>
          <TextField error={isNameError} label="Имя" name="firstName" autoFocus
            variant="standard" value={employee.firstName} required
            onChange={handleNameErrorChange}/>
           <TextField error={isSurNameError} label="Фамилия" name="surName"
            variant="standard" value={employee.surName} required
            onChange={handleSurNameErrorChange}/>
          <TextField error={isPatrSurNameError} label="Отчество" name="patrSurName" 
            variant="standard" value={employee.patrSurName} required
            onChange={handlePatrSurNameErrorChange}/>
          <TextField error = {isEmailError} label="Email" name="email" type="email"
            variant="standard" value={employee.email} required
            onChange={handleEmailErrorChange}/>
          <TextField
           error={!isValid}
           value={inputValue}
           required
           onChange={handlePhoneValueChange}
           label="Номер телефона"
           variant="outlined"
          />
          <TextField error={isBirthDateError} type='date' label="Дата рождения" name="birthDate" 
            variant="standard" value={employee.birthDate} required helperText="Потенциальный сотрудник должен быть совершеннолетним"
            onChange={handleBirthDateErrorChange} InputProps={{
              inputProps: {
                inputMode: 'numeric',
              },
              startAdornment: (
                <InputAdornment position="start"> </InputAdornment>
              ),
            }}/>
          <FormControl fullWidth>
            <InputLabel required>Должность</InputLabel>
             <Select
              name="post"
              value={employee.post}
              autoFocus variant="standard"
              label="Должность"
              onChange={handleChange}>
              <MenuItem value={"Сотрудник отдела закупок"}>Сотрудник отдела закупок</MenuItem>
              <MenuItem value={"Менеджер по закупкам"}>Менеджер по закупкам</MenuItem>
              <MenuItem value={"Финансовый менеджер"}>Финансовый менеджер</MenuItem>
            </Select>
          </FormControl>
        </Stack>
      </DialogContent>
      <DialogActions>
         <Button onClick={handleClose}>Отмена</Button>
         <Button onClick={handleSave}>Добавить</Button>
      </DialogActions>
    </Dialog>            
  </div>
  );
}

export default AddEmployee;