import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/Formulario.css';
import { mostrarNotificacion } from './Notificacion';
import axios from 'axios';


const Register = () => {
  const [nombre, setNombre] = useState('');
  const [celular, setCelular] = useState('');
  const [cedula, setCedula] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mostrarContrasena, setMostrarContrasena] = useState(false);

  // INICIO CAMBIOS CHEBAS
  // Estados para errores de validación 

  const [nombreError, setNombreError] = useState('');
  const [celularError, setCelularError] = useState('');
  const [cedulaError, setCedulaError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [formValid, setFormValid] = useState(false);

  //Expresiones regulares 

  const regexNombre = /^[a-zA-Z\s]{3,40}$/;
  const regexCelular = /^\d{10}$/;
  const regexCedula = /^\d{6,10}$/;
  const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const regexPassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;

  //Funciones para validar cada campo

  const validarNombre = (valor) => {
   setNombre(valor); 
   if (!regexNombre.test(valor)) {
    setNombreError('El nombre debe tener solo letras y al menos 3 caracteres');
  } else {
    setNombreError('');
  }
  };

  const validarCelular = (valor) => {
    setCelular(valor);
    if(!regexCelular.test(valor)) {
      setCelularError('El número de celular debe tener 10 dígitos');
    } else {
      setCelularError('');
    }
  }

  const validarCedula = (valor) => {
    setCedula(valor);
    if(!regexCedula.test(valor)) {
      setCedulaError('La cédula debe tener entre 6 y 10 dígitos');
    } else {
      setCedulaError('');
    }
  }

  const validarEmail = (valor) => {
    setEmail(valor);
    if(!regexEmail.test(valor)) {
      setEmailError('El correo electrónico no es válido');
    } else {
      setEmailError('');
    }
  }

  const validarPassword = (valor) => {
    setPassword(valor);
    if(!regexPassword.test(valor)) {
      setPasswordError('La contraseña debe tener al menos 6 caracteres, incluyendo letras y números');
    } else {
      setPasswordError('');
    }
  }

  useEffect(() => {
  if (!nombreError && !celularError && !cedulaError && !emailError && !passwordError) {
      setFormValid(true);
  } else {
    setFormValid(false);
  }
}, [nombre, celular, cedula, email, password, nombreError, celularError, cedulaError, emailError, passwordError]);

  //Tambien se modifica cada onChange de los inputs para llamar a las funciones de validación,
  //cambiando setNombre por validarNombre, etc.
  //Así como el agregar despues del final de cada input 
  //{nombreError && <p className="formulario-error">{nombreError}</p>} para que muestre el error debajo del input correspondiente.
  //El handleRegister ahora con el if valida con validForm.
  //se modifica el console.log.

  // FIN CAMBIOS CHEBAS

  const navigate = useNavigate();

  const handleRegister = async (e) => {
  e.preventDefault();

  if (formValid) {
    try {
      const response = await axios.post('http://localhost:8000/api/nuevoCliente', {
        "nombre": nombre,
        "numeroCelular": celular,
        "cedula": cedula,
        "correoElectronico": email,
        "contrasena": password
      });

      console.log('Usuario registrado:', response.data);
      mostrarNotificacion("Registro exitoso", "success");
      navigate('/Login');
    } catch (error) {
      console.error('Error al registrar usuario:', error.response?.data || error.message);
      alert('Ocurrió un error al registrar el usuario');
    }
  } else {
    alert('Por favor, corrija los errores en el formulario.');
    console.log('Error en el registro');
  }
};


  const toggleContrasena = () => {
    setMostrarContrasena(!mostrarContrasena);
  };

  return (
    <>
      {/* Eslogan debajo de la navbar */}
      <div className="formulario-registro-eslogan-navbar">
        ¡Crea tu cuenta y empieza a ganar recompensas!
      </div>

      <div className="formulario-registro-container">
        <form onSubmit={handleRegister} className="formulario-registro-form">
          <h2 className="formulario-registro-title">Registro de Usuario</h2>

          {/* Eslogan gamificado debajo del título */}
          <p className="formulario-registro-eslogan-titulo">
            ¡Acumula puntos y participa por premios exclusivos!
          </p>

          <input
            type="text"
            className="formulario-registro-input"
            placeholder="Nombre completo"
            value={nombre}
            onChange={(e) => validarNombre(e.target.value)}
            required
          />
          {nombreError && <p className="formulario-error">{nombreError}</p>}
          <input
            type="tel"
            className="formulario-registro-input"
            placeholder="Número de celular"
            value={celular}
            onChange={(e) => validarCelular(e.target.value)}
            required
          />
          {celularError && <p className="formulario-error">{celularError}</p>}
          <input
            type="text"
            className="formulario-registro-input"
            placeholder="Cédula"
            value={cedula}
            onChange={(e) => validarCedula(e.target.value)}
            required
          />
          {cedulaError && <p className="formulario-error">{cedulaError}</p>}
          <input
            type="email"
            className="formulario-registro-input"
            placeholder="Correo Electrónico"
            value={email}
            onChange={(e) => validarEmail(e.target.value)}
            required
          />
          {emailError && <p className="formulario-error">{emailError}</p>}

          {/* Contraseña con toggle */}
          <div className="formulario-registro-password-container">
            <input
              type={mostrarContrasena ? 'text' : 'password'}
              className="formulario-registro-input"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => validarPassword(e.target.value)}
              required
            />
            <button
              type="button"
              className="formulario-registro-toggle-btn"
              onClick={toggleContrasena}
            >
              {mostrarContrasena ? 'Ocultar' : 'Mostrar'}
            </button>
            
          </div>
          {passwordError && <p className="formulario-error">{passwordError}</p>}

          <button type="submit" className="formulario-registro-boton" disabled={!formValid}>Registrarse</button>
        </form>
      </div>
    </>
  );
};

export default Register;