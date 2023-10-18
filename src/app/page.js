
import PickemBracket from './pickemBracket'
import styles from './page.module.css';

export default function Home() {
    return (
        <div className={styles.container}>
            <div className={styles.topBorder}></div>
            <PickemBracket></PickemBracket>
        </div>
    );
}

export const metadata = {
    title: "Worlds 2023 Swiss Stage",
    description: "Simple Swiss Stage Prediction/Simualtor",
};