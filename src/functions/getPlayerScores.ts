import petitio from 'petitio'
import { apiError, score } from "../typings/global";
import { ScoreSaberScore, ScoreSaberWrapperError } from '../structures';

export async function getPlayerScores(playerId: string, type: 'recent' | 'top', offset: number = 1): Promise<ScoreSaberScore[]> {
    if (!['recent', 'top'].includes(type)) throw new ScoreSaberWrapperError('[PARAMETERS] : type has to be recent or top!')
    if (!Number.isSafeInteger(offset)) throw new ScoreSaberWrapperError('[PARAMETERS] : offset is not a safe integer!')
    const req = await petitio(`https://new.scoresaber.com/api/player/${playerId}/scores/${type}/${offset}`, 'GET').json<{scores: score[]} | apiError>()
    if ('error' in req) throw new ScoreSaberWrapperError(`[SCORESABER] : ${req.error.message}`)
    return req.scores.map(s => new ScoreSaberScore(s))
}