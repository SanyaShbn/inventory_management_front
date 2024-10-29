import './App.css';
import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom';
import Dashboard from './components/MainPage/Dashboard';

function App() {
  return (
    <div>
    <BrowserRouter>
     <Routes>
          <Route path="dashboard/*" element={<Dashboard/>} />
     </Routes>
   </BrowserRouter>
  </div>
  );
}

export default App;
