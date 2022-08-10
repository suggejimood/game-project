import mongoose from 'mongoose';
import { DbConnectionError } from '../../submodules/core/errors/db-connection'

export const Mongodb = {
    async connect(connectionString: string) {
        const connection = await mongoose.connect(connectionString);

        if(!connection){
            throw new DbConnectionError;
        }

        console.log('MongoDB Connection: OK')
    },
    async disconnect() {
        await mongoose.connection.close();
    }
}