"use client";
import t1logo from '../../public/teams/webp/t1.webp';
import tllogo from '../../public/teams/webp/tl.webp';
import c9logo from '../../public/teams/webp/c9.webp';
import madlogo from '../../public/teams/webp/mad.webp';
import genglogo from '../../public/teams/webp/geng.webp';
import gamlogo from '../../public/teams/webp/gam.webp';
import jdglogo from '../../public/teams/webp/jdg.webp';
import bdslogo from '../../public/teams/webp/bds.webp';
import g2logo from '../../public/teams/webp/g2.webp';
import dwglogo from '../../public/teams/webp/dwg.webp';
import nrglogo from '../../public/teams/webp/nrg.webp';
import wbglogo from '../../public/teams/webp/wbg.webp';
import fnclogo from '../../public/teams/webp/fnc.webp';
import lnglogo from '../../public/teams/webp/lng.webp';
import blglogo from '../../public/teams/webp/blg.webp';
import ktlogo from '../../public/teams/webp/kt.webp';
import next from 'next';

export class Team {
    constructor(name, region, imageObj) {
        this.name = name;
        this.region = region;
        this.wins = 0;
        this.loss = 0;
        this.image = imageObj;
    }
}

export function RuleBook(first, second) {
    if (first.region === second.region) {
        return Math.floor(Math.random() * 2);
    }

    if (first.region === 'East') {
        return 0;
    }

    if (second.region === 'East') {
        return 1;
    }

    if (first.region === 'G2') {
        return 0;
    }

    if (second.region === 'G2') {
        return 1;
    }

    return Math.floor(Math.random() * 2);
}

export class Match {
    constructor(first, second, winner = null, loser = null) {
        this.firstteam = first;
        this.secondteam = second;
        this.winner = winner;
        this.loser = loser;
    }

    setWinner(winner) {
        if (winner === 0) {
            this.winner = this.firstteam;
            this.loser = this.secondteam;
            this.firstteam.wins += 1;
            this.secondteam.loss += 1;
        } else if (winner === 1) {
            this.winner = this.secondteam;
            this.loser = this.firstteam;
            this.secondteam.wins += 1;
            this.firstteam.loss += 1;
        }
    }
}

export class Round {
    constructor(matchesToAdd, roundNumber, win = -1, loss = -1) {
        this.complete = false;
        this.matchList = matchesToAdd;
        this.teamPlaying = [];
        this.win = win;
        this.loss = loss;
        this.number = roundNumber;
    }

    insertMatch(matches) {
        if (matches.length !== 0) {
            for (let i = 0; i < matches.length; i++) {
                this.matchList.push(matches[i]);
            }
        }
    }

    insertTeams(teamsToInsert) {
        if (teamsToInsert.length !== 0) {
            for (let i = 0; i < teamsToInsert.length; i++) {
                this.teamPlaying.push(teamsToInsert[i]);
                this.win = teamsToInsert[i].wins;
                this.loss = teamsToInsert[i].loss;
            }
        }
    }

    makeComplete() {
        this.complete = true;
    }
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function pairObjects(arr, disallowedPairs, repeatMatch) {
    console.log("Matches Repeat" + repeatMatch)
    const validPairs = [];
    const unpairedElements = [...arr];

    while (unpairedElements.length >= 2) {
        const currentElement = unpairedElements.pop();

        for (let i = 0; i < unpairedElements.length; i++) {
            const nextElement = unpairedElements[i];

            if (repeatMatch) {
                validPairs.push([currentElement, nextElement]);
                unpairedElements.splice(i, 1);
                break;
            } else {
                if (
                    disallowedPairs.findIndex(obj => (obj.firstteam == currentElement && obj.secondteam == nextElement) || (obj.firstteam == nextElement && obj.secondteam == currentElement)) == -1
                ) {
                    validPairs.push([currentElement, nextElement]);
                    unpairedElements.splice(i, 1);
                    break;
                }
            }
        }
    }
    return validPairs;
}

export class Tournament {
    constructor() {
        const blg = new Team('BLG', 'East', blglogo);
        const c9 = new Team('C9', 'West', c9logo);
        const dwg = new Team('DWG', 'East', dwglogo);
        const fnc = new Team('FNC', 'West', fnclogo);
        const g2 = new Team('G2', 'G2', g2logo);
        const gam = new Team('GAM', 'West', gamlogo);
        const geng = new Team('GENG', 'East', genglogo);
        const jdg = new Team('JDG', 'East', jdglogo);
        const kt = new Team('KT', 'East', ktlogo);
        const lng = new Team('LNG', 'East', lnglogo);
        const mad = new Team('MAD', 'West', madlogo);
        const nrg = new Team('NRG', 'West', nrglogo);
        const t1 = new Team('T1', 'East', t1logo);
        const bds = new Team('BDS', 'West', bdslogo);
        const tl = new Team('TL', 'West', tllogo);
        const wbg = new Team('WBG', 'East', wbglogo);

        this.roundList = [];
        this.qualified = [];
        this.disqualified = [];
        this.roundNo = 3;

        const tempMatch1 = new Match(t1, tl)
        const tempMatch2 = new Match(c9, mad)
        const tempMatch3 = new Match(geng, gam)
        const tempMatch4 = new Match(jdg, bds)
        const tempMatch5 = new Match(g2, dwg)
        const tempMatch6 = new Match(nrg, wbg)
        const tempMatch7 = new Match(fnc, lng)
        const tempMatch8 = new Match(blg, kt)

        const matchList = [
            tempMatch1, tempMatch2, tempMatch3, tempMatch4, tempMatch5, tempMatch6, tempMatch7, tempMatch8
        ];

        const tempRound = new Round(matchList, 1, 0, 0);
        tempRound.insertTeams([
            t1,
            tl,
            c9,
            mad,
            geng,
            gam,
            jdg,
            bds,
            g2,
            dwg,
            nrg,
            wbg,
            fnc,
            lng,
            blg,
            kt,
        ]);


        tempMatch1.setWinner(0)
        tempMatch2.setWinner(0)
        tempMatch3.setWinner(0)
        tempMatch4.setWinner(0)
        tempMatch5.setWinner(0)
        tempMatch6.setWinner(1)
        tempMatch7.setWinner(1)
        tempMatch8.setWinner(0)

        tempRound.makeComplete()
        this.roundList.push(tempRound);

        const tempMatch9 = new Match(g2, wbg)
        const tempMatch10 = new Match(jdg, blg)
        const tempMatch11 = new Match(c9, lng)
        const tempMatch12 = new Match(geng, t1)

        const matchList2 = [
            tempMatch9, tempMatch10, tempMatch11, tempMatch12,
        ];

        const tempRound2 = new Round(matchList2, 2, 1, 0)

        tempRound2.insertTeams([
            t1,
            c9,
            geng,
            jdg,
            g2,
            wbg,
            lng,
            blg,
        ]);

        tempMatch9.setWinner(0)
        tempMatch10.setWinner(0)
        tempMatch11.setWinner(1)
        tempMatch12.setWinner(0)

        tempRound2.makeComplete()
        this.roundList.push(tempRound2);

        const tempMatch13 = new Match(nrg, tl)
        const tempMatch14 = new Match(kt, dwg)
        const tempMatch15 = new Match(mad, bds)
        const tempMatch16 = new Match(fnc, gam)

        const matchList3 = [
            tempMatch13, tempMatch14, tempMatch15, tempMatch16
        ];

        const tempRound3 = new Round(matchList3, 2, 0, 1)

        tempRound3.insertTeams([
            tl,
            mad,
            gam,
            bds,
            dwg,
            nrg,
            fnc,
            kt,
        ]);

        tempMatch13.setWinner(0)
        tempMatch14.setWinner(0)
        tempMatch15.setWinner(0)
        tempMatch16.setWinner(0)

        tempRound3.makeComplete()
        this.roundList.push(tempRound3);

        const tempMatch17 = new Match(jdg, lng, jdg, lng)
        const tempMatch18 = new Match(g2, geng, geng, g2)

        const matchList4 = [tempMatch17, tempMatch18]

        const tempRound4 = new Round(matchList4, 3)

        tempRound4.insertTeams([
            jdg, lng, g2, geng
        ]);

        this.roundList.push(tempRound4)


        const tempMatch19 = new Match(t1, c9)
        const tempMatch20 = new Match(nrg, mad)
        const tempMatch21 = new Match(blg, fnc)
        const tempMatch22 = new Match(kt, wbg)

        const matchList5 = [tempMatch19, tempMatch20, tempMatch21, tempMatch22]

        const tempRound5 = new Round(matchList5, 3)

        tempRound5.insertTeams([
            t1, c9, nrg, mad, blg, fnc, kt, wbg
        ]);

        // tempMatch19.setWinner(0)
        // tempMatch20.setWinner(1)
        // tempMatch21.setWinner(0)
        // tempMatch22.setWinner(0)
        // tempRound5.makeComplete()
        this.roundList.push(tempRound5)

        const tempMatch23 = new Match(tl, gam)
        const tempMatch24 = new Match(dwg, bds)

        const matchList6 = [tempMatch23, tempMatch24]

        const tempRound6 = new Round(matchList6, 3)

        tempRound6.insertTeams([
            tl, gam, dwg, bds
        ]);

        // tempMatch23.setWinner(0)
        // tempMatch24.setWinner(0)
        // tempRound6.makeComplete()
        this.roundList.push(tempRound6)
    }

    predictRound(predictions, repeatMatch = true) {
        const tempList = [];
        for (let i = 0; i < this.roundList.length; i++) {
            const temp = this.roundList[i];
            if (temp.complete === true) {
                continue;
            }

            const upper = [];
            const lower = [];

            for (let j = 0; j < predictions.length; j++) {
                if (temp.win == predictions[j].roundwin && temp.loss == predictions[j].roundloss) {
                    for (let i = 0; i < temp.matchList.length; i++) {
                        console.log(temp.matchList[i])
                        if (predictions[j].cMatch.firstteam.name == temp.matchList[i].firstteam.name && predictions[j].cMatch.secondteam.name == temp.matchList[i].secondteam.name) {
                            temp.matchList[i].setWinner(parseInt(predictions[j].picked));
                            if (temp.matchList[i].winner.wins < 3) {
                                upper.push(temp.matchList[i].winner);
                            } else if (temp.matchList[i].winner.wins === 3) {
                                this.qualified.push(temp.matchList[i].winner);
                            }
                            if (temp.matchList[i].loser.loss < 3) {
                                lower.push(temp.matchList[i].loser);
                            } else if (temp.matchList[i].loser.loss === 3) {
                                this.disqualified.push(temp.matchList[i].loser);
                            }
                            break;
                        }
                    }
                }
            }

            const upperRound = new Round([], this.roundNo + 1);
            let upperSwap = true;
            let upperIndex = -1;
            const lowerRound = new Round([], this.roundNo + 1);
            let lowerSwap = true;
            let lowerIndex = -1;

            if (upper.length !== 0) {
                for (let i = 0; i < tempList.length; i++) {
                    if (
                        tempList[i].win === upper[0].wins &&
                        tempList[i].loss === upper[0].loss
                    ) {
                        upperIndex = i;
                        upperSwap = false;
                        break;
                    }
                }

                if (upper.length !== 0 && upperSwap) {
                    upperRound.insertTeams(upper);
                    tempList.push(upperRound);
                } else if (upper.length !== 0 && !upperSwap) {
                    tempList[upperIndex].insertTeams(upper);
                }
            }

            if (lower.length !== 0) {
                for (let i = 0; i < tempList.length; i++) {
                    if (
                        tempList[i].win === lower[0].wins &&
                        tempList[i].loss === lower[0].loss
                    ) {
                        lowerIndex = i;
                        lowerSwap = false;
                        break;
                    }
                }

                if (lower.length !== 0 && lowerSwap) {
                    lowerRound.insertTeams(lower);
                    tempList.push(lowerRound);
                } else if (lower.length !== 0 && !lowerSwap) {
                    tempList[lowerIndex].insertTeams(lower);
                }
            }

            temp.makeComplete();
        }

        let allMatches = []
        for (let i = 0; i < this.roundList.length; i++) {
            let currentRound = this.roundList[i].matchList
            for (let j = 0; j < currentRound.length; j++) {
                allMatches.push(currentRound[j]);
            }
        }

        for (let i = 0; i < tempList.length; i++) {
            const current = tempList[i].teamPlaying;
            shuffleArray(current);
            let matchPairs = pairObjects(current, allMatches, repeatMatch);

            for (let j = 0; j < matchPairs.length; j++) {
                tempList[i].insertMatch([new Match(matchPairs[j][0], matchPairs[j][1])]);
            }

            // for (let j = 0; j < current.length; j += 2) {
            //     tempList[i].insertMatch([new Match(current[j], current[j + 1])]);
            // }
        }

        for (let i = 0; i < tempList.length; i++) {
            this.roundList.push(tempList[i]);
        }

        this.roundNo += 1
    }

    generateNextRoundRnd(repeatMatch = true) {
        const tempList = [];
        for (let i = 0; i < this.roundList.length; i++) {
            const temp = this.roundList[i];
            if (temp.complete === true) {
                continue;
            }

            const upper = [];
            const lower = [];
            for (let i = 0; i < temp.matchList.length; i++) {
                const rd = Math.floor(Math.random() * 2);
                temp.matchList[i].setWinner(rd);
                if (temp.matchList[i].winner.wins < 3) {
                    upper.push(temp.matchList[i].winner);
                } else if (temp.matchList[i].winner.wins === 3) {
                    this.qualified.push(temp.matchList[i].winner);
                }
                if (temp.matchList[i].loser.loss < 3) {
                    lower.push(temp.matchList[i].loser);
                } else if (temp.matchList[i].loser.loss === 3) {
                    this.disqualified.push(temp.matchList[i].loser);
                }
            }

            const upperRound = new Round([], this.roundNo + 1);
            let upperSwap = true;
            let upperIndex = -1;
            const lowerRound = new Round([], this.roundNo + 1);
            let lowerSwap = true;
            let lowerIndex = -1;

            if (upper.length !== 0) {
                for (let i = 0; i < tempList.length; i++) {
                    if (
                        tempList[i].win === upper[0].wins &&
                        tempList[i].loss === upper[0].loss
                    ) {
                        upperIndex = i;
                        upperSwap = false;
                        break;
                    }
                }

                if (upper.length !== 0 && upperSwap) {
                    upperRound.insertTeams(upper);
                    tempList.push(upperRound);
                } else if (upper.length !== 0 && !upperSwap) {
                    tempList[upperIndex].insertTeams(upper);
                }
            }

            if (lower.length !== 0) {
                for (let i = 0; i < tempList.length; i++) {
                    if (
                        tempList[i].win === lower[0].wins &&
                        tempList[i].loss === lower[0].loss
                    ) {
                        lowerIndex = i;
                        lowerSwap = false;
                        break;
                    }
                }

                if (lower.length !== 0 && lowerSwap) {
                    lowerRound.insertTeams(lower);
                    tempList.push(lowerRound);
                } else if (lower.length !== 0 && !lowerSwap) {
                    tempList[lowerIndex].insertTeams(lower);
                }
            }

            temp.makeComplete();
        }
        let allMatches = []
        for (let i = 0; i < this.roundList.length; i++) {
            let currentRound = this.roundList[i].matchList
            for (let j = 0; j < currentRound.length; j++) {
                allMatches.push(currentRound[j]);
            }
        }
        for (let i = 0; i < tempList.length; i++) {
            const current = tempList[i].teamPlaying;
            shuffleArray(current);
            let matchPairs = pairObjects(current, allMatches, repeatMatch);

            for (let j = 0; j < matchPairs.length; j++) {
                tempList[i].insertMatch([new Match(matchPairs[j][0], matchPairs[j][1])]);
            }
        }

        for (let i = 0; i < tempList.length; i++) {
            this.roundList.push(tempList[i]);
        }

        this.roundNo += 1
    }
    generateNextRound(repeatMatch = true) {
        const tempList = [];
        for (let i = 0; i < this.roundList.length; i++) {
            const temp = this.roundList[i];
            if (temp.complete === true) {
                continue;
            }

            const upper = [];
            const lower = [];
            for (let i = 0; i < temp.matchList.length; i++) {
                // const rd = parseInt(prompt());
                const rd = RuleBook(temp.matchList[i].firstteam, temp.matchList[i].secondteam);
                temp.matchList[i].setWinner(rd);
                if (temp.matchList[i].winner.wins < 3) {
                    upper.push(temp.matchList[i].winner);
                } else if (temp.matchList[i].winner.wins === 3) {
                    this.qualified.push(temp.matchList[i].winner);
                }
                if (temp.matchList[i].loser.loss < 3) {
                    lower.push(temp.matchList[i].loser);
                } else if (temp.matchList[i].loser.loss === 3) {
                    this.disqualified.push(temp.matchList[i].loser);
                }
            }

            const upperRound = new Round([], this.roundNo + 1);
            let upperSwap = true;
            let upperIndex = -1;
            const lowerRound = new Round([], this.roundNo + 1);
            let lowerSwap = true;
            let lowerIndex = -1;

            if (upper.length !== 0) {
                for (let i = 0; i < tempList.length; i++) {
                    if (
                        tempList[i].win === upper[0].wins &&
                        tempList[i].loss === upper[0].loss
                    ) {
                        upperIndex = i;
                        upperSwap = false;
                        break;
                    }
                }

                if (upper.length !== 0 && upperSwap) {
                    upperRound.insertTeams(upper);
                    tempList.push(upperRound);
                } else if (upper.length !== 0 && !upperSwap) {
                    tempList[upperIndex].insertTeams(upper);
                }
            }

            if (lower.length !== 0) {
                for (let i = 0; i < tempList.length; i++) {
                    if (
                        tempList[i].win === lower[0].wins &&
                        tempList[i].loss === lower[0].loss
                    ) {
                        lowerIndex = i;
                        lowerSwap = false;
                        break;
                    }
                }

                if (lower.length !== 0 && lowerSwap) {
                    lowerRound.insertTeams(lower);
                    tempList.push(lowerRound);
                } else if (lower.length !== 0 && !lowerSwap) {
                    tempList[lowerIndex].insertTeams(lower);
                }
            }

            temp.makeComplete();
        }
        let allMatches = []
        for (let i = 0; i < this.roundList.length; i++) {
            let currentRound = this.roundList[i].matchList
            for (let j = 0; j < currentRound.length; j++) {
                allMatches.push(currentRound[j]);
            }
        }
        for (let i = 0; i < tempList.length; i++) {
            const current = tempList[i].teamPlaying;
            shuffleArray(current);
            let matchPairs = pairObjects(current, allMatches, repeatMatch);

            for (let j = 0; j < matchPairs.length; j++) {
                tempList[i].insertMatch([new Match(matchPairs[j][0], matchPairs[j][1])]);
            }
        }

        for (let i = 0; i < tempList.length; i++) {
            this.roundList.push(tempList[i]);
        }

        this.roundNo += 1
    }
}