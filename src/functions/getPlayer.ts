import petitio from 'petitio'
import { apiError, fullplayerprofile } from "../typings/global";
import { ScoreSaberPlayer, ScoreSaberWrapperError } from '../structures';

export async function getPlayer(playerId: string): Promise<ScoreSaberPlayer> {
    const req = await petitio(`https://new.scoresaber.com/api/player/${playerId}/full`, 'GET').send().then(r => {
        if(r.statusCode === 429) throw new ScoreSaberWrapperError("You are sending too many requets!");
        return r.json<fullplayerprofile | apiError>()
    })
    if ('error' in req) throw new ScoreSaberWrapperError(`[SCORESABER] : ${req.error.message}`)
    return new ScoreSaberPlayer(req)
}