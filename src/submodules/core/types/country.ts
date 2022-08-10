import { countryFilter, countryItems, pagination } from "./common.types"

export type addCountrysRequest = {
    name: string,
    code: string,
}

export type getCountryRequest = {
    id: string
}

export type getCountryResponse = {
    id: string,
    name: string,
    code: string,
    numberOfPlayer: number,
    power: number,
}

export type listCountryRequest = {
    pagination: pagination,
    fliter: countryFilter,
}

export type listCountryResponse = {
    pagination: pagination,
    items: countryItems
}