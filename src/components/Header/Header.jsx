import styles from './Header.module.scss';
import logo from '../../assets/img/logo.png';

function Header() {
    return (
        <header className={`${styles.header} d-flex align-center`}>
            <img src={logo} alt="Logo SportSee" />

            <ul className={`${styles.headerItems} d-flex justify-around`}>
                <li className={styles.headerItem}>Accueil</li>
                <li className={styles.headerItem}>Profil</li>
                <li className={styles.headerItem}>Réglage</li>
                <li className={styles.headerItem}>Communauté</li>
            </ul>
        </header>
    );
}

export default Header;
