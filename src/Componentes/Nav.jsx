import { useState, useEffect } from 'react';
import styled from 'styled-components';
import BurguerButton from './BurguerButton';
import pollo from '../Img/pollo1.jpg';
import axios from 'axios';

// Importamos axios para realizar peticiones HTTP y saber si el usuario esta autenticado.

function Navbar() {
  const [clicked, setClicked] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Verifica la sesión al montar el componente
  useEffect(() => {
    console.log("useEffect ejecutado");
    axios.get('http://localhost:8000/api/verificarSesion', { withCredentials: true })
      .then(res => {
        console.log('Respuesta sesión:', res.data);
        if (res.data && res.data.ok) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      })
      .catch(err => {
        console.log('Error al verificar sesión:', err);
        setIsAuthenticated(false);
      });
  }, []);

  const handleClick = () => {
    if (window.innerWidth < 769) {
      setClicked(!clicked);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 769) {
        setClicked(false);
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
      <NavContainer>
        <div className='Logo'>
          <img src={pollo} alt="Icono Asadero" />
          <h2>Asadero <br /> <span>El Gallito</span></h2>
        </div>
        <div className={`links ${clicked ? 'active' : ''}`}>
          <a onClick={handleClick} href="/">Inicio</a>
          <a onClick={handleClick} href="/productos">Productos</a>
          <a onClick={handleClick} href="/reseñas">Reseñas</a>
          <a onClick={handleClick} href="/reservas">Reservas</a>
          <a onClick={handleClick} href="/Api">Juega y gana!</a>
          
          {!isAuthenticated && (
            <>
              <a onClick={handleClick} href="/login">Iniciar Sesión</a>
              <a onClick={handleClick} href="/register">Registrarse</a>
            </>
          )}
          {isAuthenticated && (
            <a onClick={() => {
              axios.post('http://localhost:8000/api/cerrarSesion', {}, { withCredentials: true })
                .then(() => window.location.reload());
            }}>Cerrar Sesión</a>
          )}
        </div>
        
        <div className='burguer'>
          <BurguerButton clicked={clicked} handleClick={handleClick} />
        </div>
        <BgDiv className={`initial ${clicked ? ' active' : ''}`}>
        <a onClick={handleClick} href="/">Inicio</a>
          <a onClick={handleClick} href="/productos">Productos</a>
          <a onClick={handleClick} href="/reseñas">Reseñas</a>
          <a onClick={handleClick} href="/reservas">Reservas</a>
          <a onClick={handleClick} href="/Api">Juega y gana!</a>
          {!isAuthenticated && (
            <>
              <a onClick={handleClick} href="/login">Iniciar Sesión</a>
              <a onClick={handleClick} href="/register">Registrarse</a>
            </>
          )}
          {isAuthenticated && (
            <a onClick={() => {
              axios.post('http://localhost:8000/api/cerrarSesion', {}, { withCredentials: true })
                .then(() => window.location.reload());
            }}>Cerrar Sesión</a>
          )}
        </BgDiv>
      </NavContainer>
    </>
  );
}

export default Navbar;

const NavContainer = styled.nav`
  width: 100%;
  background-color: rgb(125,17,17);
  padding: 0 2em;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);

  div:first-child {
    padding: 0.5em 0;
    display: flex;
    align-items: center;
    gap: 0.5em;

    img {
      width: 56px;
      height: 56px;
      border-radius: 40%;
      border: 2px solid #ffc100;
    }

    h2 {
      color: white;
      font-size: 1.2em;
      margin: 0;
      display: flex;
      flex-direction: column;
      line-height: 1.2;
      -webkit-text-stroke: 1px white;

      span {
        color: #ffcf33;
        font-size: 1.2em;
        -webkit-text-stroke: 1px #ffcf33;
      }
    }
  }

  .links {
    display: flex;
    gap: 1em;

    a {
      color: white;
      text-decoration: none;
      position: relative;
      padding: 0 10px;
      margin:0px;
      padding-bottom: 5px;
      font-size: 0.95em;
      white-space: nowrap;
      transition: color 0.3s ease;

      &:hover {
        color: #ffcf33;
      }

      &::after {
        content: '';
        position: absolute;
        width: 0;
        height: 2px;
        left: 0;
        bottom: 0;
        background-color: #ffcf33;
        transition: width 0.3s ease;
      }

      &:hover::after {
        width: 100%;
      }
    }
  }

  .burguer {
    display: none;
  }

  @media (max-width: 943px) {
    .burguer {
      display: block;
    }
    .links {
      display: none;
    }
  }
`;

const BgDiv = styled.div`
  background-color: #C40C0C;
  position: absolute;
  top: -1000px;
  left: -1000px;
  width: 100%;
  height: 100%;
  z-index: -1;
  transition: all 0.6s ease;
  display: flex; 
  flex-direction: column; 
  justify-content: center;
  align-items: center;

  &.active {
    border-radius: 0 0 80% 0;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 10;

    a {
      color: white;
      text-decoration: none;
      position: relative;
      padding: 10px;
      font-size: 1.2em;
      white-space: nowrap;
      transition: color 0.3s ease;

      &:hover {
        color: #ffcf33;
      }

      &::after {
        content: '';
        position: absolute;
        width: 0;
        height: 2px;
        left: 0;
        bottom: 0;
        background-color: #ffcf33;
        transition: width 0.3s ease;
      }

      &:hover::after {
        width: 100%;
      }
    }
  }
`;
