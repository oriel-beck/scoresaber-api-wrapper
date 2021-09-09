import ScoreSaberWrapperError from "../structures/ScoreSaberWrapperError";
import petitio from 'petitio'
import { apiError, fullplayerprofile } from "../global";
import ScoreSaberPlayer from "../structures/Player";

/**
 * 
 * @param {string} playerId The player ID to search (steam or oculus ID)
 * @returns 
 */
export async function getPlayer(playerId: string): Promise<ScoreSaberPlayer> {
    const req = await petitio(`https://new.scoresaber.com/api/player/${playerId}/full`, 'GET').json<fullplayerprofile | apiError>()
    if ('error' in req) throw new ScoreSaberWrapperError(`[SCORESABER] : ${req.error.message}`)
    return new ScoreSaberPlayer(req)
}