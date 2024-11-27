import styles from './HeaderSide.module.scss';
import yoga from '../../../assets/img/yoga.png';
import swim from '../../../assets/img/swim.png';
import bike from '../../../assets/img/bike.png';
import muscle from '../../../assets/img/muscle.png';

function HeaderSide() {
    return (
        <div className={`${styles.headerSide} d-flex flex-column align-center justify-between`}>
            <ul className={`${styles.sideItems} d-flex flex-column align-center justify-center`}>
                <li className={styles.sideItem}>
                    <img src={yoga} alt="Icone" />
                </li>
                <li className={styles.sideItem}>
                    <img src={swim} alt="Icone" />
                </li>
                <li className={styles.sideItem}>
                    <img src={bike} alt="Icone" />
                </li>
                <li className={styles.sideItem}>
                    <img src={muscle} alt="Icone" />
                </li>
            </ul>
            <p className={styles.copyright}>Copyright, SportSee 2020</p>
        </div>
    );
}

export default HeaderSide;
