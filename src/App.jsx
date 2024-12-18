/**
 * Composant principal de l'application.
 *
 * @component
 * @returns {JSX.Element} - Le layout principal de l'application, incluant l'en-tête, la barre latérale et la zone principale pour les pages.
 *
 * @requires Outlet - Hook de `react-router-dom` pour rendre les composants enfants selon la route active.
 * @requires Header - Composant pour l'en-tête.
 * @requires HeaderSide - Composant pour la barre latérale.
 */

import { Outlet } from 'react-router-dom';
import HeaderSide from './components/Header/components/HeaderSide';
import Header from './components/Header/Header';
import styles from './App.module.scss';

function App() {
  return (
    <div className={styles.container}>
      <Header />
      <main className={`${styles.main} d-flex`}>
        <HeaderSide />
        <Outlet />
      </main>
    </div>
  );
}

export default App;
