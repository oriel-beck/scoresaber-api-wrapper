import petitio from 'petitio'
import ScoreSaberWrapperError from '../structures/ScoreSaberWrapperError'
import SmallPlayer from '../structures/SmallPlayer'
import { apiError, smallplayerinfo } from '../global'

/**
 * 
 * @param {string | number} input The username to search or the leaderboard page
 * @returns 
 */
export async function getPlayers(input: string | number = 1): Promise<SmallPlayer[]> {
    let req
    if (typeof input === 'string') {
        req = await petitio(`https://new.scoresaber.com/api/players/by-name/${input}`, 'GET').json<smallplayerinfo[] | apiError>()
    } else if (Number.isSafeInteger(input)) {
        req = await petitio(`https://new.scoresaber.com/api/players/${input}`, 'GET').json<smallplayerinfo[] | apiError>()
    } else throw new ScoreSaberWrapperError('[PARAMETERS] : input has to be type of string, number or undefined!')
    if ('error' in req) throw new ScoreSaberWrapperError(`[SCORESABER] : ${req.error.message}`)
    return req.map(p => new SmallPlayer(p))
}