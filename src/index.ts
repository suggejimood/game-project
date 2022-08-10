import { app } from './app';
import dotenv from 'dotenv';
import { Mongodb } from './config/db/db';
import { Redis } from './config/cache/redis';
//Services
import { setAllCountry } from './api/services/country';
import { top100Player } from './api/services/top100';

dotenv.config();

app.listen(process.env.PORT || 2166, async ()=>{
    await Mongodb.connect(`${process.env.MONGO}`);

    const redis = await Redis.connect();
    redis.set('pool', 0);
    redis.quit();
    
    await setAllCountry();
    top100Player;
});