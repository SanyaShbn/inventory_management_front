import './App.css';
// import Notification from './components/Notification';
import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom';
import Dashboard from './components/MainPage/Dashboard';
// import Loading from './components/Loading';

function App() {
  return (
    <div>
    {/* <Loading/>
    <Notification/> */}
    <BrowserRouter>
     <Routes>
          <Route path="dashboard/*" element={<Dashboard/>} />
     </Routes>
   </BrowserRouter>
  </div>
  );
}

export default App;
