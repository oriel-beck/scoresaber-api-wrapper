import { playerInfo, scoreStats } from "./base";

export interface fullplayerprofile {
    playerInfo: playerInfo
    scoreStats: scoreStats
}

export interface smallplayerinfo {
    playerId: `${bigint}`
    playerName: string
    rank: number
    pp: number
    avatar: string
    country: string
    history: string
    difference: number
}

export interface badgeInfo {
    image: string
    description: string
}

export interface score {
    rank: number
    scoreId: number
    score: number
    unmodififiedScore: number
    mods: string
    pp: number
    weight: number
    timeSet: string
    leaderboardId: number
    songHash: string
    songName: string
    songSubName: string
    songAuthorName: string
    levelAuthorName: string
    difficulty: number
    difficultyRaw: string
    maxScore: number
}

export interface apiError {
    error: string
}

export interface song {
    hash: string
    name: string
    subname: string
    author: string
    levelauthor: string
    difficulty: number
    difficultyRaw: string
    maxscore: number
}
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