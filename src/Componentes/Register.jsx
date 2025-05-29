import { useState } from 'react';
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
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    if (nombre && celular && cedula && email && password) {
      await registrarUsuario();
    } else {
      alert('Por favor, completa todos los campos');
    }
  };

  const toggleContrasena = () => {
    setMostrarContrasena(!mostrarContrasena);
  };

  const registrarUsuario = async () => {
  try {
    const response = await axios.post('http://localhost:8000/api/nuevoCliente', {
  "nombre": nombre,
  "numeroCelular": celular,
  "cedula": cedula,
  "correoElectronico": email,
  "contrasena": password
},
{
  withCredentials: true  // ← NECESARIO
}
);

    console.log('Usuario registrado:', response.data);
    mostrarNotificacion("Registrado con éxito", "success");
    navigate('/Login');
  } catch (error) {
    console.error('Error al registrar usuario:', error.response?.data || error.message);
    mostrarNotificacion("Credenciales incorrectas o inválidas", "error");
  }
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
            onChange={(e) => setNombre(e.target.value)}
            required
          />
          <input
            type="tel"
            className="formulario-registro-input"
            placeholder="Número de celular"
            value={celular}
            onChange={(e) => setCelular(e.target.value)}
            required
          />
          <input
            type="text"
            className="formulario-registro-input"
            placeholder="Cédula"
            value={cedula}
            onChange={(e) => setCedula(e.target.value)}
            required
          />
          <input
            type="email"
            className="formulario-registro-input"
            placeholder="Correo Electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          {/* Contraseña con toggle */}
          <div className="formulario-registro-password-container">
            <input
              type={mostrarContrasena ? 'text' : 'password'}
              className="formulario-registro-input"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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

          <button type="submit" className="formulario-registro-boton">Registrarse</button>
        </form>
      </div>
    </>
  );
};

export default Register;