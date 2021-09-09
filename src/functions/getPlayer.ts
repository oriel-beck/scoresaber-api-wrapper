import ScoreSaberWrapperError from "../structures/ScoreSaberWrapperError";
import petitio from 'petitio'
import { apiError, fullplayerprofile } from "../global";
import ScoreSaberPlayer from "../structures/Player";

/**
 * @param playerId a valid player Id from ScoreSaber
 * @returns {Promise<void | ScoreSaberPlayer>} Promise with ScoreSaberPlayer class or throws error
 */
export async function getPlayer(playerId: string): Promise<void | ScoreSaberPlayer> {
    if(!playerId || typeof playerId !== 'string') throw new ScoreSaberWrapperError('[PARAMETERES] : playerId has to be type of string!')
    try {
        BigInt(playerId)
    } catch {
        throw new ScoreSaberWrapperError('[PARAMETERS] : Invalid player ID!')
    }

    const req: fullplayerprofile | apiError = await petitio(`https://new.scoresaber.com/api/player/${playerId}/full`, 'GET').send().then(r => r.json())
    if (!req) throw new ScoreSaberWrapperError('[REQUEST] : Bad request!')
    if ('error' in req) throw new ScoreSaberWrapperError(`[SCORESABER] : ${req.error.message}`)
    return new ScoreSaberPlayer(req)
}