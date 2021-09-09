import { apiError, score, smallplayerinfo } from "../typings/global";
import ScoreSaberWrapperError from "./ScoreSaberWrapperError";
import petitio from 'petitio'
import { ScoreSaberScore } from "./Score";

export = class SmallPlayer {
    #url = 'https://new.scoresaber.com/api'

    id: `${bigint}`;
    name: string;
    rank: number;
    pp: number;
    avatar: string;
    country: string;
    flagurl: string | null;
    history: string[];
    difference: number;
    constructor(data: smallplayerinfo) {
        this.id = data.playerId
        this.name = data.playerName
        this.rank = data.rank
        this.pp = data.pp
        this.avatar = `https://new.scoresaber.com${data.avatar}`
        this.country = data.country
        this.flagurl = this.country ? `https://new.scoresabe.com/api/static/flags/${this.country.toLowerCase()}.png` : null
        this.history = data.history.split(',')
        this.difference = data.difference
    }
    
    async getScores(type: 'recent' | 'full', offset: number = 1) {
        if (!['recent', 'full'].includes(type)) throw new ScoreSaberWrapperError('[PARAMETERS] : Invalid type provided!')
        if (typeof offset !== 'number') throw new ScoreSaberWrapperError('[PARAMETERS] : offset has to be type of number!')
        const req: score[] | apiError = await petitio(`${this.#url}/player/${this.id}/${type}/${offset}`, 'GET').send().then(r => r.json())
        if (!req) throw new ScoreSaberWrapperError('[REQUEST] : Invalid request!')
        if ('error' in req) throw new ScoreSaberWrapperError(`[SCORESABER]: ${req.error}`)
        return req.map(s => new ScoreSaberScore(s, this))
    }
}