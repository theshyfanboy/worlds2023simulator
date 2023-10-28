"use client";
import { React, useEffect, useState } from 'react';
import styles from '../page.module.css';
import Image from 'next/image'
import vsimage from '../../../public/teams/vs.png';

export default function BracketRound({ roundHistory, actionButton, roundStatus, roundCount }) {
    const [choices, setChoices] = useState([]);
    const [renderSwitch, setRenderSwitch] = useState(false);
    const addChoice = (choiceArray) => {
        var tempArray = [...choices]
        for (var i = 0; i < choiceArray.length; i++) {
            var currentChoice = choiceArray[i]
            var foundIndex = -1
            if (choices.length != 0) {
                foundIndex = tempArray.findIndex(obj => obj.cMatch.firstteam.name == currentChoice.match.firstteam.name && obj.cMatch.secondteam.name == currentChoice.match.secondteam.name && obj.roundwin == currentChoice.roundwin && obj.roundloss == currentChoice.roundloss)
            }
            if (foundIndex !== -1) {
                tempArray[foundIndex].picked = currentChoice.pick
            } else {
                const temp = {
                    cMatch: currentChoice.match,
                    picked: currentChoice.pick,
                    roundwin: currentChoice.roundwin,
                    roundloss: currentChoice.roundloss,
                }
                tempArray.push(temp)
            }
        }
        setChoices(tempArray);
    }

    useEffect(() => {
        if (!renderSwitch) {
            var temp = []
            for (var i = 0; i < roundHistory.length; i++) {
                var currentRound = roundHistory[i].matchList
                for (var j = 0; j < currentRound.length; j++) {
                    if (currentRound[j].winner !== null) {
                        temp.push({
                            match: currentRound[j],
                            pick: currentRound[j].winner.name == currentRound[j].firstteam.name ? 0 : 1,
                            roundwin: roundHistory[i].win,
                            roundloss: roundHistory[i].loss
                        })
                    }
                }
            }
            addChoice(temp);
        }
        setRenderSwitch(true);
    }, []);

    return <div className={styles.round} >
        {roundHistory.map((round) =>
            <div>
                <div className={styles.subround}>
                    <div className={styles.head}>
                        <div className={styles.headTitle2}>
                            {round.name}
                        </div>
                    </div>
                    <div>
                        {round.matchList.map((match) => {
                            return <div className={styles.match}>
                                {match.winner == match.firstteam ?
                                    <div className={styles.winner}>
                                        <Image width={55} src={match.firstteam.image} alt={match.firstteam.name} />
                                        <a className={styles.subtitle}>{match.firstteam.name}</a>
                                    </div>
                                    : match.winner !== null ?
                                        <div className={styles.selecting}>
                                            <Image width={55} src={match.firstteam.image} alt={match.firstteam.name} />
                                            <a className={styles.subtitle}>{match.firstteam.name}</a>
                                        </div>
                                        :
                                        choices.findIndex(obj => obj.cMatch.firstteam.name == match.firstteam.name && obj.cMatch.secondteam.name == match.secondteam.name && parseInt(obj.picked) == 0) !== -1 && match.winner != match.secondteam ?
                                            <div onClick={() => {
                                                addChoice([{
                                                    match: match, pick: 0, roundwin: round.win, roundloss: round.loss
                                                }])
                                            }} className={styles.winner}>
                                                <Image width={55} src={match.firstteam.image} alt={match.firstteam.name} />
                                                <a className={styles.subtitle}>{match.firstteam.name}</a>
                                            </div>
                                            :
                                            <div onClick={() => {
                                                addChoice([{
                                                    match: match, pick: 0, roundwin: round.win, roundloss: round.loss
                                                }])
                                            }} className={styles.selecting}>
                                                <Image width={55} src={match.firstteam.image} alt={match.firstteam.name} />
                                                <a className={styles.subtitle}>{match.firstteam.name}</a>
                                            </div>
                                }
                                <div className={styles.vsPad}>
                                    <Image width={40} src={vsimage} alt="vs" />
                                </div>
                                {match.winner == match.secondteam ?
                                    <div className={styles.winner}>
                                        <Image width={55} src={match.secondteam.image} alt={match.secondteam.name} />
                                        <a className={styles.subtitle}>{match.secondteam.name}</a>
                                    </div>
                                    : match.winner !== null ?
                                        <div className={styles.selecting}>
                                            <Image width={55} src={match.secondteam.image} alt={match.secondteam.name} />
                                            <a className={styles.subtitle}>{match.secondteam.name}</a>
                                        </div>
                                        :
                                        choices.findIndex(obj => obj.cMatch.firstteam.name == match.firstteam.name && obj.cMatch.secondteam.name == match.secondteam.name && parseInt(obj.picked) == 1) !== -1 && match.winner != match.firstteam ?
                                            <div onClick={() => {
                                                addChoice([{
                                                    match: match, pick: 1, roundwin: round.win, roundloss: round.loss
                                                }])
                                            }} className={styles.winner}>
                                                <Image width={55} src={match.secondteam.image} alt={match.secondteam.name} />
                                                <a className={styles.subtitle}>{match.secondteam.name}</a>
                                            </div>
                                            :
                                            <div onClick={() => {
                                                addChoice([{
                                                    match: match, pick: 1, roundwin: round.win, roundloss: round.loss
                                                }])
                                            }} className={styles.selecting}>
                                                <Image width={55} src={match.secondteam.image} alt={match.secondteam.name} />
                                                <a className={styles.subtitle}>{match.secondteam.name}</a>
                                            </div>
                                }
                            </div>
                        }
                        )}
                    </div>
                </div>
            </div>

        )}
        {!roundStatus ?
            <div className={styles.lockButtonContainer}>
                <button disabled={roundCount != choices.length} onClick={() => { actionButton(choices); }} className={styles.lockButton}>Lock in</button>
            </div> : <></>
        }
    </div >
}
