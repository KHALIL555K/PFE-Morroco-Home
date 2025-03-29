import Commantaire from "../Components/Home/Commantaire"
import Home from "../Components/Home/Home"
import Login from "../Components//Home/Login"
import Navbar from "../Components/Home/Navbar"
import Service from "../Components/Home/Service"


function HomePage() {

  return (
    <>
     <Navbar /> 
     <Home />
     <Service />  
     <Commantaire />
     <Login />
    </>
  )
}

export default HomePage
