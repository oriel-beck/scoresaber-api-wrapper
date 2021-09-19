import { ScoreSaberBadge, ScoreSaberScore } from ".";
import { getPlayerScores } from "../functions/getPlayerScores";
import { badgeInfo, fullplayerprofile, scoreStats } from "../typings/global";

export class ScoreSaberPlayer {
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

    async getScores(type: 'recent' | 'top', offset: number = 1): Promise<ScoreSaberScore[]> {
        return getPlayerScores(this.id, type, offset)
    }

    toString(): string {
        return this.name
    }

    toJSON() {
        return {
            id: this.id,
            name: this.name,
            avatar: this.avatar,
            rank: this.rank,
            countryRank: this.countryRank,
            country: this.country,
            flagurl: this.flagurl,
            role: this.role,
            history: this.history,
            permissions: this.permissions,
            inactive: this.inactive,
            banned: this.banned,
            scoresstats: this.scoresstats,
            badges: this.badges.map(b => b.toJSON())
        }
    }
}