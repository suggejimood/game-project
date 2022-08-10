import { NotFoundError } from "../../submodules/core/errors/not-found";
import fs from 'fs';
//Types
import { countryItems } from "../../submodules/core/types/common.types";
import { 
    getCountryRequest, 
    getCountryResponse, 
    listCountryRequest, 
    listCountryResponse 
} from "../../submodules/core/types/country";
//Model
import { CountryModel } from "../models/country";

export async function addCountrys(): Promise<void> {
    //todo fs ile dosyadan okumalı.
}

export async function getCountry(body: getCountryRequest): Promise<getCountryResponse> {
    const country = await CountryModel.findById(body.id);
    if(!country){
        throw new NotFoundError();
    }

    let result: getCountryResponse = {
        id: country._id.toString(),
        name: country.name,
        code: country.code,
        numberOfPlayer: country.playerList.length,
        power: country.power,
    };

    return result;
}

export async function listCountry(body: listCountryRequest): Promise<listCountryResponse> {
    
    const list = await CountryModel.paginate(body.fliter, {page: body.pagination.page, limit: body.pagination.limit})

    if(!list){
        throw new NotFoundError();
    }

    let tempolaryItems: countryItems = [];
    list.docs.map((val, index) => {
        tempolaryItems[index] = {
            id: val._id.toString(),
            name: val.name,
            code: val.code,
            numberOfPlayers: val.playerList.length,
            power: val.power,
        }
    });

    let result: listCountryResponse = {
        pagination: {
            page: body.pagination.page, 
            limit: body.pagination.limit
        },
        items: tempolaryItems
    };

    if(list.nextPage){
        result.pagination.nextPage = list.nextPage;
    }

    return result;
}

export async function setAllCountry(): Promise<void> {
    let rawCountry = fs.readFileSync('/home/mehmet/Documents/nodejs/game-project/src/config/data/country.json', 'utf8');
    let countrys = JSON.parse(rawCountry); 
    
    for(let i: number = 0; i < 243; i ++){
        let country = new CountryModel({
            name: countrys.country[i].name,
            code: countrys.country[i].code
        });
        await country.save();
    }
    console.log('Ready!');
}