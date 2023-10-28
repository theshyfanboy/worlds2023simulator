import styles from '../page.module.css';
import BracketStage from './bracketStage';

export default function Home() {
    return (
        <div className={styles.container}>
            <div className={styles.topBorder}></div>
            <BracketStage></BracketStage>
        </div>
    );
}

export const metadata = {
    title: "Worlds 2023 Bracket Stage",
    description: "Bracket Stage Prediction/Simualtor",
};