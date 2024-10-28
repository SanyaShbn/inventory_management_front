import './App.css';
import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom';
import SideList from './components/MainPage/SideList';

function App() {
  return (
    <div>
    <BrowserRouter>
     <Routes>
        <Route path="/" element={
          <div key="NavBarAndLogin" className="welcome_page">
            <SideList></SideList>
         </div>
          } />
     </Routes>
   </BrowserRouter>
  </div>
  );
}

export default App;
