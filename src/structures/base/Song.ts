import { song } from "../../typings/global";
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