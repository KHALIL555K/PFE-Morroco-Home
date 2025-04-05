import HomePage from './Pages/HomePage.jsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; // Import correct
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
import CreateChambre from './Components/Dashbord Receptionniste/CreateChambre.jsx';
import ChambreDetails from './Components/Hotels/ChambreDetails.jsx'; // Import ajouté
import CustomBarChart from './Components/Dashbord Admin/CustomBarChart.jsx';

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                {/* Home Page */}
                <Route path='/' element={<HomePage />} />

                {/* Pages des Hotels */}
                <Route path='/Hotels' element={<PageHotels />}>
                    <Route index element={<Navbar />} />
                </Route>

                {/* Route indépendante pour les détails de chambre */}
                <Route path="/Chambres/:id" element={<ChambreDetails />} />

                {/* Dashboard administrateur */}
                <Route path='/Dashboard/Admin' element={<DashbordAdmin />}>
                    <Route index element={<CustomBarChart />} />
                    <Route path='Receptionniste' element={<Table />} />
                    <Route path='Create' element={<Create />} />
                   
                </Route>

                {/* Dashboard réceptionniste */}
                <Route path='/Dashboard/Receptionniste' element={<Layout />}>
                    <Route index element={<Dashboard />} />
                    <Route path='Chambres' element={<Chambres />} />
                    <Route path='Reservation' element={<Reservation />} />
                    <Route path='Chambres/Create' element={<CreateChambre />} />
                </Route>

                {/* Enregistrement */}
                <Route path='/Register' element={<Register />} />

                {/* 404 */}
                <Route path='*' element={<PageNotFound />} />
            </Routes>
        </BrowserRouter>
    )
}