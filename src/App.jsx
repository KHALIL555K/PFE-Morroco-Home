import HomePage from './Pages/HomePage.jsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PageNotFound from './Pages/PageNotFound.jsx';
import PageHotels from './Pages/PageHotels.jsx'; // Assurez-vous d'importer AllHotels
import Navbar from './Components/Hotels/Navbar.jsx';
import DashbordAdmin from './Pages/DashbordAdmin.jsx';
import Register from './Pages/Register.jsx';
export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<HomePage />} />
                <Route path='/Hotels' element={<PageHotels />} >
                    <Route index element={<Navbar />} />
                </Route>
                <Route path='/Dashbord/Admin' element={<DashbordAdmin />}>
                </Route>
                <Route path='/register' element={<Register />} />
                <Route path='*' element={<PageNotFound />} />
            </Routes>
        </BrowserRouter>
    )
}
