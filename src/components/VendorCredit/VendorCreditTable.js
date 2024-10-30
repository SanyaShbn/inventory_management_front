
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
import EditVendorCredit from './EditVendorCredit.js';
import AddVendorCredit from './AddVendorCredit.js';

function CustomToolbar() {
  return (
    <GridToolbarContainer className={gridClasses.toolbarContainer}>
      <GridToolbarExport />
    </GridToolbarContainer>
  );
}

const VendorCreditTable = ({ setSelectedLink, link }) => {

  useEffect(() => {
    setSelectedLink(link);
  });

  const {
    dispatch,
  } = useValue();

    const [vendorCredits, setVendorCredits] = useState([]);
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
    //   fetchVendorCredits();
    // }, []);
  
    // const fetchVendorCredits = () => {
    //   const token = sessionStorage.getItem("jwt");
    //   fetch(SERVER_URL + '/api/vendorCredits', {
    //     headers: { 'Authorization' : token }
    //   })
    //   .then(response => response.json())
    //   .then(data => {
    //     const sortedVendorCredits = data._embedded.vendorCredits.sort((a, b) => a._links.self.href.slice(a._links.self.href.lastIndexOf('/') + 1) 
    //     - b._links.self.href.slice(b._links.self.href.lastIndexOf('/') + 1) );
    //     setVendorCredits(sortedVendorCredits)
    //     sortedVendorCredits.length !== 0 ? setLoading(true) : setLoading(false)
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
    //       fetchVendorCredits();
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
     
    // const addVendorCredit = (venodorCredit) => {

    //   const token = sessionStorage.getItem("jwt");

    //   fetch(SERVER_URL + '/api/venodorCredits',
    //     { method: 'POST', headers: {
    //       'Content-Type':'application/json',
    //       'Authorization' : token
    //     },
    //     body: JSON.stringify(venodorCredit)
    //   })
    //   .then(response => {
    //     if (response.ok) {
    //       fetchVendorCredits();
    //       setAddOpen(true)
    //     }
    //     else {
    //       dispatch({
    //         type: 'UPDATE_ALERT',
    //         payload: {
    //           open: true,
    //           severity: 'error',
    //           message: 'Ошибка! Новую запись о кредитах по оплате не удалось создать',
    //         },});
    //     }
    //   })
    //   .catch(err => console.error(err))
    // }
  

    // const updateVendorCredit = (venodorCredit, link) => {
    //   const token = sessionStorage.getItem("jwt");
    //   fetch(link,
    //     { 
    //       method: 'PUT', 
    //       headers: {
    //       'Content-Type':  'application/json',
    //       'Authorization' : token
    //     },
    //     body: JSON.stringify(venodorCredit)
    //   })
    //   .then(response => {
    //     if (response.ok) {
    //       fetchVendorCredits();
    //       setEditOpen(true)
    //     }
    //     else {
    //       alert('Что-то пошло не так!');
    //     }
    //   })
    //   .catch(err => console.error(err))
    // }
    
    const columns = [
      {field: 'amount', headerName: 'Сумма (бел. руб.)', width: 300},
      {field: 'creditDate', headerName: 'Дата выставления кредита', width: 300},
      {field: 'dueDate', headerName: 'Дата истечения отсрочки', width: 330},
      {field: 'vendor', headerName: 'Поставщик, выдавший кредит', width: 300},
      {
        field: '_links.vendorCredits.href', 
        headerName: '', 
        sortable: false,
        filterable: false,
        width: 100,
        renderCell: row => <EditVendorCredit
                              data={row} 
                              /*updateVendorCredit={updateVendorCredit}*/ />
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
        <DialogTitle id="alert-dialog-title">{"ВЫ уверены, что хотите удалить запись о кредитах по оплате?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Запись о кредитах по оплате будет безвозвратно удалена
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
        const updatedRows = await Promise.all(vendorCredits.map(async vendorCredit => ({
          id: vendorCredit._links.self.href,
          amount: vendorCredit.amount,
          creditDate: vendorCredit.creditDate,
          dueDate: vendorCredit.dueDate,
          vendor: vendorCredit.vendor,
        })));
        setRows(updatedRows);
      };
  
      updateRows();
    }, [vendorCredits]);
    
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
      Кредиты по оплате
    </Typography>
      <main className='info_pages_body'>
    <React.Fragment>
      <AddVendorCredit /*addVendorCredit={addVendorCredit}*/ />
      <div className="container" style={{ height: 400, width: "100%"}}>
        <StyledDataGrid localeText={{...ruRU.components.MuiDataGrid.defaultProps.localeText, ...customLocaleText}} className="grid_component" 
          columns={columns} 
          rows={rows} 
          disableSelectionOnClick={true}
          getRowId={row => row.id}
          {...vendorCredits}
          initialState={{
            ...vendorCredits.initialState,
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
          message="Запись о кредитах по оплате удалена"
        />
        <Snackbar
          open={addOpen}
          autoHideDuration={2000}
          onClose={() => setAddOpen(false)}
          message="Запись о кредитах по оплате успешно добавлена"
        />
        <Snackbar
          open={editOpen}
          autoHideDuration={2000}
          onClose={() => setEditOpen(false)}
          message="Информация о кредитах по оплате успешно обновлена"
        />
      </div>
    </React.Fragment>
    </main>
    </Box>
  );
}

export default VendorCreditTable;