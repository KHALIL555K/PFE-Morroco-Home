import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import HomePage from './Pages/HomePage.jsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PageNotFound from './Pages/PageNotFound.jsx';
import PageHotels from './Pages/PageHotels.jsx'; // Assurez-vous d'importer AllHotels
import Navbar from './Hotels/Navbar.jsx';
import DashbordAdmin from './Pages/DashbordAdmin.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>

        <Route path='/' element={<HomePage />} />

        <Route path='/Hotels' element={<PageHotels />} >
          <Route index element={<Navbar />} />
        </Route>

       <Route path='/DashbordAdmin' element={<DashbordAdmin /> }>

       </Route>


       

        <Route path='*' element={<PageNotFound />} />

      </Routes>
    </BrowserRouter>
  </StrictMode>,
);