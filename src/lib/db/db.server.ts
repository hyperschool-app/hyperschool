import {lazy} from "$lib/lazy";
import {createClient} from "@libsql/client";
import {drizzle} from "drizzle-orm/libsql";
import {DATABASE_AUTH_TOKEN, DATABASE_URL} from "$env/static/private";

export const db = lazy(() => {
    const client = createClient({ url: DATABASE_URL, authToken: DATABASE_AUTH_TOKEN });
    return drizzle(client);
})