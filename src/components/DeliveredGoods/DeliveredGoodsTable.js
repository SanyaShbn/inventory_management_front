
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
import AddDeliveredGoods from "./AddDeliveredGoods.js";
import EditDeliveredGoods from './EditDeliveredGoods.js';

function CustomToolbar() {
  return (
    <GridToolbarContainer className={gridClasses.toolbarContainer}>
      <GridToolbarExport />
    </GridToolbarContainer>
  );
}

const DeliveredGoodsTable = ({ setSelectedLink, link }) => {

  useEffect(() => {
    setSelectedLink(link);
  });

  const {
    dispatch,
  } = useValue();

    const [deliveredGoods, setDeliveredGoods] = useState([]);
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
    //   fetchDeliveredGoods();
    // }, []);
  
    // const fetchDeliveredGoods = () => {
    //   const token = sessionStorage.getItem("jwt");
    //   fetch(SERVER_URL + '/api/deliveredGoods', {
    //     headers: { 'Authorization' : token }
    //   })
    //   .then(response => response.json())
    //   .then(data => {
    //     const sortedDeliveredGoods = data._embedded.deliveredGoods.sort((a, b) => a._links.self.href.slice(a._links.self.href.lastIndexOf('/') + 1) 
    //     - b._links.self.href.slice(b._links.self.href.lastIndexOf('/') + 1) );
    //     setDeliveredGoods(sortedDeliveredGoods)
    //     sortedDeliveredGoods.length !== 0 ? setLoading(true) : setLoading(false)
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
    //       fetchDeliveredGoods();
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
     
    // const addDeliveredGoods = (deliveredGoods) => {

    //   const token = sessionStorage.getItem("jwt");

    //   fetch(SERVER_URL + '/api/deliveredGoods',
    //     { method: 'POST', headers: {
    //       'Content-Type':'application/json',
    //       'Authorization' : token
    //     },
    //     body: JSON.stringify(deliveredGoods)
    //   })
    //   .then(response => {
    //     if (response.ok) {
    //       fetchDeliveredGoods();
    //       setAddOpen(true)
    //     }
    //     else {
    //       dispatch({
    //         type: 'UPDATE_ALERT',
    //         payload: {
    //           open: true,
    //           severity: 'error',
    //           message: 'Ошибка! Новую запись о доставленных товарах не удалось создать',
    //         },});
    //     }
    //   })
    //   .catch(err => console.error(err))
    // }
  

    // const updateDeliveredGoods = (deliveredGoods, link) => {
    //   const token = sessionStorage.getItem("jwt");
    //   fetch(link,
    //     { 
    //       method: 'PUT', 
    //       headers: {
    //       'Content-Type':  'application/json',
    //       'Authorization' : token
    //     },
    //     body: JSON.stringify(deliveredGoods)
    //   })
    //   .then(response => {
    //     if (response.ok) {
    //       fetchDeliveredGoods();
    //       setEditOpen(true)
    //     }
    //     else {
    //       alert('Что-то пошло не так!');
    //     }
    //   })
    //   .catch(err => console.error(err))
    // }
    
    const columns = [
      {field: 'productName', headerName: 'Наименование товара', width: 300},
      {field: 'quantity', headerName: 'Количество (шт.)', width: 300},
      {field: 'deliveryDate', headerName: 'Дата приемки товара', width: 230},
      {field: 'vendor', headerName: 'Поставщик', width: 150},
      {field: 'supplyOrder', headerName: 'Договор на поставку', width: 250},
      {
        field: '_links.deliveredGoods.href', 
        headerName: '', 
        sortable: false,
        filterable: false,
        width: 100,
        renderCell: row => <EditDeliveredGoods 
                              data={row} 
                              /*updateDeliveredGoods={updateDeliveredGoods}*/ />
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
        <DialogTitle id="alert-dialog-title">{"ВЫ уверены, что хотите удалить запись о доставленных товарах?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Запись о доставленных товарах будет безвозвратно удалена
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
        const updatedRows = await Promise.all(deliveredGoods.map(async deliveredGoods => ({
          id: deliveredGoods._links.self.href,
          quantity: deliveredGoods.quantity,
          deliveryDate: deliveredGoods.deliveryDate,
          vendor: deliveredGoods.vendor,
          supplyOrder: deliveredGoods.supplyOrder
        })));
        setRows(updatedRows);
      };
  
      updateRows();
    }, [deliveredGoods]);
    
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
      Учет доставленных товаров
    </Typography>
      <main className='info_pages_body'>
    <React.Fragment>
      <AddDeliveredGoods /*addDeliveredGoods={addDeliveredGoods}*/ />
      <div className="container" style={{ height: 400, width: "100%"}}>
        <StyledDataGrid localeText={{...ruRU.components.MuiDataGrid.defaultProps.localeText, ...customLocaleText}} className="grid_component" 
          columns={columns} 
          rows={rows} 
          disableSelectionOnClick={true}
          getRowId={row => row.id}
          {...deliveredGoods}
          initialState={{
            ...deliveredGoods.initialState,
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
          message="Запись о доставленных товарах удалена"
        />
        <Snackbar
          open={addOpen}
          autoHideDuration={2000}
          onClose={() => setAddOpen(false)}
          message="Запись о доставленных товарах успешно добавлена"
        />
        <Snackbar
          open={editOpen}
          autoHideDuration={2000}
          onClose={() => setEditOpen(false)}
          message="Информация о доставленных товарах успешно обновлена"
        />
      </div>
    </React.Fragment>
    </main>
    </Box>
  );
}

export default DeliveredGoodsTable;