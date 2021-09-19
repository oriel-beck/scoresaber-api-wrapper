import { ScoreSaberPlayer, ScoreSaberSong, SmallPlayer } from ".";
import { score } from "../typings/global";

export class ScoreSaberScore {
    rank: number;
    scoreId: number;
    score: number;
    unmodififiedScore: number;
    mods: string;
    pp: number;
    weight: number;
    timeSet: Date;
    leaderboardId: number;
    leaderboard: string;
    player: ScoreSaberPlayer | SmallPlayer | null;
    song: ScoreSaberSong;

    constructor(data: score, player?: ScoreSaberPlayer | SmallPlayer ) {
        this.rank = data.rank
        this.scoreId = data.scoreId
        this.score = data.score
        this.unmodififiedScore = data.unmodififiedScore
        this.mods = data.mods
        this.pp = data.pp
        this.weight = data.weight
        this.timeSet = new Date(data.timeSet)
        this.leaderboardId = data.leaderboardId
        this.leaderboard = `https://scoresaber.com/leaderboard/${data.leaderboardId}`
        this.player = player ? player : null
        this.song = new ScoreSaberSong(this, {
            hash: data.songHash,
            name: data.songName,
            subname: data.songSubName,
            author: data.songAuthorName,
            levelauthor: data.levelAuthorName,
            difficulty: data.difficulty,
            difficultyRaw: data.difficultyRaw,
            maxscore: data.maxScore
        })
    }

    toString(): number {
        return this.score
    }

    toJSON() {
        return {
            rank: this.rank,
            scoreId: this.scoreId,
            score: this.score,
            unmodififiedScore: this.unmodififiedScore,
            mods: this.mods,
            pp: this.pp,
            weight: this.weight,
            timeSet: this.timeSet.toISOString(),
            leaderboard: this.leaderboard,
            leaderboardId: this.leaderboardId,
            player: this.player?.toJSON(),
            song: this.song.toJSON()
        }
    }
}