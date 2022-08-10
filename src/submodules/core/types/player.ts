import { 
    playerFilter,
    page, 
    pagination, 
    playerItems
} from "./common.types";

//Auth
export type playerSignupRequest = {
    nickname: string,
    aboutMe?: string,
    nameSurname: string,
    email: string,
    country: string,
    password: string,
    repassword: string,
};

export type playerSigninRequest = {
    email: string,
    password: string,
    close: boolean,
};

export type playerSigninResponse = {
    token: string
};

export type playerSignoutRequest = {
    token: string,
};


//profile
export type myProfileRequest = {
    token: string,
};

export type playerProfileRequest = {
    id: string
};

export type updateProfileRequest = {
    country?: string,
    aboutMe?: string,
    nameSurname?: string,
    token: string,
    settings: {
        showEmail?: boolean,
        showNameSurname?: boolean
    }
};

export type profileResponse = {
    nickname: string,
    aboutMe?: string,
    nameSurname?: string,
    email?: string,
    country: string,
    rank: number,
};

//List
export type listPlayerRequest = {
    pagination: pagination,
    filter: playerFilter,
};

export type rankListRequest = {
    pagination: pagination,
};

export type listPlayerResponse = {
    pagination: pagination,
    items: playerItems,
};

//search
export type searchPlayerRequest = {
    pagination: pagination,
    searchText: string,
};

export type searchPlayerResponse = {
    page: page,
    items: playerItems,
};