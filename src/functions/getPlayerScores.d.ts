import { ScoreSaberScore } from "../structures/Score";
export declare function getPlayerScores(playerId: string, type: 'recent' | 'top', offset?: number): Promise<void | ScoreSaberScore[]>;
