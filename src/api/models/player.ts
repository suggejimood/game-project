import { Schema, model, PaginateModel } from 'mongoose';
import paginate from 'mongoose-paginate-v2';
import bcrypt from 'bcrypt';
//Model
import { CountryModel } from './country';
//Errors
import { NotFoundError } from '../../submodules/core/errors/not-found';
import { BadRequestError } from '../../submodules/core/errors/bad-request';

interface PlayerDoc extends Document{
    nickname: string,
    nameSurname: string,
    email: string,
    password: string,
    aboutMe: string,
    rank: number,
    money: number,
    country: string,
    diff:{
        now: number,
        old: number
    },
    settings: {
        showEmail: boolean,
        showNameSurname: boolean,
    }
}

const playerSchema = new Schema<PlayerDoc>({
    nickname: {
        type: String,
        required: true,
        unique: true,
        sparse: true,
    },
    nameSurname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    aboutMe: {
        type: String,
    },
    rank: {
        type: Number,
        default: 0,
    },
    money: {
        type: Number,
        default: 0,
    },
    country: {
        type: String,
        required: true,
    },
    diff: {
        now: {
            type: Number,
            default: 0
        },
        old:{
            type: Number,
            default: 0
        }
    },
    settings: {
        showEmail: {
            type: Boolean,
            default: false,
        },
        showNameSurname: {
            type: Boolean,
            default: false,
        }
    }
});

playerSchema.pre('save', async function (next) {
    if(this.isModified('password')){
        const hashedPassword = await bcrypt.hash(this.password, 11);
    
        this.password = hashedPassword;
    }

    next();
});

playerSchema.pre('updateOne', async function (next) {
    if(this.isModified('password')){
        const hashedPassword = await bcrypt.hash(this.password, 11);
    
        this.password = hashedPassword;
    }

    if(this.isModified('country')){
        const country = await CountryModel.findOne({name: this.country});

        if(!country){
            throw new NotFoundError();
        }

        let players = country.playerList;
        players.push({id: this._id.toString()});
        
        await country.updateOne({_id: country._id}, {playerList: players});
    }

    if(this.isModified('rank')){
        const player = await PlayerModel.findById(this._id);

        if(!player){
            throw new BadRequestError('Upsss');
        }

        let addRank: number = this.rank - player.rank;

        await CountryModel.findByIdAndUpdate({_id: this.country}, {power: + addRank});
    }

    next();
});

playerSchema.plugin(paginate);
export const PlayerModel = model<PlayerDoc, PaginateModel<PlayerDoc>>('Player', playerSchema);