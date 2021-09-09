import { badgeInfo } from "./global";

export interface playerInfo {
    playerId: `${bigint}`
    playerName: string
    avatar: string
    rank: number
    countryRank: number
    pp: number
    country: string
    role: string | null
    badges: badgeInfo[]
    history: string
    permissions: number
    inactive: number
    banned: number
}

export interface scoreStats {
    totalScores: number
    totalRankedScore: number
    averageRankedAccuracy: number
    totalPlayCount: number
    rankedPlayCount: number
}