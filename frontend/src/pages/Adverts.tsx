import { createEffect, createSignal } from 'solid-js';
import CardAdvert from '../Components/Advert/index.tsx'; // Vérifiez le chemin d'accès
import './Adverts.css';

const AdvertsPage = () => {
  const [adverts, setAdverts] = createSignal([]);

  createEffect(() => {
    fetch('/api/adverts')
      .then(res => res.json())
      .then(data => setAdverts(data)) 
      .catch(err => console.error("API call failed:", err));
  });

  return (
    <div>
      <h1>Page Adverts</h1>
      <ul class="container">
        {adverts().map(ad => (
          // Assurez-vous que les champs passés correspondent aux données attendues par CardAdvert
          <CardAdvert key={ad.id} title={ad.title} message={ad.message} location={ad.location} time={ad.time} duration={ad.duration} date={ad.date} />
        ))}
      </ul>
    </div>
  );
}

export default AdvertsPage;
