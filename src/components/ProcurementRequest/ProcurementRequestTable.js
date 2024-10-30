
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
import AddProcurementRequest from "./AddProcurementRequest.js";
import EditProcurementRequest from "./EditProcurementRequest.js";

function CustomToolbar() {
  return (
    <GridToolbarContainer className={gridClasses.toolbarContainer}>
      <GridToolbarExport />
    </GridToolbarContainer>
  );
}

const ProcurementRequestTable = ({ setSelectedLink, link }) => {

  useEffect(() => {
    setSelectedLink(link);
  });

  const {
    dispatch,
  } = useValue();

    const [procurementRequests, setProcurementRequests] = useState([]);
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
    //   fetchProcurementRequests();
    // }, []);
  
    // const fetchProcurementRequests = () => {
    //   const token = sessionStorage.getItem("jwt");
    //   fetch(SERVER_URL + '/api/procurementRequests', {
    //     headers: { 'Authorization' : token }
    //   })
    //   .then(response => response.json())
    //   .then(data => {
    //     const sortedProcurementRequests = data._embedded.procurementRequests.sort((a, b) => a._links.self.href.slice(a._links.self.href.lastIndexOf('/') + 1) 
    //     - b._links.self.href.slice(b._links.self.href.lastIndexOf('/') + 1) );
    //     setProcurementRequests(sortedProcurementRequests)
    //     sortedProcurementRequests.length !== 0 ? setLoading(true) : setLoading(false)
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
    //       fetchProcurementRequests();
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
     
    // const addProcurementRequest = (procurementRequests) => {

    //   const token = sessionStorage.getItem("jwt");

    //   fetch(SERVER_URL + '/api/procurementRequests',
    //     { method: 'POST', headers: {
    //       'Content-Type':'application/json',
    //       'Authorization' : token
    //     },
    //     body: JSON.stringify(procurementRequests)
    //   })
    //   .then(response => {
    //     if (response.ok) {
    //       fetchProcurementRequests();
    //       setAddOpen(true)
    //     }
    //     else {
    //       dispatch({
    //         type: 'UPDATE_ALERT',
    //         payload: {
    //           open: true,
    //           severity: 'error',
    //           message: 'Ошибка! Новую запись о заявках на обеспечение не удалось создать',
    //         },});
    //     }
    //   })
    //   .catch(err => console.error(err))
    // }
  

    // const updateProcurementRequest = (procurementRequest, link) => {
    //   const token = sessionStorage.getItem("jwt");
    //   fetch(link,
    //     { 
    //       method: 'PUT', 
    //       headers: {
    //       'Content-Type':  'application/json',
    //       'Authorization' : token
    //     },
    //     body: JSON.stringify(procurementRequest)
    //   })
    //   .then(response => {
    //     if (response.ok) {
    //       fetchProcurementRequests();
    //       setEditOpen(true)
    //     }
    //     else {
    //       alert('Что-то пошло не так!');
    //     }
    //   })
    //   .catch(err => console.error(err))
    // }
    
    const columns = [
      {field: 'description', headerName: 'Описание товара', width: 220},
      {field: 'amount', headerName: 'Требуемое количество (шт.)', width: 250},
      {field: 'requestDate', headerName: 'Дата получения заявки', width: 200},
      {field: 'user', headerName: 'Сотрудник отдела закупок, сформировавший заявку', width: 430},
      {field: 'vendor', headerName: 'Поставщик', width: 150},
      {
        field: '_links.procurementRequest.href', 
        headerName: '', 
        sortable: false,
        filterable: false,
        width: 100,
        renderCell: row => <EditProcurementRequest
                              data={row} 
                              /*updateProcurementRequest={updateProcurementRequest}*/ />
      },
      {
        field: '_links.self.href', 
        headerName: '', 
        width:100,
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
            Запись о заявках на обеспечение будет безвозвратно удалена
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
        const updatedRows = await Promise.all(procurementRequests.map(async procurementRequest => ({
          id: procurementRequest._links.self.href,
          description: procurementRequest.description,
          amount: procurementRequest.amount,
          requestDate: procurementRequest.requestDate,
          user: procurementRequest.user,
          vendor: procurementRequest.vendor
        })));
        setRows(updatedRows);
      };
  
      updateRows();
    }, [procurementRequests]);
    
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
      Заявки на обеспечение
    </Typography>
      <main className='info_pages_body'>
    <React.Fragment>
      <AddProcurementRequest /*addProcurementRequest={addProcurementRequest}*/ />
      <div className="container" style={{ height: 400, width: "100%"}}>
        <StyledDataGrid localeText={{...ruRU.components.MuiDataGrid.defaultProps.localeText, ...customLocaleText}} className="grid_component" 
          columns={columns} 
          rows={rows} 
          disableSelectionOnClick={true}
          getRowId={row => row.id}
          {...procurementRequests}
          initialState={{
            ...procurementRequests.initialState,
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
          message="Запись о заявках на обеспечение удалена"
        />
        <Snackbar
          open={addOpen}
          autoHideDuration={2000}
          onClose={() => setAddOpen(false)}
          message="Запись о заявках на обеспечение успешно добавлена"
        />
        <Snackbar
          open={editOpen}
          autoHideDuration={2000}
          onClose={() => setEditOpen(false)}
          message="Информация о заявках на обеспечение успешно обновлена"
        />
      </div>
    </React.Fragment>
    </main>
    </Box>
  );
}

export default ProcurementRequestTable;