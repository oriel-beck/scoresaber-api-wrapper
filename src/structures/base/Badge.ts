import { badgeInfo } from "../../typings/global";

export class ScoreSaberBadge {
    name: string | undefined;
    description: string;
    url: string;

    constructor(data: badgeInfo) {
        this.name = data.image.split('.')[0]
        this.description = data.description
        this.url = `https://new.scoresaber.com/api/static/badges/${data.image}`
    }

    toString(): string {
        return this.name || ''
    }

    toJSON() {
        return {
            name: this.name,
            description: this.description,
            url: this.url
        }
    }
}