import './App.css';
import {BrowserRouter as Router,Routes,Route} from "react-router-dom";
import SignUp from './components/SignUp';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Create from './components/create';
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Login/>}/>
         <Route path='/signup' element={<SignUp/>}/>
          <Route path='/dashboard' element={ <Dashboard/>} />
          <Route path='/create' element={ <Create/>} />
        </Routes>
      </Router>
    
  </>
  );
}

export default App;
