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
