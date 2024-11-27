import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchUserData } from '../../services/dataService';
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
      <h1>
        Bonjour <span className={styles.firstname}>{userName}</span>
      </h1>
      <p className={styles.paragraphe}>
        Félicitation ! Vous avez explosé vos objectifs hier 👏
      </p>
    </div>
  );
};

export default Profile;
