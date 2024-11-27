import Profile from './pages/Profile';
import HeaderSide from './components/Header/components/HeaderSide';
import Header from './components/Header/Header';
import styles from './App.module.scss';

function App() {
    return (
        <div className={styles.container}>
            <Header />
            <main className={`${styles.main} d-flex`}>
                <HeaderSide />
                <Profile userId={18} />
            </main>
        </div>
    );
}

export default App;
