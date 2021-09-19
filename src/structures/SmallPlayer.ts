import { ScoreSaberPlayer, ScoreSaberScore } from ".";
import { getPlayer } from "../functions/getPlayer";
import { getPlayerScores } from "../functions/getPlayerScores";
import { smallplayerinfo } from "../typings/global";

export class SmallPlayer {
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
    
    async getScores(type: 'recent' | 'top', offset: number = 1): Promise<ScoreSaberScore[]> {
        return await getPlayerScores(this.id, type, offset)
    }

    async getFullPlayer(): Promise<ScoreSaberPlayer> {
        return await getPlayer(this.id)
    }
}