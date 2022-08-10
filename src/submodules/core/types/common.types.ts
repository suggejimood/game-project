export type pagination = {
    page: number,
    limit: number,
    nextPage?: number,
}

export type page = {
    currentPage: number,
    lastPage: number
}

//Player
export type playerFilter = {
    country?: string,
    rank?: number,
};

export type playerItems = {
    id: string,
    nickname: string,
    rank: number,
    country: string,
    diff?: number 
}[];

//Country
export type countryFilter = {
    minPower?: number,
    maxPower?: number,
};

export type countryItems = {
    id: string,
    name: string,
    code: string,
    numberOfPlayers: number,
    power: number, 
}[];


export type tokenType = {
    id: string,
    nickname: string
}