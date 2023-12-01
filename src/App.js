import React from 'react'
import { Feature, Footer, Home, Navbar, Login, Addform, Reservation} from "./components/index";

const App = () => {
  return (
    <div>
    <Navbar/>
    <Login/>
    < Footer />
    <Feature/>
    <Home />
    < Addform />
    < Reservation />
    </div>
  )
}

export default App