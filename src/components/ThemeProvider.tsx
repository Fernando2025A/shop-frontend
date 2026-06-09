import {  useContext, useState, useEffect, type ReactNode } from 'react';
import { ThemeContext } from '../context/ThemeContext';


export function ThemeProvider({ children }: { children: ReactNode }) {
  const apiUrl = import.meta.env.VITE_API_URL;
  
  // 1. Usamos un solo estado para controlar el fondo activo en la pantalla
  const [currentBackground, setCurrentBackground] = useState(() => {
    return localStorage.getItem('user-bg') || 'black.webp';
  });

  // 2. Traemos el fondo del usuario desde NestJS al cargar la app
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${apiUrl}/auth/me`, {
          credentials: "include",
        });
        const me = await res.json();
        if (me?.background) {
          // Si el backend tiene un avatar/fondo guardado, actualizamos el estado y el caché
          setCurrentBackground(me.background);
          localStorage.setItem('user-bg', me.background);
        }
        else{
          localStorage.setItem('user-bg', 'black.webp');
        }
      } catch (error) {
        console.error("Error al traer el fondo del usuario:", error);
      }
    };

    fetchData();
  }, [apiUrl]);

  // 3. Este useEffect ahora reacciona instantáneamente cuando cambia currentBackground
  useEffect(() => {
    if (currentBackground) {
      document.body.style.setProperty('--bg-app-image', `url('/images/${currentBackground}')`);
      localStorage.setItem('user-bg', currentBackground);
    }
  }, [currentBackground]); // 🔥 Escucha únicamente al fondo actual

  // 4. La función que dispara tu botón "Equipar"
  const changeBackground = (imgName: string) => {
    setCurrentBackground(imgName); // 🚀 Cambia el estado de React al instante (reactivo)
    
    // NOTA: Aquí es donde más adelante harás tu fetch (PUT/PATCH) a NestJS 
    // para guardar de verdad el nuevo fondo en la base de datos del usuario, ej:
    // fetch(`${apiUrl}/auth/update-bg`, { method: 'POST', body: ... })
  };

  return (
    <ThemeContext.Provider value={{ currentBackground, changeBackground }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme debe usarse dentro de ThemeProvider');
  return context;
};