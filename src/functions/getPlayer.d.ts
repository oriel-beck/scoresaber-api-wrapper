import ScoreSaberPlayer from "../structures/Player";
/**
 * @param playerId a valid player Id from ScoreSaber
 * @returns {Promise<void | ScoreSaberPlayer>} Promise with ScoreSaberPlayer class or throws error
 */
export declare function getPlayer(playerId: string): Promise<void | ScoreSaberPlayer>;
