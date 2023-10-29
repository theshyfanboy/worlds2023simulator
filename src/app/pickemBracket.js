"use client";
import { Team, Tournament } from "./pickemGame";
import { React, useEffect, useState } from 'react';
import styles from './page.module.css';
import Image from 'next/image'
import Round from "./round.js";
import { useRouter } from 'next/navigation'

export default function PickemBracket() {
    const [tourney, setTourney] = useState(new Tournament());
    const [roundState, setRoundState] = useState([]);
    const [stateSwitch, setStateSwitch] = useState(false);
    const [repeatSwitch, setRepeatSwitch] = useState(true);
    const [qualified, setQualified] = useState([])
    const router = useRouter()

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
        if (tourney.qualified.length === 8) {
            setQualified([...tourney.qualified])
            localStorage.setItem("qualified", JSON.stringify([...tourney.qualified]))
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
            <button onClick={() => { setTourney(new Tournament); setRoundState([]); setStateSwitch(false); setQualified([]); }} className={styles.runButton}>Reset</button>
            {qualified.length === 8 ? <button onClick={() => { router.push('/bracket') }} className={styles.runBracketButton}>Goto BracketStage</button> : <></>}
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
