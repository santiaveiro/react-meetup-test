import { useEffect, useState } from 'react';
import Card from "../ui/Card";
import { useFetch } from "./../../util-hooks/useFetch";
import classes from "./MeetupItem.module.css";

export default function MeetupItem() {
  const { data } = useFetch({
    url: "/data.json",
  });

  const [isFavorite, setIsFavorite] = useState(false);

  // Efecto para verificar si este Meetup está en favoritos
  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    if (data) {
      const isFav = storedFavorites.some(favorite => favorite.id === data[0].id);
      setIsFavorite(isFav);
    }
  }, [data]);

  if (!data) return <p>Loading...</p>;
  let [item] = data;

  const toggleFavoriteStatusHandler = () => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];

    if (isFavorite) {
      // Si ya es favorito, lo quitamos de favoritos
      const updatedFavorites = storedFavorites.filter(fav => fav.id !== item.id);
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
      setIsFavorite(false);
    } else {
      // Si no es favorito, lo agregamos a favoritos
      storedFavorites.push(item);
      localStorage.setItem('favorites', JSON.stringify(storedFavorites));
      setIsFavorite(true);
    }

    // Disparamos un evento para notificar a otros componentes sobre el cambio
    window.dispatchEvent(new Event('storage'));
  };

  return (
    <li className={classes.item} data-test='meet-up-item'>
      <Card>
        <div className={classes.image}>
          <img src={item.image} alt={item.title} />
        </div>
        <div className={classes.content}>
          <h3>{item.title}</h3>
          <address>{item.address}</address>
          <p>{item.description}</p>
        </div>
        <div className={classes.actions}>
          <button onClick={toggleFavoriteStatusHandler}>
            {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
          </button>
        </div>
      </Card>
    </li>
  );
}
