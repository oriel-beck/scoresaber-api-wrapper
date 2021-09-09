import { apiError, badgeInfo, fullplayerprofile, score, scoreStats } from "../global";
import ScoreSaberWrapperError from "./ScoreSaberWrapperError";
import petitio from 'petitio'
import ScoreSaberBadge from "./base/Badge";
import { ScoreSaberScore } from "./Score";

export = class ScoreSaberPlayer {
    #url = 'https://new.scoresaber.com/api'

    id: `${bigint}`;
    name: string;
    avatar: string;
    rank: number;
    countryRank: number;
    country: string;
    role: string | null;
    badges: ScoreSaberBadge[];
    history: string[];
    permissions: number;
    inactive: boolean;
    banned: boolean;
    scoresstats: scoreStats;
    flagurl: string | null;

    constructor(data: fullplayerprofile) {
        
        this.id = data.playerInfo.playerId
        this.name = data.playerInfo.playerName
        this.avatar = `https://new.scoresaber.com${data.playerInfo.avatar}`
        this.rank = data.playerInfo.rank
        this.countryRank = data.playerInfo.countryRank
        this.country = data.playerInfo.country
        this.flagurl = this.country ? `https://new.scoresabe.com/api/static/flags/${this.country.toLowerCase()}.png` : null
        this.role = data.playerInfo.role
        this.history = data.playerInfo.history.split(',')
        this.permissions = data.playerInfo.permissions
        this.inactive = data.playerInfo.inactive !== 0 ? true : false
        this.banned = data.playerInfo.banned !== 0 ? true : false
        this.scoresstats = data.scoreStats
        this.badges = data.playerInfo.badges.map((b: badgeInfo) => new ScoreSaberBadge(b))
    }

    async getScores(type: 'recent' | 'full', offset: number = 1): Promise<ScoreSaberScore[]> {
        if (!['recent', 'full'].includes(type)) throw new ScoreSaberWrapperError('[PARAMETERS] : Invalid type provided!')
        if (typeof offset !== 'number') throw new ScoreSaberWrapperError('[PARAMETERS] : offset has to be type of number!')
        const req: score[] | apiError = await petitio(`${this.#url}/player/${this.id}/${type}/${offset}`, 'GET').json()
        if ('error' in req) throw new ScoreSaberWrapperError(`[SCORESABER]: ${req.error.message}`)
        return req.map(s => new ScoreSaberScore(s, this))
    }
}