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
        this.name = ""
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
        this.roundNo = 5;

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

        //Round 1
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

        //Round 2
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


        //Round 2
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


        //Round 3
        const tempMatch17 = new Match(jdg, lng)
        const tempMatch18 = new Match(g2, geng)

        const matchList4 = [tempMatch17, tempMatch18]

        const tempRound4 = new Round(matchList4, 3)

        tempRound4.insertTeams([
            jdg, lng, g2, geng
        ]);

        tempMatch17.setWinner(0)
        tempMatch18.setWinner(1)

        this.qualified.push(jdg)
        this.qualified.push(geng)

        tempRound4.makeComplete()
        this.roundList.push(tempRound4)


        //Round 3
        const tempMatch19 = new Match(t1, c9, t1, c9)
        const tempMatch20 = new Match(nrg, mad)
        const tempMatch21 = new Match(blg, fnc)
        const tempMatch22 = new Match(kt, wbg)

        const matchList5 = [tempMatch19, tempMatch20, tempMatch21, tempMatch22]

        const tempRound5 = new Round(matchList5, 3)

        tempRound5.insertTeams([
            t1, c9, nrg, mad, blg, fnc, kt, wbg
        ]);

        tempMatch19.setWinner(0)
        tempMatch20.setWinner(0)
        tempMatch21.setWinner(0)
        tempMatch22.setWinner(0)
        tempRound5.makeComplete()
        this.roundList.push(tempRound5)

        //Round 3
        const tempMatch23 = new Match(tl, gam)
        const tempMatch24 = new Match(dwg, bds)

        const matchList6 = [tempMatch23, tempMatch24]

        const tempRound6 = new Round(matchList6, 3)

        tempRound6.insertTeams([
            tl, gam, dwg, bds
        ]);

        tempMatch23.setWinner(1)
        tempMatch24.setWinner(0)

        this.disqualified.push(tl)
        this.disqualified.push(bds)

        tempRound6.makeComplete()
        this.roundList.push(tempRound6)

        //Round 4
        const tempMatch25 = new Match(kt, lng)
        const tempMatch26 = new Match(nrg, g2)
        const tempMatch27 = new Match(t1, blg)

        const matchList7 = [tempMatch25, tempMatch26, tempMatch27]

        const tempRound7 = new Round(matchList7, 4)

        tempRound7.insertTeams([
            kt, lng, nrg, g2, t1, blg
        ]);

        this.qualified.push(lng)
        this.qualified.push(nrg)
        this.qualified.push(t1)

        tempMatch25.setWinner(1)
        tempMatch26.setWinner(0)
        tempMatch27.setWinner(0)

        tempRound7.makeComplete()
        this.roundList.push(tempRound7)

        //Round 4
        const tempMatch28 = new Match(c9, fnc)
        const tempMatch29 = new Match(mad, wbg)
        const tempMatch30 = new Match(dwg, gam)

        const matchList8 = [tempMatch28, tempMatch29, tempMatch30]

        const tempRound8 = new Round(matchList8, 4)

        tempRound8.insertTeams([
            c9, fnc, mad, wbg, dwg, gam
        ]);

        this.disqualified.push(c9)
        this.disqualified.push(mad)
        this.disqualified.push(gam)

        tempMatch28.setWinner(1)
        tempMatch29.setWinner(1)
        tempMatch30.setWinner(0)

        tempRound8.makeComplete()
        this.roundList.push(tempRound8)

        //Round 5
        const tempMatch31 = new Match(kt, dwg)
        const tempMatch32 = new Match(fnc, wbg)
        const tempMatch33 = new Match(g2, blg)

        const matchList9 = [tempMatch31, tempMatch32, tempMatch33]

        const tempRound9 = new Round(matchList9, 5)

        tempRound9.insertTeams([
            kt, g2, blg, c9, mad, dwg
        ]);

        tempMatch31.setWinner(0)
        tempMatch32.setWinner(1)
        tempMatch33.setWinner(1)

        this.qualified.push(kt)
        this.qualified.push(wbg)
        this.qualified.push(blg)

        this.disqualified.push(dwg)
        this.disqualified.push(fnc)
        this.disqualified.push(g2)

        tempRound9.makeComplete()
        this.roundList.push(tempRound9)

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

        return this.qualified.length == 8
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

const findMissingNumber = (subarray) => {
    const allNumbers = [5, 6, 7];
    for (const number of allNumbers) {
        if (!subarray.includes(number)) {
            return number;
        }
    }
    return null; // If all numbers are found, there is no missing number
}

const choices = [[5, 6], [6, 7], [5, 7], [6, 5], [7, 6], [7, 5]]

export class BracketStageTournament {
    constructor(qualified) {
        this.ready = true
        this.roundNo = 3;
        this.roundList = []
        this.winner = []
        this.disqualified = []

        const blg2 = new Team('BLG', 'East', blglogo);
        const geng2 = new Team('GENG', 'East', genglogo);
        const jdg2 = new Team('JDG', 'East', jdglogo);
        const kt2 = new Team('KT', 'East', ktlogo);
        const lng2 = new Team('LNG', 'East', lnglogo);
        const nrg2 = new Team('NRG', 'West', nrglogo);
        const t12 = new Team('T1', 'East', t1logo);
        const wbg2 = new Team('WBG', 'East', wbglogo);

        //quarter finals
        let match1 = new Match(geng2, blg2)
        let match2 = new Match(nrg2, wbg2)
        let match3 = new Match(jdg2, kt2)
        let match4 = new Match(lng2, t12)

        match1.setWinner(1)
        match2.setWinner(1)
        match3.setWinner(0)
        match4.setWinner(1)

        let bracket1 = [match1, match2]
        let bracket2 = [match3, match4]

        let round1 = new Round([], 1)
        round1.insertMatch([match1, match2])

        let round2 = new Round([], 1)
        round2.insertMatch([match3, match4])

        round1.name = "Quarter Finals"
        round2.name = "Quarter Finals"

        round1.makeComplete()
        round2.makeComplete()
        this.disqualified.push(geng2, nrg2, kt2, lng2)

        this.roundList.push(round1)
        this.roundList.push(round2)

        //semi finals
        let match5 = new Match(blg2, wbg2)
        let match6 = new Match(jdg2, t12)

        let round3 = new Round([], 2)
        round3.insertMatch([match5])

        let round4 = new Round([], 2)
        round4.insertMatch([match6])

        match5.setWinner(1)
        match6.setWinner(1)

        round3.name = "Semi Finals"
        round4.name = "Semi Finals"

        round3.makeComplete()
        round4.makeComplete()

        this.disqualified.push(blg2, jdg2)

        this.roundList.push(round3)
        this.roundList.push(round4)

        //grand finals
        let match7 = new Match(wbg2, t12)

        let round5 = new Round([], 3)
        round5.insertMatch([match7])

        round5.name = "Grand Finals"

        match7.setWinner(1)
        this.winner.push(t12)
        this.disqualified.push(wbg2)
        round5.makeComplete()
        this.roundList.push(round5)

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
                        if (predictions[j].cMatch.firstteam.name == temp.matchList[i].firstteam.name && predictions[j].cMatch.secondteam.name == temp.matchList[i].secondteam.name) {
                            temp.matchList[i].setWinner(parseInt(predictions[j].picked));
                            if (temp.matchList[i].winner.wins < 3) {
                                upper.push(temp.matchList[i].winner);
                            } else if (temp.matchList[i].winner.wins === 3) {
                                this.winner.push(temp.matchList[i].winner);
                            }
                            this.disqualified.push(temp.matchList[i].loser)
                            break;
                        }
                    }
                }
            }

            const newRound = new Round([], this.roundNo + 1);
            let upperSwap = true;
            let upperIndex = -1;

            if (upper.length !== 0) {
                for (let i = 0; i < tempList.length; i++) {
                    if (
                        tempList[i].win === upper[0].wins && upper[0].wins == 2
                    ) {
                        upperIndex = i;
                        upperSwap = false;
                        break;
                    }
                }

                if (upper.length !== 0 && upperSwap) {
                    newRound.insertTeams(upper);
                    tempList.push(newRound);
                } else if (upper.length !== 0 && !upperSwap) {
                    tempList[upperIndex].insertTeams(upper);
                }
            }

            temp.makeComplete();
        }

        for (let i = 0; i < tempList.length; i++) {
            const current = tempList[i].teamPlaying;

            for (let j = 0; j < current.length; j += 2) {
                tempList[i].insertMatch([new Match(current[j], current[j + 1])]);
            }
        }

        for (let i = 0; i < tempList.length; i++) {
            console.log(tempList[i].matchList)
            if (tempList[i].matchList[0].firstteam.wins == 0) {
                tempList[i].name = "Quarter Finals"
            } else if (tempList[i].matchList[0].firstteam.wins == 1) {
                tempList[i].name = "Semi Finals"
            } else if (tempList[i].matchList[0].firstteam.wins == 2) {
                console.log("gigi")
                tempList[i].name = "Grand Finals"
            }

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
            for (let i = 0; i < temp.matchList.length; i++) {
                // const rd = parseInt(prompt());
                const rd = RuleBook(temp.matchList[i].firstteam, temp.matchList[i].secondteam);
                temp.matchList[i].setWinner(rd);
                if (temp.matchList[i].winner.wins < 3) {
                    upper.push(temp.matchList[i].winner);
                } else if (temp.matchList[i].winner.wins === 3) {
                    this.winner.push(temp.matchList[i].winner);
                }

                this.disqualified.push(temp.matchList[i].loser)
            }

            const newRound = new Round([], this.roundNo + 1);
            let upperSwap = true;
            let upperIndex = -1;

            if (upper.length !== 0) {
                for (let i = 0; i < tempList.length; i++) {
                    if (
                        tempList[i].win === upper[0].wins && upper[0].wins == 2
                    ) {
                        upperIndex = i;
                        upperSwap = false;
                        break;
                    }
                }

                if (upper.length !== 0 && upperSwap) {
                    newRound.insertTeams(upper);
                    tempList.push(newRound);
                } else if (upper.length !== 0 && !upperSwap) {
                    tempList[upperIndex].insertTeams(upper);
                }
            }

            temp.makeComplete();
        }

        for (let i = 0; i < tempList.length; i++) {
            const current = tempList[i].teamPlaying;

            for (let j = 0; j < current.length; j += 2) {
                tempList[i].insertMatch([new Match(current[j], current[j + 1])]);
            }
        }

        for (let i = 0; i < tempList.length; i++) {
            console.log(tempList[i].matchList)
            if (tempList[i].matchList[0].firstteam.wins == 3) {
                tempList[i].name = "Quarter Finals"
            } else if (tempList[i].matchList[0].firstteam.wins == 4) {
                console.log("gigi")
                tempList[i].name = "Semi Finals"
            } else if (tempList[i].matchList[0].firstteam.wins == 5) {
                console.log("gigi")
                tempList[i].name = "Grand Finals"
            }

            this.roundList.push(tempList[i]);
        }

        this.roundNo += 1
    }
}