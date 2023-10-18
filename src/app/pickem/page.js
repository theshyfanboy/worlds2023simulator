"use client";
import PickemBracket from './pickemBracket'
import styles from '../page.module.css';

export default function PickemPlay() {
    return (
        <div className={styles.container}>
            <PickemBracket></PickemBracket>
        </div>
    );
}