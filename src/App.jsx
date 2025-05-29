import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import Api_juego from './Componentes/Api/Api_juego'; // Importa el componente del juego
import Nav from './Componentes/Nav'
import Reservas from './Componentes/Reservas'
import Reseñas from './Componentes/Reseñas'
import Inicio from "./Componentes/Inicio"; 
import Productos from './Componentes/Productos';
import Login from './Componentes/Login';
import Register from './Componentes/Register';
import Api from './Componentes/Api';
import Footer from './Componentes/Footer';
import Notificacion from './Componentes/Notificacion';
import { useEffect } from 'react';
import axios from 'axios';



function App() {
  
  useEffect(()=>{
    axios().then(data => console.log(data))
  },[])

  return (
   <Router>
    <Nav></Nav>
    <Notificacion />
    <Routes>
    <Route path="/" element={<Inicio />} />
        <Route path="/productos" element={<Productos />} />
        <Route path="/reseñas" element={<Reseñas />} />
        <Route path="/reservas" element={<Reservas />} />
        <Route path="/Api" element={<Api/>} />
        <Route path="/Login" element={<Login/>} />
        <Route path="/Register" element={<Register/>} />
        <Route path="/juego" element={<Api_juego />} /> {/* Nueva ruta para el juego */}
    </Routes>
    <Footer></Footer>
   </Router> 
  )
}

export default App
