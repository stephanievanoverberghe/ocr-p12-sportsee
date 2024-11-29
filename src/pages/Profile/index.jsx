import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchUserData } from '../../services/dataService';
import ActivityChart from '../../components/ActivityChart/ActivityChart';
import AverageSession from '../../components/AverageSession/AverageSession';
import apple from '../../assets/img/apple.png';
import cheeseburger from '../../assets/img/cheeseburger.png';
import chicken from '../../assets/img//chicken.png';
import energy from '../../assets/img/energy.png';
import styles from './index.module.scss';

const Profile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const userId = parseInt(id, 10);
      const userData = await fetchUserData(userId, navigate);
      if (userData) {
        setUserName(userData.userInfos.firstName);
      }
    };

    fetchData();
  }, [id, navigate]);

  return (
    <div className={styles.profile}>
      <div>
        <h1>
          Bonjour <span className={styles.firstname}>{userName}</span>
        </h1>
        <p className={styles.paragraphe}>
          Félicitation ! Vous avez explosé vos objectifs hier 👏
        </p>
      </div>
      <div className={styles.datas}>
        <div className={styles.statistics}>
          <div className={styles.activities}>
            <ActivityChart />
          </div>
          <div className={`${styles.charts} d-flex justify-between`}>
            <div className={styles.average}>
              <AverageSession />
            </div>
            <div className={styles.performance}>Performance</div>
            <div className={styles.goals}>Objectifs</div>
          </div>
        </div>
        <div className={styles.nutrients}>
          <div className={`${styles.calories} d-flex align-center`}>
            <div className={styles.iconsCalories}>
              <img src={energy} alt="icone calories" />
            </div>
            <div className={`${styles.total} d-flex flex-column`}>
              <span className={styles.number}>1,930kCal</span>
              <span className={styles.name}>Calories</span>
            </div>
          </div>
          <div className={`${styles.proteins} d-flex align-center`}>
            <div className={styles.iconsProteins}>
              <img src={chicken} alt="icone protéines" />
            </div>
            <div className={`${styles.total} d-flex flex-column`}>
              <span className={styles.number}>155g</span>
              <span className={styles.name}>Protéines</span>
            </div>
          </div>
          <div className={`${styles.carbohydrates} d-flex align-center`}>
            <div className={styles.iconsCarbohydrates}>
              <img src={apple} alt="icone pomme" />
            </div>
            <div className={`${styles.total} d-flex flex-column`}>
              <span className={styles.number}>290g</span>
              <span className={styles.name}>Glucides</span>
            </div>
          </div>
          <div className={`${styles.lipids} d-flex align-center`}>
            <div className={styles.iconLipids}>
              <img src={cheeseburger} alt="icone cheeseburger" />
            </div>
            <div className={`${styles.total} d-flex flex-column`}>
              <span className={styles.number}>50g</span>
              <span className={styles.name}>Lipides</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
