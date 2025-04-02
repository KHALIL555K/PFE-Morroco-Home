import HomePage from './Pages/HomePage.jsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PageNotFound from './Pages/PageNotFound.jsx';
import PageHotels from './Pages/PageHotels.jsx'; // Assurez-vous d'importer AllHotels
import Navbar from './Components/Hotels/Navbar.jsx';
import DashbordAdmin from './Pages/DashbordAdmin.jsx';
import Register from './Pages/Register.jsx';
import Table from './Components/Dashbord Admin/Table.jsx';
import Create from './Components/Dashbord Admin/Create.jsx';




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

                {/* page de administrateur */}
                <Route path='/Dashbord/Admin' element={<DashbordAdmin />}>
                    <Route path='Recpetionniste' element={<Table />} />
                    <Route path='Create' element={<Create />} />
                    <Route path='Profile' element="hello from profile" />
                    <Route path='Statistique/Details' element="hello from Statistique details " />
                </Route>

                <Route path='/Dashbord/Receptionniste' element="hello receptionniste">


                </Route>

                {/* page de registrement */}
                <Route path='/register' element={<Register />} />
                <Route path='*' element={<PageNotFound />} />
            </Routes>
        </BrowserRouter>
    )
}
