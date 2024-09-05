import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import RecoverPassword from './pages/recoverpassword/RecoverPassword';
import ChangePassword from './pages/changepassword/ChangePassword';
import SimpleLayout from './components/SimpleLayout';
import DefaultLayout from './components/DefaultLayout';
import PrivateRouter from './components/PrivateRouter';
import Background from './components/style/background/background';
import LogoutLayout from './components/LogoutLayout';


function App() {
  return (
    <div className='background'>
      <BrowserRouter>
     
     
        <Routes>
          <Route element={<PrivateRouter />}>
            <Route path='/' element={<SimpleLayout><Home /></SimpleLayout>} />
            <Route path='/change' element={<SimpleLayout>< ChangePassword /></SimpleLayout>} />
            <Route path='/recover' element={<SimpleLayout>< RecoverPassword /></SimpleLayout>} />
          </Route>
          <Route path='/login' element={<LogoutLayout><Login /></LogoutLayout>} />
          <Route path='/register' element={<LogoutLayout><Register /></LogoutLayout>} />
        </Routes>
      
      </BrowserRouter>
    </div>
  );
}

export default App;
