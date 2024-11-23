import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import RecoverPassword from './pages/recoverpassword/RecoverPassword';
import ChangePasswordLogout from './pages/changepassword/Logout/ChangePasswordLogout';
import SimpleLayout from './components/SimpleLayout';
import DefaultLayout from './components/DefaultLayout';
import PrivateRouter from './components/PrivateRouter';
import LogoutLayout from './components/LogoutLayout';
import ProfilePage from './pages/profile/ProfilePage';
import UserBasedRoute from './components/UserBasedRouter';
import AdminDashboard from './pages/admin/AdminDashboard';
import ConfirmRegistration from './pages/confirmRegistration/ConfirmRegistration';
import ChangePasswordLogin from './pages/changepassword/Login/ChangePasswordLogin';


function App() {
  return (
    <div>
      <BrowserRouter>

        <Routes>
          <Route element={<PrivateRouter />}>
            <Route element={<UserBasedRoute allowedRoles={['admin', 'user']} />}>
              <Route path='/' element={<SimpleLayout><Home /></SimpleLayout>} />
              <Route path='/profile' element={<SimpleLayout><ProfilePage /></SimpleLayout>} />
              <Route path='/changeLogin' element={<SimpleLayout><ChangePasswordLogin /></SimpleLayout>} />
            </Route>
            <Route element={<UserBasedRoute allowedRoles={['admin']} />}>
              <Route path='/admin' element={<SimpleLayout><AdminDashboard /></SimpleLayout>} />
            </Route>
          </Route>
          <Route path='/recover' element={<LogoutLayout>< RecoverPassword /></LogoutLayout>} />
          <Route path='/login' element={<LogoutLayout><Login /></LogoutLayout>} />
          <Route path='/register' element={<LogoutLayout><Register /></LogoutLayout>} />
          <Route path='/changeLogout' element={<LogoutLayout><ChangePasswordLogout /></LogoutLayout>} />
          <Route path='/confirm' element={<LogoutLayout><ConfirmRegistration /></LogoutLayout>} />
        </Routes>

      </BrowserRouter>
    </div>
  );
}

export default App;
