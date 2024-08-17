import './App.css';
import {BrowserRouter, Route, Routes} from  'react-router-dom';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import SimpleLayout from './components/SimpleLayout';
import DefaultLayout from './components/DefaultLayout';


function App() {
  return (
   <>
    {/*<Header/>*/}
      <BrowserRouter>
        <Routes>
            <Route path='/' element= {<DefaultLayout><Home/></DefaultLayout>}/>
          <Route path='/login' element={<SimpleLayout><Login/></SimpleLayout>} />
        </Routes>
      </BrowserRouter>
    {/*<Footer/>*/}
   </>
  );
}

export default App;
