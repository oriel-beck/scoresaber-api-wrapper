import { badgeInfo } from "../../global";

export = class ScoreSaberBadge {
    name: string | undefined;
    description: string;
    url: string;
    /**
     * 
     * @param {badgeInfo} data The badge data from the player info
     */
    constructor(data: badgeInfo) {
        this.name = data.image.split('.')[0]
        this.description = data.description
        this.url = `https://new.scoresaber.com/api/static/badges/${data.image}`
    }
}