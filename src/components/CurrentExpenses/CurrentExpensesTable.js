
import React,  { useEffect, useState } from 'react';
import { SERVER_URL, StyledDataGrid } from '../../constants.js';
import {ruRU} from '@mui/x-data-grid';
import {GridToolbarContainer} from '@mui/x-data-grid';
import {GridToolbarExport} from '@mui/x-data-grid';
import {gridClasses } from '@mui/x-data-grid';
import {Snackbar, Box, Typography, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button} from '@mui/material';
import '../../CSS/table.css';
import { grey } from '@mui/material/colors';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { useValue } from '../../context/ContextProvider';
import axios from 'axios';
import EditCurrentExpenses from "./EditCurrentExpenses.js";
import AddCurrentExpenses from "./AddCurrentExpenses.js";

function CustomToolbar() {
  return (
    <GridToolbarContainer className={gridClasses.toolbarContainer}>
      <GridToolbarExport />
    </GridToolbarContainer>
  );
}

const CurrentExpensesTable = ({ setSelectedLink, link }) => {

  useEffect(() => {
    setSelectedLink(link);
  });

  const {
    dispatch,
  } = useValue();

    const [currentExpenses, setCurrentExpenses] = useState([]);
    const [delOpen, setDelOpen] = useState(false);
    const [addOpen, setAddOpen] = useState(false);
    const [editOpen, setEditOpen] = useState(false);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [rows, setRows] = useState([]);
    const [loading, setLoading] = useState(true);
    const customLocaleText = {
      noRowsLabel: loading ? 'Загрузка...' : 'Нет данных',
    };
  
    // useEffect(() => {
    //   fetchCurrentExpenses();
    // }, []);
  
    // const fetchCurrentExpenses = () => {
    //   const token = sessionStorage.getItem("jwt");
    //   fetch(SERVER_URL + '/api/currentExpenses', {
    //     headers: { 'Authorization' : token }
    //   })
    //   .then(response => response.json())
    //   .then(data => {
    //     const sortedCurrentExpenses = data._embedded.currentExpenses.sort((a, b) => a._links.self.href.slice(a._links.self.href.lastIndexOf('/') + 1) 
    //     - b._links.self.href.slice(b._links.self.href.lastIndexOf('/') + 1) );
    //     setCurrentExpenses(sortedCurrentExpenses)
    //     sortedCurrentExpenses.length !== 0 ? setLoading(true) : setLoading(false)
    // })
    //   .catch(err => console.error(err));    
    // }

    const onDelClick = () => {
      setDialogOpen(true)
    }
    
    // const handleConfirmDelete = (url) => {
    //   const token = sessionStorage.getItem("jwt");
    
    //   fetch(url, {
    //     method: 'DELETE',
    //     headers: { 'Authorization' : token }
    //   })
    //   .then(response => {
    //     if (response.ok) {
    //       fetchCurrentExpenses();
    //       setDelOpen(true);
    //     }
    //     else {
    //       alert('Что-то пошло не так!');
    //     }
    //     setDialogOpen(false)
    //   })
    //   .catch(err => console.error(err))
    //   setDialogOpen(false);
    // };
     
    // const addCurrentExpenses = (currentExpenses) => {

    //   const token = sessionStorage.getItem("jwt");

    //   fetch(SERVER_URL + '/api/currentExpenses',
    //     { method: 'POST', headers: {
    //       'Content-Type':'application/json',
    //       'Authorization' : token
    //     },
    //     body: JSON.stringify(currentExpenses)
    //   })
    //   .then(response => {
    //     if (response.ok) {
    //       fetchCurrentExpenses();
    //       setAddOpen(true)
    //     }
    //     else {
    //       dispatch({
    //         type: 'UPDATE_ALERT',
    //         payload: {
    //           open: true,
    //           severity: 'error',
    //           message: 'Ошибка! Новую запись о текущих расходах не удалось создать',
    //         },});
    //     }
    //   })
    //   .catch(err => console.error(err))
    // }
  

    // const updateCurrentExpenses = (currentExpenses, link) => {
    //   const token = sessionStorage.getItem("jwt");
    //   fetch(link,
    //     { 
    //       method: 'PUT', 
    //       headers: {
    //       'Content-Type':  'application/json',
    //       'Authorization' : token
    //     },
    //     body: JSON.stringify(currentExpenses)
    //   })
    //   .then(response => {
    //     if (response.ok) {
    //       fetchCurrentExpenses();
    //       setEditOpen(true)
    //     }
    //     else {
    //       alert('Что-то пошло не так!');
    //     }
    //   })
    //   .catch(err => console.error(err))
    // }
    
    const columns = [
      {field: 'description', headerName: 'Описание', width: 400},
      {field: 'amount', headerName: 'Сумма расходов (бел. руб.)', width: 300},
      {field: 'date', headerName: 'Дата списания', width: 230},
      {field: 'user', headerName: 'Менеджер, ответственный за транзакцию', width: 300},
      {
        field: '_links.currentExpenses.href', 
        headerName: '', 
        sortable: false,
        filterable: false,
        width: 100,
        renderCell: row => <EditCurrentExpenses 
                              data={row} 
                              /*updateCurrentExpenses={updateCurrentExpenses}*/ />
      },
      {
        field: '_links.self.href', 
        headerName: '', 
        width:120,
        sortable: false,
        filterable: false,
        renderCell: row => 
        <div>
        <IconButton onClick={() => onDelClick(row.id)}>
          <DeleteIcon color="error" />
        </IconButton>
        <Dialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={{
          '& .MuiBackdrop-root': {
            backgroundColor: 'rgba(0, 0, 0, 0.2)', 
          },
        }}
      >
        <DialogTitle id="alert-dialog-title">{"ВЫ уверены, что хотите удалить запись о расходах?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Запись о текущих расходах будет безвозвратно удалена
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)} color="primary">
            Отменить
          </Button>
          <Button /*onClick={() => handleConfirmDelete(rowIdToDelete)}*/ color="primary" autoFocus>
            Удалить
          </Button>
        </DialogActions>
      </Dialog>
      </div>
      }
    ];

    useEffect(() => {
      const updateRows = async () => {
        const updatedRows = await Promise.all(currentExpenses.map(async currentExpenses => ({
          id: currentExpenses._links.self.href,
          description: currentExpenses.description,
          amount: currentExpenses.amount,
          date: currentExpenses.date,
          user: currentExpenses.user
        })));
        setRows(updatedRows);
      };
  
      updateRows();
    }, [currentExpenses]);
    
  return (
    <Box
    sx={{
      height: 400,
      width: '100%',
    }}
  >
    <Typography
      variant="h4"
      component="h4"
      sx={{ textAlign: 'center', mt: 3, mb: 3 }}
    >
      Текущие расходы
    </Typography>
      <main className='info_pages_body'>
    <React.Fragment>
      <AddCurrentExpenses /*addCurrentExpenses={addCurrentExpenses}*/ />
      <div className="container" style={{ height: 400, width: "100%"}}>
        <StyledDataGrid localeText={{...ruRU.components.MuiDataGrid.defaultProps.localeText, ...customLocaleText}} className="grid_component" 
          columns={columns} 
          rows={rows} 
          disableSelectionOnClick={true}
          getRowId={row => row.id}
          {...currentExpenses}
          initialState={{
            ...currentExpenses.initialState,
            pagination: { paginationModel: { pageSize: 5 } },
          }}
          pageSizeOptions={[5, 10, 25]}
          components={{ Toolbar: CustomToolbar }}
          sx={{
            [`& .${gridClasses.row}`]: {
              bgcolor: (theme) =>
                theme.palette.mode === 'light' ? grey[200] : grey[900],
            },
          }}
        />
        <Snackbar
          open={delOpen}
          autoHideDuration={2000}
          onClose={() => setDelOpen(false)}
          message="Запись о текущих расходах удалена"
        />
        <Snackbar
          open={addOpen}
          autoHideDuration={2000}
          onClose={() => setAddOpen(false)}
          message="Запись о текущих расходах успешно добавлена"
        />
        <Snackbar
          open={editOpen}
          autoHideDuration={2000}
          onClose={() => setEditOpen(false)}
          message="Информация о текущих расходах успешно обновлена"
        />
      </div>
    </React.Fragment>
    </main>
    </Box>
  );
}

export default CurrentExpensesTable;