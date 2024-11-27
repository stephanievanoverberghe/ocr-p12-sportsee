import { useParams } from 'react-router-dom';
import styles from './index.module.scss';

function Error() {
  const { id } = useParams();

  return (
    <div
      className={`${styles.error} d-flex flex-column justify-center align-center`}
    >
      <h1 className={styles.title}>404</h1>
      <p className={styles.paragraphe}>
        Oups! La page que vous demandez n'existe pas.
      </p>
    </div>
  );
}

export default Error;
