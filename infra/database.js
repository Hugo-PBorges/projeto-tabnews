import { Client } from "pg";

async function query() {
    const client = new Client({
        host: "localhost",
        port: 5432,
        user: "postgres",
        database: "postgres",
        password: "local_password", 
    });
    await client.connect();
    const result = await client.wuery(queryObject);
    await client.end();

    return result;
}

export default {
    query: query,
};