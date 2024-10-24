import { useEffect, useState } from 'react';
import MeetupItem from '../components/meetups/MeetupItem';

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState([]);

  // Cargamos los favoritos de localStorage al montar el componente
  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(storedFavorites);

    // Listener para actualizar la lista si cambia localStorage
    const handleStorageChange = () => {
      const updatedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
      setFavorites(updatedFavorites);
    };

    window.addEventListener('storage', handleStorageChange);

    // Limpiar el listener cuando se desmonte el componente
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  if (favorites.length === 0) {
    return <p>You have no favorites yet. Start adding some!</p>;
  }

  return (
    <section>
      <h1>My Favorites</h1>
      <ul>
        {favorites.map((meetup) => (
          <MeetupItem key={meetup.id} item={meetup} />
        ))}
      </ul>
    </section>
  );
}
