import petitio from 'petitio'
import { apiError, smallplayerinfo } from '../typings/global'
import { ScoreSaberWrapperError, SmallPlayer } from '../structures'

export async function getPlayers(input: string | number = 1): Promise<SmallPlayer[]> {
    let req
    if (typeof input === 'string') {
        req = await petitio(`https://new.scoresaber.com/api/players/by-name/${input}`, 'GET').send().then(r => {
            if (r.statusCode === 429) throw new ScoreSaberWrapperError("You are sending too many requets!");
            return r.json<{players: smallplayerinfo[]} | apiError>()
        })
    } else if (Number.isSafeInteger(input)) {
        req = await petitio(`https://new.scoresaber.com/api/players/${input}`, 'GET').send().then(r => {
            if (r.statusCode === 429) throw new ScoreSaberWrapperError("You are sending too many requets!");
            return r.json<{players: smallplayerinfo[]} | apiError>()
        })
    } else throw new ScoreSaberWrapperError('[PARAMETERS] : input has to be type of string, number or undefined!')
    if ('error' in req) throw new ScoreSaberWrapperError(`[SCORESABER] : ${req.error.message}`)
    return req.players.map(p => new SmallPlayer(p))
}