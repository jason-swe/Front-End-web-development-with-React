
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import MyNavbar from './components/MyNavbar';
import { BrowserRouter, Route, Router, Routes } from 'react-router';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Contact from './pages/Contact';
import Detail from './pages/Detail';
import Create from './pages/Create';
import Update from './pages/Update';

function App() {

  return (
    
    <BrowserRouter>
      <MyNavbar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/management' element={<Dashboard/>}/>
        <Route path='/Contact' element={<Contact/>}/>
        <Route path='/students/:id' element={<Detail/>}/>
        <Route path='/Create' element={<Create/>} />
        <Route path='/Update/:id' element={<Update/>} />
      </Routes>
    </BrowserRouter>
    
  )
}

export default App
