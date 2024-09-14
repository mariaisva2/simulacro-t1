'use client'

import { useState, ChangeEvent, FormEvent } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation'; 

const Login = () => {
  const [formData, setFormData] = useState<{ email: string; password: string }>({
    email: '',
    password: ''
  });

  const router = useRouter(); 
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('https://simuate-test-backend-1.onrender.com/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage('Inicio de sesión exitoso. Bienvenido');
        setError(null);
        
    
        router.push('/postpage');
      } else {
        setError(data.message || 'Error al iniciar sesión');
        setMessage(null);
      }
    } catch (error) {
      setError('Error en la solicitud');
    }
  };

  return (
    <div>
      <h1>Iniciar Sesión</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Contraseña</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Iniciar sesión</button>
      </form>
      {message && <p style={{ color: 'green' }}>{message}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <p>¿No tienes una cuenta?</p>
      <Link href="/Register">
        <button >Registrarse</button>
      </Link>
    </div>
  );
};

export default Login;
