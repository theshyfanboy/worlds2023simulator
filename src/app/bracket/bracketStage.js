"use client";
import { BracketStageTournament, Match, Team, Tournament } from "../pickemGame";
import { React, useEffect, useState } from 'react';
import BracketRound from "./bracketRound.js";
import Image from 'next/image'
import styles from '../page.module.css';

export default function BracketStage() {
    const [tourney, setTourney] = useState(new BracketStageTournament());
    const [roundState, setRoundState] = useState([]);
    const [stateSwitch, setStateSwitch] = useState(false);
    const [repeatSwitch, setRepeatSwitch] = useState(true);
    const [renderFirstSwitch, setRenderFirstSwitch] = useState(false)

    const roundPack = () => {
        const groupedData = tourney.roundList.reduce((result, item) => {
            const group = result.find((group) => group[0].number === item.number);
            if (!group) {
                result.push([item]);
            } else {
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
        if (!renderFirstSwitch) {
            setTourney(new BracketStageTournament(JSON.parse(localStorage.getItem("qualified"))))
            setRenderFirstSwitch(true)
        }
        if (tourney.ready && tourney.roundList.length != 0) {
            roundPack();
        }
    }, [stateSwitch, tourney]);

    return <div className={styles.container}>
        <div className={styles.topBorder}></div>
        <div>
            <div className={styles.runButtonContainer}>
                <button onClick={() => {
                    tourney.generateNextRoundRnd(repeatSwitch)
                    setStateSwitch(!stateSwitch)
                }
                }
                    className={styles.runButton}>
                    Completely Random
                </button>
                <button onClick={() => { setTourney(new BracketStageTournament(JSON.parse(localStorage.getItem("qualified")))); setRoundState([]); setStateSwitch(false); }} className={styles.runButton}>Reset</button>
            </div>

            <div className={styles.roundContainer}>
                {roundState.map((rounds) => {
                    var roundSum = 0
                    for (var i = 0; i < rounds.length; i++) {
                        roundSum += rounds[i].matchList.length
                    }
                    return <div>
                        <BracketRound roundHistory={rounds} actionButton={makePrediction} roundStatus={rounds[0].complete} roundCount={roundSum} />
                    </div>
                }

                )}
            </div>

            {
                <div className={styles.qualify}>
                    <div className={styles.qualifyHead}>
                        <div className={styles.qualifyHeadTitle}>
                            Worlds 2023 Winner
                        </div>
                    </div>

                    <div className={styles.qualifyBody}>
                        {
                            tourney.ready ? tourney.winner.map((team) =>
                                <div className={styles.imageContainer}>
                                    <Image width={60} src={team.image} alt={team.name} />
                                </div>

                            ) : <></>
                        }
                    </div>
                </div>
            }
            {
                <div className={styles.disqualify}>
                    <div className={styles.qualifyHead}>
                        <div className={styles.qualifyHeadTitle}>
                            Eliminated
                        </div>
                    </div>

                    <div className={styles.qualifyBody}>
                        {
                            tourney.ready ?
                                tourney.disqualified.map((team) =>
                                    <div className={styles.imageContainer}>
                                        <Image width={60} src={team.image} alt={team.name} />
                                    </div>

                                ) : <></>
                        }
                    </div>
                </div>
            }
        </div >
    </div>
}

export const metadata = {
    title: "Worlds 2023 Bracket Stage",
    description: "Bracket Stage Prediction/Simualtor",
};