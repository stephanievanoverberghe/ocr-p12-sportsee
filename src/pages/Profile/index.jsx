import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchUserData } from '../../services/dataService';
import ActivityChart from '../../components/ActivityChart/ActivityChart';
import AverageSession from '../../components/AverageSession/AverageSession';
import Perform from '../../components/Perform/Perform';
import Score from '../../components/Score/Score';
import Nutrient from '../../components/Nutrient/Nutrient';

import apple from '../../assets/img/apple.png';
import cheeseburger from '../../assets/img/cheeseburger.png';
import chicken from '../../assets/img/chicken.png';
import energy from '../../assets/img/energy.png';
import styles from './index.module.scss';

const Profile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const userId = parseInt(id, 10);
      const data = await fetchUserData(userId, navigate);
      if (data) {
        setUserData(data);
      }
    };

    fetchData();
  }, [id, navigate]);

  if (!userData) {
    return null;
  }

  const { calorieCount, proteinCount, carbohydrateCount, lipidCount } =
    userData.keyData;

  return (
    <div className={styles.profile}>
      <div>
        <h1>
          Bonjour{' '}
          <span className={styles.firstname}>
            {userData.userInfos.firstName}
          </span>
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
            <div className={styles.performance}>
              <Perform />
            </div>
            <div className={styles.goals}>
              <Score />
            </div>
          </div>
        </div>
        <div className={styles.nutrients}>
          <Nutrient
            icon={energy}
            value={`${calorieCount.toLocaleString('en-US')}kCal`}
            label="Calories"
            bgColor="var(--red-light)"
          />
          <Nutrient
            icon={chicken}
            value={`${proteinCount}g`}
            label="Proteines"
            bgColor="var(--blue-light)"
          />
          <Nutrient
            icon={apple}
            value={`${carbohydrateCount}g`}
            label="Glucides"
            bgColor="var(--yellow-light)"
          />
          <Nutrient
            icon={cheeseburger}
            value={`${lipidCount}g`}
            label="Lipides"
            bgColor="var(--pink-light)"
          />
        </div>
      </div>
    </div>
  );
};

export default Profile;
