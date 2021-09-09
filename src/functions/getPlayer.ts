import ScoreSaberWrapperError from "../structures/ScoreSaberWrapperError";
import petitio from 'petitio'
import { apiError, fullplayerprofile } from "../global";
import ScoreSaberPlayer from "../structures/Player";

/**
 * @param playerId a valid player Id from ScoreSaber
 * @returns {Promise<ScoreSaberPlayer>} Promise with ScoreSaberPlayer class or throws error
 */
export async function getPlayer(playerId: string): Promise<ScoreSaberPlayer> {
    if(!playerId || typeof playerId !== 'string') throw new ScoreSaberWrapperError('[PARAMETERES] : playerId has to be type of string!')
    try {
        BigInt(playerId)
    } catch {
        throw new ScoreSaberWrapperError('[PARAMETERS] : Invalid player ID!')
    }

    const req: fullplayerprofile | apiError = await petitio(`https://new.scoresaber.com/api/player/${playerId}/full`, 'GET').json()
    if ('error' in req) throw new ScoreSaberWrapperError(`[SCORESABER] : ${req.error.message}`)
    return new ScoreSaberPlayer(req)
}