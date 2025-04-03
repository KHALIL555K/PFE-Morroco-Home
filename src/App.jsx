import HomePage from './Pages/HomePage.jsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PageNotFound from './Pages/PageNotFound.jsx';
import PageHotels from './Pages/PageHotels.jsx';
import Navbar from './Components/Hotels/Navbar.jsx';
import DashbordAdmin from './Pages/DashbordAdmin.jsx';
import Register from './Pages/Register.jsx';
import Table from './Components/Dashbord Admin/Table.jsx';
import Create from './Components/Dashbord Admin/Create.jsx';
import Layout from './Components/Dashbord Receptionniste/Layout.jsx';
import Dashboard from './Components/Dashbord Receptionniste/Dashboard.jsx';
import Chambres from './Components/Dashbord Receptionniste/Chambres.jsx';
import Reservation from './Components/Dashbord Receptionniste/Reservation.jsx';




export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                {/* Home Page */}
                <Route path='/' element={<HomePage />} />

                {/* pages de des Hotels */}
                <Route path='/Hotels' element={<PageHotels />} >
                    <Route index element={<Navbar />} />
                </Route>

                {/* Dashboard de administrateur */}
                <Route path='/Dashbord/Admin' element={<DashbordAdmin />}>
                    <Route path='Recpetionniste' element={<Table />} />
                    <Route path='Create' element={<Create />} />
                    <Route path='Profile' element="hello from profile" />
                    <Route path='Statistique/Details' element="hello from Statistique details " />
                </Route>

                {/* Dashboard de Receptionniste */}
                <Route path='/Dashbord/Receptionniste' element={<Layout />}>
                    <Route index element={<Dashboard />} />
                    <Route path='Chambres' element={<Chambres />} />
                    <Route path='Reservation' element={<Reservation />} />
                </Route>

                {/* page de registrement */}
                <Route path='/register' element={<Register />} />
                <Route path='*' element={<PageNotFound />} />
            </Routes>
        </BrowserRouter>
    )
}
