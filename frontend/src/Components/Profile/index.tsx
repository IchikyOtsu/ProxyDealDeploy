import './index.css'; 
const Profile = ({ name, bio, profilePicture }) => {
  return (
    <div class="profile-card">
      <div class="left-section">
        <img src={profilePicture} alt="Profile" class="profile-picture" />
      </div>
      <div class="right-section">
        <div class="input-group">
          <div id="nom">
            <label for="nom-input">Nom</label>
            <input id="nom-input" type="text" placeholder="Nom de famille"/>
          </div>
          <div id="prenom">
            <label for="prenom-input">Prénom</label>
            <input id="prenom-input" type="text" placeholder="Prénom"/>
          </div>
        </div>
        <div id="mail">
          <label for="mail-input">Adresse mail</label>
          <input id="mail-input" type="email" placeholder="nomprenom@gmail.com"/>
        </div>
        <div id="competences">
          <label for="competences-input">Compétences</label>
          <input id="competences-input" type="text" placeholder="Ex: Informatique"/>
        </div>
        <div class="input-group">
          <div id="ville">
            <label for="ville-input">Ville</label>
            <select id="ville-input">
              <option>Bruxelles</option>
              <option>Louvain-La-Neuve</option>
            </select>
          </div>
          <div id="code-postal">
            <label for="code-postal-input">Code Postal</label>
            <input id="code-postal-input" type="number" placeholder="9999"/>
          </div>
        </div>
        <div id="adresse">
          <label for="adresse-input">Adresse</label>
          <input id="adresse-input" type="text" placeholder="Rue de la place, 14"/>
        </div>
        <div id="documents">
          <label for="documents-input">Documents</label>
          <input id="documents-input" type="file" accept="image/png, image/jpeg" multiple />
        </div>
      </div>

      {/*<h2>{name}</h2>*/}
      {/*<p>{bio}</p>*/}
    </div>
  );
};

export default Profile;
