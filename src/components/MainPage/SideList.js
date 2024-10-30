import { Truck, HandCoins, Dock, ClipboardCheck, Receipt, Handshake, BookOpenCheck, AppWindow, User, FileChartColumnIncreasing } from 'lucide-react';
// import Scheduler from "../Scheduler/Scheduler"
import { useTheme } from '@mui/material/styles';
// import { SERVER_URL } from '../../constants.js';
import {
    Avatar,
    Box,
    Divider,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    styled,
    Tooltip,
    Typography,
} from '@mui/material';
import {
ChevronLeft,
Logout,
} from '@mui/icons-material';
import MuiDrawer from '@mui/material/Drawer';
import { useMemo, useState, useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Home from './Home';
import EmployeeTable from '../Employees/EmployeeTable'
// import ReceptionButtonsList from "./ReceptionButtonsList"
// import SetTheme from "../Scheduler/SetTheme"
// import UpdateProfile from "../User/UpdateProfile.js"
import { blue } from '@mui/material/colors';
import VendorTable from '../Vendor/VendorTable';
import CurrentExpensesTable from '../CurrentExpenses/CurrentExpensesTable';
import ProcurementRequestTable from '../ProcurementRequest/ProcurementRequestTable';
import DeliveredGoodsTable from '../DeliveredGoods/DeliveredGoodsTable';
import VendorInvoiceTable from '../VendorInvoice/VendorInvoiceTable';
import PlannedSupplyTable from '../PlannedSupply/PlannedSupplyTable';
// import { jwtDecode } from 'jwt-decode';
// import { useValue } from '../../context/ContextProvider'
// import ReportsButtonsList from "./ReportsButtonsList.js"
  
  const drawerWidth = 280;
  
  const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
  });
  
  const closedMixin = (theme) => ({
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
      width: `calc(${theme.spacing(8)} + 1px)`,
    },
  });
  
  const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
  }));
  
  const Drawer = styled(MuiDrawer, {
    shouldForwardProp: (prop) => prop !== 'open',
  })(({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }));
  
  const SideList = ({ open, setOpen }) => {

//     const {
//       dispatch,
//     } = useValue();
//     const handleLogout = () => {
//     dispatch({ type: 'START_LOADING' });

//     setTimeout(() => {
//       dispatch({ type: 'END_LOADING' });
//       sessionStorage.setItem("jwt", "");
//       ClearLocalStorage()
//       navigate("/", { replace: true });
//     }, 1000);
//     }
  
//   const ClearLocalStorage = () => {
//     const reportData = JSON.parse(localStorage.getItem('reportData'));
//     if(reportData){
//     if(reportData.title) {reportData.title = ''}  
//     if(reportData.subject) {reportData.subject = ''}
//     if(reportData.textContent) {reportData.textContent = ''} 
//     if(reportData.option) {reportData.option = ''} 
//     localStorage.removeItem('reportData')
//     localStorage.setItem('reportData', JSON.stringify(reportData))
//     }
//     localStorage.setItem('theme', '')
//   }


    const [selectedLink, setSelectedLink] = useState('')
    // const token = sessionStorage.getItem("jwt");
    // const decodedToken = jwtDecode(token);
    const [user, setUser] = useState([]);
    const [profileIcon, setProfileIcon] = useState([]);
    // const role = decodedToken.roles.toString();

    // useEffect(() => {
    //   fetchUser();
    // }, []);
  
    // const fetchUser = () => {
    //   fetch(SERVER_URL + '/api/user_profile?userLogin=' + decodedToken.sub, {
    //     headers: { 'Authorization' : token }
    //   })
    //   .then(response => response.json())
    //   .then(data => {setUser(data); setProfileIcon(data.firstName[0] + data.surName[0])})
    //   .catch(err => console.error(err));    
    // }

    const list = useMemo(
      () => {
        let componentsToShow = [];
    //   if (role === 'ADMIN') {
        componentsToShow.push(
          {
            title: 'Главная страница',
            icon: <AppWindow/>,
            link: 'main',
            component: <Home {...{ setSelectedLink, link: 'main' }} />,
          },
          {
            title: 'Сотрудники',
            icon: <User/>,
            link: 'service_employees',
            component: <EmployeeTable {...{ setSelectedLink, link: 'service_employees' }} />,
          },
          {
            title: 'Поставщики',
            icon: <Truck/>,
            link: 'vendors',
            component: <VendorTable {...{ setSelectedLink, link: 'vendors' }}/>,
          },
          {
            title: 'Текущие расходы',
            icon: <HandCoins/>,
            link: 'expenses',
            component: <CurrentExpensesTable {...{ setSelectedLink, link: 'expenses' }}/>,
          },
          {
            title: 'Заявки на обеспечение',
            icon: <Dock/>,
            link: 'procurement_requests',
            component: <ProcurementRequestTable {...{ setSelectedLink, link: 'procurement_requests' }}/>,
          },
          {
            title: 'Доставленные товары',
            icon: <ClipboardCheck/>,
            link: 'delivered_goods',
            component: <DeliveredGoodsTable {...{ setSelectedLink, link: 'delivered_goods' }}/>,
            // component:
            // <div>
            // <div>
            // <SetTheme/>
            // </div>
            // <div> 
            // <Scheduler {...{ setSelectedLink, link: 'shedule' }}/>
            // </div>
            // </div>
          },
          {
            title: 'Счета поставщиков',
            icon: <Receipt/>,
            link: 'vendor_invoices',
            component: <VendorInvoiceTable {...{ setSelectedLink, link: 'vendor_invoices' }}/>,
          },
          {
            title: 'Планируемые поставки',
            icon: <Handshake/>,
            link: 'planned_supplies',
            component: <PlannedSupplyTable {...{ setSelectedLink, link: 'planned_supplies' }}/>,
          },
          {
            title: 'Кредиты по оплате',
            icon: <BookOpenCheck/>,
            link: 'vendors_credits',
          //   component: <ReportsButtonsList {...{ setSelectedLink, link: 'reports/*' }}/>,
          },
          {
            title: 'Отчеты',
            icon: <FileChartColumnIncreasing/>,
            link: 'reports/*',
          //   component: <ReportsButtonsList {...{ setSelectedLink, link: 'reports/*' }}/>,
          },
        );
    //   }

    //   if (role === 'COACH') {
    //     componentsToShow.push(
    //       {
    //         title: 'Тренировки',
    //         icon: <MdOutlineSportsGymnastics />,
    //         link: 'trainings',
    //         component: <TrainingTable {...{ setSelectedLink, link: 'trainings' }}/>,
    //       },
    //       {
    //         title: 'Клиенты',
    //         icon: <BsFillPersonVcardFill/>,
    //         link: 'clients',
    //         component: <ClientTable {...{ setSelectedLink, link: 'clients' }}/>,
    //       },
    //       {
    //         title: 'Расписание',
    //         icon: <FaCalendarAlt />,
    //         link: 'shedule',
    //         component:
    //         <div>
    //         <div>
    //         <SetTheme/>
    //         </div>
    //         <div> 
    //         <Scheduler {...{ setSelectedLink, link: 'shedule' }}/>
    //         </div>
    //         </div>
    //       },
    //         {
    //           title: 'Рецепция',
    //           icon: <BsReception4 />,
    //           link: 'reception/*',
    //           component: <ReceptionButtonsList {...{ setSelectedLink, link: 'reception/*' }}/>,
    //         },
    //         {
    //           title: 'Отчеты',
    //           icon: <BiSolidReport />,
    //           link: 'reports/*',
    //           component: <ReportsButtonsList {...{ setSelectedLink, link: 'reports/*' }}/>,
    //         },
    //     );
    //   }
    //   if (role === 'MANAGER') {
    //     componentsToShow.push(
    //       {
    //         title: 'Абонементы',
    //         icon: <MdCardMembership />,
    //         link: 'memberships',
    //         component: <SportComplexMembershipTable {...{ setSelectedLink, link: 'memberships' }}/>,
    //       },
    //       {
    //         title: 'Клиенты',
    //         icon: <BsFillPersonVcardFill/>,
    //         link: 'clients',
    //         component: <ClientTable {...{ setSelectedLink, link: 'clients' }}/>,
    //       },
    //       {
    //         title: 'Расписание',
    //         icon: <FaCalendarAlt />,
    //         link: 'shedule',
    //         component:
    //         <div>
    //         <div>
    //         <SetTheme/>
    //         </div>
    //         <div> 
    //         <Scheduler {...{ setSelectedLink, link: 'shedule' }}/>
    //         </div>
    //         </div>
    //       },
    //         {
    //           title: 'Выручка',
    //           icon: <MdAttachMoney />,
    //           link: 'financies',
    //           component: <FinanciesMain {...{ setSelectedLink, link: 'financies'}}/>,
    //         },
    //         {
    //           title: 'Рецепция',
    //           icon: <BsReception4 />,
    //           link: 'reception/*',
    //           component: <ReceptionButtonsList {...{ setSelectedLink, link: 'reception/*' }}/>,
    //         },
    //         {
    //           title: 'Отчеты',
    //           icon: <BiSolidReport />,
    //           link: 'reports/*',
    //           component: <ReportsButtonsList {...{ setSelectedLink, link: 'reports/*' }}/>,
    //         },
    //     );
    //   }

 return componentsToShow; 
// }, [role]); 
}, );


    const navigate = useNavigate();
    const theme = useTheme();
    let color = theme.palette.mode;

    return (
      <>
        <Drawer variant="permanent" open={open}>
          <DrawerHeader>
            <IconButton onClick={() => setOpen(false)}>
              <ChevronLeft />
            </IconButton>
          </DrawerHeader>
          <Divider />
          <List>
            {list.map((item) => (
              <ListItem key={item.title} disablePadding sx={{ display: 'block' }}>
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? 'initial' : 'center',
                    px: 2.5,
                  }}
                  onClick={() => navigate(item.link)}
                  selected={selectedLink === item.link}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : 'auto',
                      justifyContent: 'center',
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={item.title}
                    sx={{ opacity: open ? 1 : 0 }}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider />
          <Box sx={{ mx: 'auto', mt: 3, mb: 1 }}>
              <Avatar
                sx={{ bgcolor: color!=='dark' ? blue[500] : "null" }}
                {...(open && { sx: { width: 60, height: 60, bgcolor: color!=='dark' ? blue[500] : "null" }})}
              >{profileIcon}</Avatar> 
          </Box>
          <Box sx={{ textAlign: 'center' }}>
            {open && <Typography>{}</Typography>}
            <Typography variant="body2">{}</Typography>
            {open && (
              <Typography variant="body2">{}</Typography>
            )}
              {/* <UpdateProfile data={user} fetchUser={fetchUser}/> */}
          </Box>
          <Box sx={{ textAlign: 'center' }}>
            {open && <Typography>{}</Typography>}
            <Typography variant="body2">{}</Typography>
            {open && (
              <Typography variant="body2">{}</Typography>
            )}
            <Tooltip title="Выйти" sx={{ mt: 1 }}>
              <IconButton>
              {/* <IconButton onClick={handleLogout}> */}
                <Logout/>
              </IconButton>
            </Tooltip>
          </Box>
        </Drawer>
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <DrawerHeader />
          <Routes>
            {list.map((item) => (
              <Route key={item.title} path={item.link} element={item.component} />
            ))}
          </Routes>
        </Box>
      </>
    );
  };
  
  export default SideList;