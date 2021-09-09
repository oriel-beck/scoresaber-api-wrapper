import { ScoreSaberScore } from "../structures/Score";
import ScoreSaberWrapperError from "../structures/ScoreSaberWrapperError";
import petitio from 'petitio'
import { apiError, score } from "../global";

export async function getPlayerScores(playerId: string, type: 'recent' | 'top', offset: number = 1): Promise<void | ScoreSaberScore[]> {
    try {
        BigInt(playerId)
    } catch {
        throw new ScoreSaberWrapperError('[PARAMETERS] : Invalid player Id!')
    }

    if (!['recent', 'top'].includes(type)) throw new ScoreSaberWrapperError('[PARAMETERS] : type has to be recent or top!')
    if (typeof offset !== 'number') throw new ScoreSaberWrapperError('[PARAMETERS] : offset has to be type of number!')

    const req: score[] | apiError = await petitio(`httpsL//new.scoresaber.com/api/player/${playerId}/scores/${type}/${offset}`, 'GET').send().then(r => r.json())
    if (!req) throw new ScoreSaberWrapperError('[REQUEST] : Bad request!')
    if ('error' in req) throw new ScoreSaberWrapperError(`[SCORESABER] : ${req.error.message}`)
    return req.map(s => new ScoreSaberScore(s))
}