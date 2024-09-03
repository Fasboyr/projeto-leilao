import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import RecoverPassword from './pages/recoverpassword/RecoverPassword';
import ChangePassword from './pages/changepassword/ChangePassword';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import SimpleLayout from './components/SimpleLayout';
import DefaultLayout from './components/DefaultLayout';
import PrivateRouter from './components/PrivateRouter';
import Background from './components/style/background/background';


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
          <Route path='/login' element={<SimpleLayout><Login /></SimpleLayout>} />
          <Route path='/register' element={<SimpleLayout><Register /></SimpleLayout>} />
        </Routes>
      
      <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;
