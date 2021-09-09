import { score } from "../typings/global";
import ScoreSaberSong from "./base/Song";
import ScoreSaberPlayer from "./Player";
import SmallPlayer from "./SmallPlayer";

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
}