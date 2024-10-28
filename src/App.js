import './App.css';
import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom';
import SideList from './components/MainPage/SideList';
import Dashboard from './components/MainPage/Dashboard';

function App() {
  return (
    <div>
    <BrowserRouter>
     <Routes>
        <Route path="/" element={
          <div key="NavBarAndLogin" className="welcome_page">
            <SideList></SideList>
            <Dashboard></Dashboard>
         </div>
          } />
     </Routes>
   </BrowserRouter>
  </div>
  );
}

export default App;
