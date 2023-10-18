"use client";
import styles from './page.module.css';
import Image from 'next/image'
import vsimage from '../../public/teams/vs.png';

export default function Round({ roundHistory }) {
    return <div className={styles.round} >
        {roundHistory.map((round) =>
            <div className={styles.subround}>
                <div className={styles.head}>
                    <div className={styles.headTitle}>
                        {round.win} - {round.loss}
                    </div>
                </div>
                <div>
                    {round.matchList.map((match) => {
                        return <div className={styles.match}>
                            {match.winner == match.firstteam ?
                                <div className={styles.winner}>
                                    <Image width={65} src={match.firstteam.image} alt={match.firstteam.name} />
                                </div>
                                :
                                <div >
                                    <Image width={65} src={match.firstteam.image} alt={match.firstteam.name} />
                                </div>
                            }
                            <div className={styles.vsPad}>
                                <Image width={40} src={vsimage} alt="vs" />
                            </div>
                            {match.winner == match.secondteam ?
                                <div className={styles.winner}>
                                    <Image width={65} src={match.secondteam.image} alt={match.secondteam.name} />
                                </div>
                                :
                                <div >
                                    <Image width={65} src={match.secondteam.image} alt={match.secondteam.name} />
                                </div>
                            }
                        </div>
                    }
                    )}
                </div>
            </div>
        )}
    </div >
}
