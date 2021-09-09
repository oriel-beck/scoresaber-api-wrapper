import { song } from "../../global";
import { ScoreSaberScore } from "../Score";

export = class ScoreSaberSong {
    score: ScoreSaberScore;
    name: string;
    subname: string;
    hash: string;
    author: string;
    levelauthor: string;
    difficulty: number;
    difficultyRaw: string;
    maxScore: number;
    /**
     * 
     * @param {ScoreSaberScore} score The original score the song came from
     * @param {song} data The song data
     */
    constructor(score: ScoreSaberScore, data: song) {
        this.score = score
        this.name = data.name
        this.subname = data.subname
        this.hash = data.hash
        this.author = data.author
        this.levelauthor = data.levelauthor
        this.difficulty = data.difficulty
        this.difficultyRaw = data.difficultyRaw
        this.maxScore = data.maxscore
    }
}