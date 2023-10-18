"use client";
import { Team, Tournament } from "./pickemGame";
import { React, useEffect, useState } from 'react';
import styles from '../page.module.css';
import Image from 'next/image'
import Round from "./round.js";
import Link from 'next/link';

export default function PickemBracket() {
    const [tourney, setTourney] = useState(new Tournament());
    const [roundState, setRoundState] = useState([]);
    const [stateSwitch, setStateSwitch] = useState(false);

    const roundPack = () => {
        const groupedData = tourney.roundList.reduce((result, item) => {
            // Find the group with the matching 'category'
            const group = result.find((group) => group[0].number === item.number);

            // If a group with the category doesn't exist, create a new group
            if (!group) {
                result.push([item]);
            } else {
                // Add the item to the existing group
                group.push(item);
            }

            return result;
        }, []);
        setRoundState(groupedData);
    }

    const makePrediction = (predictions) => {
        tourney.predictRound(predictions);
        setStateSwitch(!stateSwitch)
    }

    useEffect(() => {
        if (tourney.roundList.length != 0) {
            roundPack();
        }
    }, [stateSwitch, tourney]);

    return <div>
        <div className={styles.runButtonContainer}>
            <button onClick={() => {
                tourney.generateNextRound()
                setStateSwitch(!stateSwitch)
            }
            }
                className={styles.runButton}>
                GetNextRound
            </button>
            <button onClick={() => { window.location.reload(); }} className={styles.runButton}>Reset</button>
            <Link href="/" className={styles.playButton}>Go to Randomizer</Link>
        </div>
        {
            tourney.qualified.length != 0 ? <div className={styles.qualify}>
                <div className={styles.qualifyHead}>
                    <div className={styles.qualifyHeadTitle}>
                        Qualified
                    </div>
                </div>

                <div className={styles.qualifyBody}>
                    {
                        tourney.qualified.map((team) =>
                            <div className={styles.imageContainer}>
                                <Image width={60} src={team.image} alt={team.name} />
                            </div>

                        )
                    }
                </div>
            </div> : <></>
        }
        <div className={styles.roundContainer}>
            {roundState.map((rounds) =>
                <div>
                    <Round roundHistory={rounds} actionButton={makePrediction} roundStatus={rounds[0].complete} />
                </div>
            )}
        </div>

        {tourney.disqualified.length != 0 ? <div className={styles.disqualify}>
            <div className={styles.qualifyHead}>
                <div className={styles.qualifyHeadTitle}>
                    Disqualified
                </div>
            </div>

            <div className={styles.qualifyBody}>
                {
                    tourney.disqualified.map((team) =>
                        <div className={styles.imageContainer}>
                            <Image width={60} src={team.image} alt={team.name} />
                        </div>

                    )
                }
            </div>
        </div> : <></>}
    </div >
} 
