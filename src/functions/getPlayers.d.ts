import SmallPlayer from '../structures/SmallPlayer';
/**
 * Search players by player name or leaderboard pages
 *
 * @param input player name or page number
 * @returns {Promise<void | SmallPlayer[]>} Promise with smaller ScoreSaberPlayer class or throws error
 */
export declare function getPlayers(input?: string | number): Promise<void | SmallPlayer[]>;
