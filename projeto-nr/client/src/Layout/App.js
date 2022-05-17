import React from "react"
import Header from "../components/Header/Header"
import Container from "../components/Container/Container"
import Footer from '../components/Footer'
import Globals from "../components/Globals";


const App = ({children}) => (

    <>
    <Header/>
    <Container>
        {children}
    </Container>
    <Footer/>
    </>



)
 export default App