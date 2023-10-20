"use client";
import { Team, Tournament } from "./pickemGame";
import { React, useEffect, useState } from 'react';
import styles from './page.module.css';
import Image from 'next/image'
import Round from "./round.js";

export default function PickemBracket() {
    const [tourney, setTourney] = useState(new Tournament());
    const [roundState, setRoundState] = useState([]);
    const [stateSwitch, setStateSwitch] = useState(false);
    const [repeatSwitch, setRepeatSwitch] = useState(true);

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
        tourney.predictRound(predictions, repeatSwitch);
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
                tourney.generateNextRound(repeatSwitch)
                setStateSwitch(!stateSwitch)
            }
            }
                className={styles.runButton}>
                Random (East Biased)
            </button>
            <button onClick={() => {
                tourney.generateNextRoundRnd(repeatSwitch)
                setStateSwitch(!stateSwitch)
            }
            }
                className={styles.runButton}>
                Completely Random
            </button>
            <button onClick={() => { setTourney(new Tournament); setRoundState([]); setStateSwitch(false); }} className={styles.runButton}>Reset</button>
            {/* <input className={styles.checkBox} type="checkbox" id="no-repeat" name="no-repeat" checked={!repeatSwitch} onChange={() => { setRepeatSwitch(!repeatSwitch) }} /><label className={styles.checkBoxLabel} htmlFor="no-repeat"> No Repeat Matches </label> */}
        </div>

        <div className={styles.roundContainer}>
            {roundState.map((rounds) => {
                var roundSum = 0
                for (var i = 0; i < rounds.length; i++) {
                    roundSum += rounds[i].matchList.length
                }
                return <div>
                    <Round roundHistory={rounds} actionButton={makePrediction} roundStatus={rounds[0].complete} roundCount={roundSum} />
                </div>
            }

            )}
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
        {tourney.disqualified.length != 0 ? <div className={styles.disqualify}>
            <div className={styles.qualifyHead}>
                <div className={styles.qualifyHeadTitle}>
                    Eliminated
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
