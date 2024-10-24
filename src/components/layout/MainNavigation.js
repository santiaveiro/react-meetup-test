import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import classes from "./MainNavigation.module.css";

export default function MainNavigation() {
  const [favoritesCount, setFavoritesCount] = useState(0);

  useEffect(() => {
    // Cargamos los favoritos de localStorage al montar el componente
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavoritesCount(storedFavorites.length);

    // Listener para detectar cambios en localStorage
    const handleStorageChange = () => {
      const updatedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
      setFavoritesCount(updatedFavorites.length);
    };

    // Añadir un listener para escuchar cambios en localStorage
    window.addEventListener('storage', handleStorageChange);

    // Cleanup del listener al desmontar
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  return (
    <header className={classes.header} data-test="navigation-header">
      <div className={classes.logo}>React Meetups</div>
      <nav>
        <ul>
          <li>
            <Link to="/">All Meetups</Link>
          </li>
          <li>
            <Link to="/new-meetup">Add New Meetup</Link>
          </li>
          <li>
            <Link to="/favorites">
              My Favorites
              <span className={classes.badge}>{favoritesCount}</span> {/* Dinámico */}
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
