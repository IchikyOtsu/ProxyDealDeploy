// App.tsx
import Navbar from './Components/Navbar/index.tsx';
import './style.css'
function App(props) {
  return (
    <div>
      <header id='header'><Navbar /></header>
      <main>{props.children}</main> {/* Conteneur principal pour le contenu des pages */}
    </div>
  );
}

export default App;
