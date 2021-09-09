import petitio from 'petitio'
import ScoreSaberWrapperError from '../structures/ScoreSaberWrapperError'
import SmallPlayer from '../structures/SmallPlayer'
import { apiError, smallplayerinfo } from '../typings/global'

/**
 * Search players by player name or leaderboard pages
 * 
 * @param input player name or page number
 * @returns {Promise<void | SmallPlayer[]>} Promise with smaller ScoreSaberPlayer class or throws error
 */
export async function getPlayers(input: string | number = 1): Promise<void | SmallPlayer[]> {
    let req: smallplayerinfo[] | apiError
    if (typeof input === 'string') {
        req = await petitio(`https://new.scoresaber.com/api/players/by-name/${input}`, 'GET').send().then(r => r.json())
    } else if (typeof input === 'number') {
        req = await petitio(`https://new.scoresaber.com/api/players/${input}`, 'GET').send().then(r => r.json())
    } else throw new ScoreSaberWrapperError('[PARAMETERS] : input has to be type of string, number or undefined!')
    if (!req) throw new ScoreSaberWrapperError('[REQUEST] : Bad request!')
    if ('error' in req) throw new ScoreSaberWrapperError(`[SCORESABER] : ${req.error}`)
    return req.map(p => new SmallPlayer(p))
}