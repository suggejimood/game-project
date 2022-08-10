import { createClient } from 'redis';

export const Redis = {
    async connect() {
        const client = createClient();
        client.connect();

        client.on('connect', () => {
            console.log('Redis Connection: OK');
        });

        client.on('error', (err) => {
            console.error('Redis Client Error: ' + err);
        });

        return client;
    },

    async disconnect() {

    }
}