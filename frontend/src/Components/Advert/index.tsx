// Dans votre fichier CardAdvert/index.jsx (ou tsx si vous utilisez TypeScript)
import './index.css'; // Assurez-vous que le chemin d'accès est correct

const CardAdvert = (props) => {
  // Destructurez les props selon les données attendues de votre backend
  const { title, message, location, time, duration, date } = props;

  return (
    <div class='card1'>
      <img src="./public/vite.svg" alt="Avatar" class="avatar" />
      <div id='des'>
      <div id='doc'>
        <h2>{title}</h2>
        <p>{message}</p> {/* Utilisation du message au lieu de subTitle */}
        <div class="details">
          <h4>{location}</h4>
          <span>{time}</span>
          <span>{duration}</span>
          <span>{date}</span>
        </div>
      </div>
      </div>
    </div>
  );
};

export default CardAdvert;
