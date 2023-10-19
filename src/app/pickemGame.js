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
    constructor(matchesToAdd, roundNumber) {
        this.complete = false;
        this.matchList = matchesToAdd;
        this.teamPlaying = [];
        this.win = -1;
        this.loss = -1;
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
        this.roundNo = 2;
        const tempMatch1 = new Match(t1, tl)
        const tempMatch2 = new Match(c9, mad)
        const tempMatch3 = new Match(geng, gam)
        const tempMatch4 = new Match(jdg, bds)
        const tempMatch5 = new Match(g2, dwg)
        const tempMatch6 = new Match(nrg, wbg)
        const tempMatch7 = new Match(fnc, lng)
        const tempMatch8 = new Match(blg, kt)

        tempMatch1.setWinner(0)
        tempMatch2.setWinner(0)
        tempMatch3.setWinner(0)
        tempMatch4.setWinner(0)
        tempMatch5.setWinner(0)
        tempMatch6.setWinner(1)
        tempMatch7.setWinner(1)
        tempMatch8.setWinner(0)

        const matchList = [
            tempMatch1, tempMatch2, tempMatch3, tempMatch4, tempMatch5, tempMatch6, tempMatch7, tempMatch8
        ];

        const tempRound = new Round(matchList, 1);
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

        const matchList2 = [
            new Match(g2, wbg),
            new Match(jdg, blg),
            new Match(c9, lng),
            new Match(geng, t1),
        ];

        const tempRound2 = new Round(matchList2, 2)

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

        const matchList3 = [
            new Match(nrg, tl),
            new Match(kt, dwg),
            new Match(mad, bds),
            new Match(fnc, gam),
        ];
        const tempRound3 = new Round(matchList3, 2)

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

        tempRound.makeComplete()
        this.roundList.push(tempRound);
        this.roundList.push(tempRound2);
        this.roundList.push(tempRound3);
    }

    predictRound(predictions) {
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

        for (let i = 0; i < tempList.length; i++) {
            const current = tempList[i].teamPlaying;
            shuffleArray(current);
            for (let j = 0; j < current.length; j += 2) {
                tempList[i].insertMatch([new Match(current[j], current[j + 1])]);
            }
        }

        for (let i = 0; i < tempList.length; i++) {
            this.roundList.push(tempList[i]);
        }

        this.roundNo += 1
    }

    generateNextRoundRnd() {
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

        for (let i = 0; i < tempList.length; i++) {
            const current = tempList[i].teamPlaying;
            shuffleArray(current);
            for (let j = 0; j < current.length; j += 2) {
                tempList[i].insertMatch([new Match(current[j], current[j + 1])]);
            }
        }

        for (let i = 0; i < tempList.length; i++) {
            this.roundList.push(tempList[i]);
        }

        this.roundNo += 1
    }
    generateNextRound() {
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

        for (let i = 0; i < tempList.length; i++) {
            const current = tempList[i].teamPlaying;
            shuffleArray(current);
            for (let j = 0; j < current.length; j += 2) {
                tempList[i].insertMatch([new Match(current[j], current[j + 1])]);
            }
        }

        for (let i = 0; i < tempList.length; i++) {
            this.roundList.push(tempList[i]);
        }

        this.roundNo += 1
    }
}