import React,  { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom'
import {
  Box,
  Paper,
  Typography,
} from '@mui/material';
// import { SERVER_URL } from '../../constants.js';
import SoldMembershipsAreaChart from './SoldMembershipsAreaChart.js';
import PieMembershipsCost from './PieMembershipsCost.js';
import MonthsDropdown from './MonthsDropdown.js';
import { Backdrop, CircularProgress } from '@mui/material';
import { FaUserCircle } from "react-icons/fa";
import { Truck, Dock, User } from 'lucide-react';

const Home = ({ setSelectedLink, link }) => {

  useEffect(() => {
    setSelectedLink(link);
    // fetchClients();
    // fetchUsers();
    // fetchMemberships();
  }, [link, setSelectedLink]);

  const location = useLocation();
  const [employees, setEmployees] = useState([]);
  const [users, setUsers] = useState([]);
  const [memberships, setMemberships] = useState([]);
  const [clients, setClients] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedMonths, setSelectedMonths] = useState(3);

//   const fetchUsers = () => {
//     const token = sessionStorage.getItem("jwt");
//     fetch(SERVER_URL + '/api/users', {
//       headers: { 'Authorization' : token }
//     })
//     .then(response => response.json())
//     .then(data => {
//       const employeesData = data._embedded.users;
//       setEmployees(employeesData);
//       const usersData = employeesData.filter(employee => employee.status !== 'disabled');
//       setUsers(usersData);
//       setIsLoading(false)
//     })
//     .catch(err => console.error(err));    
//   }
//   const fetchMemberships = () => {
//     const token = sessionStorage.getItem("jwt");
//     fetch(SERVER_URL + '/api/sportComplexMemberships', {
//       headers: { 'Authorization' : token }
//     })
//     .then(response => response.json())
//     .then(data => {
//       setMemberships(data._embedded.sportComplexMemberships)
//       setIsLoading(false)
//     })
//     .catch(err => console.error(err));    
//   }
//   const fetchClients = () => {
//     const token = sessionStorage.getItem("jwt");
//     fetch(SERVER_URL + '/api/clients', {
//       headers: { 'Authorization' : token }
//     })
//     .then(response => response.json())
//     .then(data => {
//       setClients(data._embedded.clients)
//       setIsLoading(false)
//     })
//     .catch(err => console.error(err));    
//   }

  useEffect(() => {
    window.history.pushState(null, document.title, window.location.href);
    window.addEventListener('popstate', function(event) {
      window.history.pushState(null, document.title, window.location.href);
    });
  }, [location]);

  return (
    <main className='main-container'>
    {/* {isLoading ? (
      <Backdrop open={true} sx={{ zIndex: (theme) => theme.zIndex.modal + 1 }}>
        <CircularProgress sx={{ color: 'white' }} />
      </Backdrop>
    ):( */}
        <>
        <div className='main-cards'>
          
        <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h6">ПОСТАВЩИКИ</Typography>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Truck size={70} sx={{ height: 100, width: 100, opacity: 0.3, mr: 1 }} />
          <Typography variant="h4">{memberships.length}</Typography>
        </Box>
        </Paper>
        <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h6">ЗАЯВКИ НА ОБЕСПЕЧЕНИЕ</Typography>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Dock size={70} sx={{ height: 100, width: 100, opacity: 0.3, mr: 1 }} />
          <Typography variant="h4">{clients.length}</Typography>
        </Box>
        </Paper>
        <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h6">ПОЛЬЗОВАТЕЛИ</Typography>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <FaUserCircle  size={70} sx={{ height: 100, width: 100, opacity: 0.3, mr: 1 }} />
          <Typography variant="h4">{users.length}</Typography>
        </Box>
        </Paper>
        <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h6">СОТРУДНИКИ</Typography>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <User  size={70} sx={{ height: 100, width: 100, opacity: 0.3, mr: 1 }} />
          <Typography variant="h4">{employees.length}</Typography>
        </Box>
        </Paper>
        <Paper elevation={3} sx={{ p: 3, gridColumn: '1/3' }}>
        <MonthsDropdown onChange={(e) => setSelectedMonths(Number(e.target.value))} />
        <SoldMembershipsAreaChart  months={selectedMonths} />
        </Paper>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
        <Paper elevation={3} sx={{ p: 2, gridColumn: '1/3' }}>
        <PieMembershipsCost/>
        </Paper>
        </Box>
        </div>
        </>
  {/* )} - от isLoading */}
    </main>
  )
}

export default Home