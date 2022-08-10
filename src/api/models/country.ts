import { Schema, model, PaginateModel } from 'mongoose';
import paginate from 'mongoose-paginate-v2';
//Model
import { PlayerModel } from './player';
//Error
import { BadRequestError } from '../../submodules/core/errors/bad-request';


interface CountryDoc extends Document {
    name: string,
    code: string,
    playerList: {
        id: string,
    }[],
    power: number,
}

const countrySchema = new Schema<CountryDoc>({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    code: {
        type: String,
        max: 3,
        required: true,
        unique: true,
    },
    playerList: [{
        id: {
            type: String,
        }
    }],
    power: {
        type: Number,
        default: 0,
    }
});

countrySchema.pre('updateOne', async function (next) {
    if(this.isModified('playerList')){
        const player = await PlayerModel.findById(this.playerList[this.playerList.length -1]);

        if(!player){
            throw new BadRequestError('Upsss!');
        }

        this.power = + player.rank;
    }
    next();
});

countrySchema.plugin(paginate);
export const CountryModel = model<CountryDoc, PaginateModel<CountryDoc>>('Country', countrySchema);