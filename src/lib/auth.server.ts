import { SvelteKitAuth } from "@auth/sveltekit"
import Discord from "@auth/sveltekit/providers/discord"
import {DrizzleAdapter} from "@auth/drizzle-adapter";
import {db} from "$lib/db/db.server";
import {DISCORD_CLIENT_ID, DISCORD_CLIENT_SECRET} from "$env/static/private";
import {redirect, type ServerLoadEvent} from "@sveltejs/kit";

export const { handle, signIn, signOut } = SvelteKitAuth({
    providers: [Discord({
        clientId: DISCORD_CLIENT_ID,
        clientSecret: DISCORD_CLIENT_SECRET,
    })],
    adapter: DrizzleAdapter(db()),
})

export async function requires_session(event: ServerLoadEvent) {
    const auth = await event.locals.auth();

    if (!auth) {
        // redirect to login page
        const loginUrl = new URL("/login", event.request.url);

        loginUrl.searchParams.set("redirect", event.request.url);

        console.log(`not authed, redirecting to ${loginUrl.toString()}`);
        throw redirect(307, loginUrl.toString());
    }
}