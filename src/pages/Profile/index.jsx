import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { fetchUserData } from '../../services/dataService';
import styles from './index.module.scss';

const Profile = ({ userId }) => {
    const [userName, setUserName] = useState('');
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userData = await fetchUserData(userId);
                if (userData) {
                    setUserName(userData.userInfos.firstName);
                }
            } catch (err) {
                setError('Impossible de récupérer les données utilisateur.', err);
            }
        };

        fetchData();
    }, [userId]);

    return (
        <div className={styles.profile}>
            {error ? (
                <p className={styles.error}>{error}</p>
            ) : (
                <>
                    <h1>
                        Bonjour <span className={styles.firstname}>{userName}</span>
                    </h1>
                    <p className={styles.paragraphe}>Félicitation ! Vous avez explosé vos objectifs hier 👏</p>
                </>
            )}
        </div>
    );
};

// Validation des props
Profile.propTypes = {
    userId: PropTypes.number.isRequired,
};

export default Profile;
